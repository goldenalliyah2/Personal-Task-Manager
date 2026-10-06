import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Task title is required')
    .max(200, 'Task title must not exceed 200 characters'),

  description: z
    .string()
    .trim()
    .min(1, 'Task description is required')
    .max(2000, 'Task description must not exceed 2000 characters'),

  tags: z
    .array(
      z.enum(['Urgent', 'Important']),
    )
    .default([]),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Task title is required')
    .max(200, 'Task title must not exceed 200 characters')
    .optional(),

  description: z
    .string()
    .trim()
    .min(1, 'Task description is required')
    .max(
      2000,
      'Task description must not exceed 2000 characters',
    )
    .optional(),

  tags: z
    .array(
      z.enum(['Urgent', 'Important']),
    )
    .optional(),
});

export type CreateTaskInput = z.infer<
  typeof createTaskSchema
>;

export type UpdateTaskInput = z.infer<
  typeof updateTaskSchema
>;