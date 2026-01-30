/**
 * INTERFACE DA ENTIDADE TASK
 * Define o contrato da entidade de domínio
 */
export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}