import { ITask } from '../interfaces/ITask';

/**
 * DOMAIN ENTITY - Task
 * Representa a entidade de negócio pura
 * Implementa a interface ITask
 */
export class Task implements ITask {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public completed: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {
    this.validate();
  }

  /**
   * Validações de domínio centralizadas
   */
  private validate(): void {
    if (!this.title || this.title.trim().length === 0) {
      throw new Error('O título da tarefa é obrigatório');
    }
    
    if (this.title.length > 200) {
      throw new Error('O título não pode ter mais de 200 caracteres');
    }

    if (this.description && this.description.length > 1000) {
      throw new Error('A descrição não pode ter mais de 1000 caracteres');
    }
  }

  /**
   * Regra de negócio: Marcar tarefa como concluída
   */
  markAsCompleted(): void {
    this.completed = true;
    this.updatedAt = new Date();
  }

  /**
   * Regra de negócio: Marcar tarefa como não concluída
   */
  markAsIncomplete(): void {
    this.completed = false;
    this.updatedAt = new Date();
  }

  /**
   * Regra de negócio: Atualizar título
   */
  updateTitle(newTitle: string): void {
    if (!newTitle || newTitle.trim().length === 0) {
      throw new Error('O título da tarefa é obrigatório');
    }
    
    if (newTitle.length > 200) {
      throw new Error('O título não pode ter mais de 200 caracteres');
    }
    
    this.title = newTitle.trim();
    this.updatedAt = new Date();
  }

  /**
   * Regra de negócio: Atualizar descrição
   */
  updateDescription(newDescription: string): void {
    if (newDescription && newDescription.length > 1000) {
      throw new Error('A descrição não pode ter mais de 1000 caracteres');
    }
    
    this.description = newDescription.trim();
    this.updatedAt = new Date();
  }

  /**
   * Regra de negócio: Verificar se tarefa está vazia (sem título e descrição)
   */
  isEmpty(): boolean {
    return (!this.title || this.title.trim().length === 0) && 
           (!this.description || this.description.trim().length === 0);
  }

  /**
   * Criar uma cópia da tarefa (útil para testes e imutabilidade)
   */
  clone(): Task {
    return new Task(
      this.id,
      this.title,
      this.description,
      this.completed,
      this.createdAt,
      this.updatedAt
    );
  }
}
