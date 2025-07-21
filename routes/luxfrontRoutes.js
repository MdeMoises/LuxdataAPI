import { Router } from 'express'
import { LuxfrontController } from '../controllers/luxfrontController.js'

export const LuxfrontRouter = Router()

// RUTAS PARA ENDPOINTS /reservacion/
LuxfrontRouter.get('/', LuxfrontController.getAll)
LuxfrontRouter.get('/available', LuxfrontController.getHabitacionesDisponibles)
LuxfrontRouter.get('/:id', LuxfrontController.getById)
LuxfrontRouter.post('/', LuxfrontController.createReserva)
LuxfrontRouter.post('/presupuesto', LuxfrontController.createPresupuesto)

LuxfrontRouter.get('/download/:id', LuxfrontController.downloadReserva)