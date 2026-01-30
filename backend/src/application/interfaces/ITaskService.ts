import { CreateTaskDTO } from '../dtos/CreateTaskDTO';
import { UpdateTaskDTO } from '../dtos/UpdateTaskDTO';
import { TaskResponseDTO } from '../dtos/TaskResponseDTO';

/**
 * Interface do serviço de tarefas
 * Define os casos de uso da aplicação
 */
export interface ITaskService {
  createTask(data: CreateTaskDTO): Promise<TaskResponseDTO>;
  getAllTasks(): Promise<TaskResponseDTO[]>;
  getTaskById(id: string): Promise<TaskResponseDTO>;
  updateTask(id: string, data: UpdateTaskDTO): Promise<TaskResponseDTO>;
  deleteTask(id: string): Promise<void>;
}