import { Request, Response } from 'express';
import { ITaskService } from '../../application/interfaces/ITaskService';
import { CreateTaskDTO } from '../../application/dtos/CreateTaskDTO';
import { UpdateTaskDTO } from '../../application/dtos/UpdateTaskDTO';

/**
 * CONTROLLER - Camada de Apresentação
 * Lida com requisições HTTP e respostas
 */
export class TaskController {
  
  constructor(private readonly taskService: ITaskService) {}

  /**
   * POST /api/tasks
   */
  createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: CreateTaskDTO = {
        title: req.body.title,
        description: req.body.description || ''
      };

      const task = await this.taskService.createTask(dto);

      res.status(201).json({
        success: true,
        data: task
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao criar tarefa'
      });
    }
  };

  /**
   * GET /api/tasks
   */
  getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await this.taskService.getAllTasks();

      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Erro ao buscar tarefas'
      });
    }
  };

  /**
   * GET /api/tasks/:id
   */
  getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const task = await this.taskService.getTaskById(id);

      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error: any) {
      const statusCode = error.message === 'Tarefa não encontrada' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  };

  /**
   * PATCH /api/tasks/:id
   */
  updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const dto: UpdateTaskDTO = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
      };

      const task = await this.taskService.updateTask(id, dto);

      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error: any) {
      const statusCode = error.message === 'Tarefa não encontrada' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  };

  /**
   * DELETE /api/tasks/:id
   */
  deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.taskService.deleteTask(id);

      res.status(200).json({
        success: true,
        message: 'Tarefa removida com sucesso'
      });
    } catch (error: any) {
      const statusCode = error.message === 'Tarefa não encontrada' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  };
}