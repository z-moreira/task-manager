import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface do documento Mongoose
 */
export interface ITaskDocument extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Schema Mongoose para Task
 */
const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'O título é obrigatório'],
      trim: true,
      maxlength: [200, 'O título não pode ter mais de 200 caracteres']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'A descrição não pode ter mais de 1000 caracteres'],
      default: ''
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
  }
);

export default mongoose.model<ITaskDocument>('Task', TaskSchema);