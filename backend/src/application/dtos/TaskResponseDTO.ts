/**
 * DTO de resposta para o cliente
 */
export interface TaskResponseDTO {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}