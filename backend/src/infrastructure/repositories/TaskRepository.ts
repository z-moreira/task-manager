import { ITaskRepository } from '../../domain/interfaces/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import TaskModel, { ITaskDocument } from '../database/schemas/TaskSchema';

/**
 * IMPLEMENTAÇÃO DO REPOSITÓRIO
 * Converte entre entidades de domínio e modelos do Mongoose
 */
export class TaskRepository implements ITaskRepository {

  /**
   * Salvar nova tarefa
   */
  async save(task: Task): Promise<Task> {
    const taskDocument = new TaskModel({
      _id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    });

    const saved = await taskDocument.save();
    return this.toDomain(saved);
  }

  /**
   * Buscar todas as tarefas
   */
  async findAll(): Promise<Task[]> {
    const tasks = await TaskModel.find().sort({ createdAt: -1 });
    return tasks.map(task => this.toDomain(task));
  }

  /**
   * Buscar tarefa por ID
   */
  async findById(id: string): Promise<Task | null> {
    const task = await TaskModel.findById(id);
    return task ? this.toDomain(task) : null;
  }

  /**
   * Atualizar tarefa
   */
  async update(task: Task): Promise<Task> {
    const updated = await TaskModel.findByIdAndUpdate(
      task.id,
      {
        title: task.title,
        description: task.description,
        completed: task.completed,
        updatedAt: task.updatedAt
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      throw new Error('Tarefa não encontrada para atualização');
    }

    return this.toDomain(updated);
  }

  /**
   * Deletar tarefa
   */
  async delete(id: string): Promise<boolean> {
    const result = await TaskModel.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Verificar se tarefa existe
   */
  async exists(id: string): Promise<boolean> {
    const count = await TaskModel.countDocuments({ _id: id });
    return count > 0;
  }

  /**
   * Converter documento Mongoose para entidade de domínio
   */
  private toDomain(doc: ITaskDocument): Task {
    return new Task(
      doc._id.toString(),
      doc.title,
      doc.description,
      doc.completed,
      doc.createdAt,
      doc.updatedAt
    );
  }
}