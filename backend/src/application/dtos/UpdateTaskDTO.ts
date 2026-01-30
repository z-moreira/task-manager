/**
 * DTO para atualização de tarefa
 */
export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}