import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { TaskService } from '../../application/use-cases/TaskService';
import { TaskRepository } from '../../infrastructure/repositories/TaskRepository';

/**
 * CONFIGURAÇÃO DAS ROTAS
 * Dependency Injection manual
 */

// Criar instâncias (Onion: de dentro para fora)
const taskRepository = new TaskRepository();           // Infrastructure
const taskService = new TaskService(taskRepository);  // Application
const taskController = new TaskController(taskService); // Presentation

// Configurar rotas
const router = Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;