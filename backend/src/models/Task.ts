import { Schema, model, type InferSchemaType } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2000,
    },

    tags: {
      type: [String],
      default: [],
      enum: ['Urgent', 'Important'],
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export type Task = InferSchemaType<typeof taskSchema>;

const TaskModel = model('Task', taskSchema);

export default TaskModel;