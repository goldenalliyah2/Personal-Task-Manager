import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  userId: string;
}

interface JwtPayload {
  userId: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is required',
    });
  }

  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization format',
    });
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is required',
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      success: false,
      message: 'JWT secret is not configured',
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded !== 'object' ||
      decoded === null ||
      !('userId' in decoded) ||
      typeof decoded.userId !== 'string'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token',
      });
    }

    const payload: JwtPayload = {
      userId: decoded.userId,
    };

    const authenticatedRequest =
      req as AuthenticatedRequest;

    authenticatedRequest.userId = payload.userId;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token',
    });
  }
};