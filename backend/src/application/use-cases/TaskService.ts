import { ITaskService } from '../interfaces/ITaskService';
import { ITaskRepository } from '../../domain/interfaces/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { CreateTaskDTO } from '../dtos/CreateTaskDTO';
import { UpdateTaskDTO } from '../dtos/UpdateTaskDTO';
import { TaskResponseDTO } from '../dtos/TaskResponseDTO';

/**
 * TASK SERVICE - Casos de Uso
 * Orquestra operações de negócio usando entidades do domínio
 */
export class TaskService implements ITaskService {
  
  constructor(private readonly taskRepository: ITaskRepository) {}

  /**
   * Caso de Uso: Criar uma nova tarefa
   */
  async createTask(data: CreateTaskDTO): Promise<TaskResponseDTO> {
    // Criar entidade de domínio (validações automáticas no construtor)
    const task = new Task(
      this.generateId(), // Gerar ID único
      data.title,
      data.description || '',
      false, // Nova tarefa sempre não concluída
      new Date(),
      new Date()
    );

    // Persistir via repository
    const savedTask = await this.taskRepository.save(task);

    // Retornar DTO
    return this.toDTO(savedTask);
  }

  /**
   * Caso de Uso: Listar todas as tarefas
   */
  async getAllTasks(): Promise<TaskResponseDTO[]> {
    const tasks = await this.taskRepository.findAll();
    return tasks.map(task => this.toDTO(task));
  }

  /**
   * Caso de Uso: Buscar tarefa por ID
   */
  async getTaskById(id: string): Promise<TaskResponseDTO> {
    const task = await this.taskRepository.findById(id);
    
    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    return this.toDTO(task);
  }

  /**
   * Caso de Uso: Atualizar tarefa
   */
  async updateTask(id: string, data: UpdateTaskDTO): Promise<TaskResponseDTO> {
    // Buscar tarefa existente
    const task = await this.taskRepository.findById(id);
    
    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    // Aplicar mudanças usando métodos de domínio
    if (data.title !== undefined) {
      task.updateTitle(data.title);
    }

    if (data.description !== undefined) {
      task.updateDescription(data.description);
    }

    if (data.completed !== undefined) {
      if (data.completed) {
        task.markAsCompleted();
      } else {
        task.markAsIncomplete();
      }
    }

    // Persistir mudanças
    const updatedTask = await this.taskRepository.update(task);

    return this.toDTO(updatedTask);
  }

  /**
   * Caso de Uso: Deletar tarefa
   */
  async deleteTask(id: string): Promise<void> {
    const exists = await this.taskRepository.exists(id);
    
    if (!exists) {
      throw new Error('Tarefa não encontrada');
    }

    await this.taskRepository.delete(id);
  }

  /**
   * Converter entidade de domínio para DTO
   */
  private toDTO(task: Task): TaskResponseDTO {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    };
  }

  /**
   * Gerar ID único (simples para exemplo)
   * Em produção, usar UUID ou deixar o MongoDB gerar
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}