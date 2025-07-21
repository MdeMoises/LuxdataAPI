import { Router } from 'express'
import { UserController } from '../controllers/users.js'

export const usersRouter = Router()

//login
usersRouter.post('/login', UserController.login)


usersRouter.get('/', UserController.getAll)
usersRouter.post('/', UserController.create)
usersRouter.get('/:id', UserController.getById)
usersRouter.delete('/:id', UserController.delete)
usersRouter.patch('/:id', UserController.update)
