import express, { json } from 'express'
import { LuxfrontRouter } from './routes/luxfrontRoutes.js'
import { LuxAppRouter } from './routes/luxApp.js'
import { usersRouter } from './routes/user.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(json())

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

app.use('/reservacion', LuxfrontRouter)
app.use('/', LuxAppRouter)

app.get('/get-session', (req, res) => {
  res.json({ username: req.session.user })
}) // Pueden usar un * fetch * para usar esta ruta y obtener el nombre del usuario actual

app.use('/users', usersRouter) // Conste que solo tiene un token , el de acceso que expira a la hora, aun no esta implementado que haya uno renovado que dure mas tiempo, pero eso se puede hacer con un middleware que verifique si el token de acceso expiro y si es asi, renueva el token de acceso y lo devuelve al cliente
