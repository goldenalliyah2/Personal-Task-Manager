import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import TaskModel from '../models/Task.js';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../schemas/task.schema.js';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.js';

// Create a task
export const createTask = async (
  req: Request,
  res: Response,
) => {
  try {
    const authenticatedRequest = req as AuthenticatedRequest;

    const result = createTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
    }

    const task = await TaskModel.create({
      ...result.data,
      userId: authenticatedRequest.userId,
    });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error('Create task error:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while creating the task',
    });
  }
};

// Get all tasks belonging to the logged-in user
export const getTasks = async (
  req: Request,
  res: Response,
) => {
  try {
    const authenticatedRequest = req as AuthenticatedRequest;

    const tasks = await TaskModel.find({
      userId: authenticatedRequest.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error('Get tasks error:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching tasks',
    });
  }
};

// Get one task belonging to the logged-in user
export const getTask = async (
  req: Request,
  res: Response,
) => {
  try {
    const authenticatedRequest = req as AuthenticatedRequest;
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      });
    }

    const task = await TaskModel.findOne({
      _id: id,
      userId: authenticatedRequest.userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error('Get task error:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the task',
    });
  }
};

// Update one task belonging to the logged-in user
export const updateTask = async (
  req: Request,
  res: Response,
) => {
  try {
    const authenticatedRequest = req as AuthenticatedRequest;
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      });
    }

    const result = updateTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      {
        _id: id,
        userId: authenticatedRequest.userId,
      },
      result.data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    console.error('Update task error:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while updating the task',
    });
  }
};

// Delete one task belonging to the logged-in user
export const deleteTask = async (
  req: Request,
  res: Response,
) => {
  try {
    const authenticatedRequest = req as AuthenticatedRequest;
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      });
    }

    const deletedTask = await TaskModel.findOneAndDelete({
      _id: id,
      userId: authenticatedRequest.userId,
    });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting the task',
    });
  }
};