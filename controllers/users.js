import { UserModel } from '../models/user.js'
import { validateUser, validatePartialUser } from '../schemas/users.js'
import jwt from 'jsonwebtoken'

export class UserController {
  static async login (req, res) {
    const result = validatePartialUser(req.body)

    if (!result.success) {
      console.log(JSON.parse(result.error.message))
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const User = await UserModel.login({ input: result.data })
    if (!User) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrecta' })
    }
    const token = jwt.sign(
      { id: User.id, username: User.username, rol: User.rol },
      process.env.JWT_SECRET,
      { expiresIn: '78h' })

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'strict'
      }).json('Login successful')
      .end()
  }

  static async logout (req, res) {
    res
      .status(200)
      .cookie('access_token', '', {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(0) // Expire the cookie immediately
      })
      .end()
  }

  static validateCookie (token) {
    //const token = req.cookies.access_token
    if (!token) {
      return 0
    }
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      return decoded.id
  }

  static async getAll (req, res) {
    const users = await UserModel.getAll({})
    res.json(users)
  }

  static async getById (req, res) {
    const { id } = req.params
    const user = await UserModel.getById({ id })
    if (user) return user
    res.status(404).json({ message: 'User not found' })
  }

  static async getByUsername (req, res) {
    const { username } = req.params
    const user = await UserModel.getByUsername({ username })
    if (user) return res.json(user)
    res.status(404).json({ message: 'User not found' })
  }

  static async create (req, res) {
    const result = validateUser(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await UserModel.create({ input: result.data })

    res.status(201).json(newUser)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await UserModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json({ message: 'User deleted' })
  }

  static async update (req, res) {
    const result = validatePartialUser(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedUser = await UserModel.update({ id, input: result.data })

    return res.json(updatedUser)
  }
}
