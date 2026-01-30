import { Task } from '../entities/Task';

/**
 * INTERFACE DO REPOSITÓRIO (Domain Layer)
 * Contrato puro - não conhece detalhes de implementação
 * Não menciona MongoDB, Mongoose, etc.
 */
export interface ITaskRepository {
  /**
   * Salvar uma nova tarefa
   */
  save(task: Task): Promise<Task>;

  /**
   * Buscar todas as tarefas
   */
  findAll(): Promise<Task[]>;

  /**
   * Buscar tarefa por ID
   */
  findById(id: string): Promise<Task | null>;

  /**
   * Atualizar tarefa existente
   */
  update(task: Task): Promise<Task>;

  /**
   * Deletar tarefa
   */
  delete(id: string): Promise<boolean>;

  /**
   * Verificar se tarefa existe
   */
  exists(id: string): Promise<boolean>;
}