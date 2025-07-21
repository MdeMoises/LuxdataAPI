import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'

const config = {
  host: 'localhost',
  user: 'root',
  port: '33065',
  password: '',
  database: 'luxdata'
}

const connection = await mysql.createConnection(config)

export class UserModel {


    static async login ({ input }) {
    const {
      username,
      password
    } = input
    console.log('Login attempt for:', username)
    try {
      const [existingUser] = await connection.query(
        'SELECT * FROM user WHERE username = ? OR email = ?',
        [username, username]
      )

      // eslint-disable-next-line eqeqeq
      if (existingUser.length == 0) {
        return null
      }

      // get the hashedPassword from result
      if (await password, existingUser[0].password) {
        console.log('Login Successful')
      } else {
        return null
      }

      return existingUser[0]
    } catch (e) {
      console.error('Error:', e)
      throw new Error('Error ingresando')
    }
  }

  // eslint-disable-next-line no-empty-pattern
  static async getAll ({}) {
    const [users] = await connection.query(
      'SELECT * FROM user;'
    )

    return users
  }

  static async getById ({ id }) {
    const [users] = await connection.query(
      'SELECT * FROM USER WHERE id = ?;', [id]
    )
    return users[0]
  }

  static async getByUsername ({ username }) {
    const [users] = await connection.query(
      'SELECT * FROM USER WHERE username = ?;', [username]
    )
    return users[0]
  }

  static async create ({ input }) {
    const {
      username,
      password,
      email,
      rol
    } = input

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const [existingUser] = await connection.query(
        'SELECT * FROM user WHERE username = ? OR email = ?',
        [username, email]
      )

      console.log('Existing user check:', existingUser)

      if (existingUser && existingUser.length > 0) {
        return { error: 'Username or email already exists' }
      }

      await connection.query(
        'INSERT INTO user(username, password, email, rol) values(?, ?, ?);', [username, hashedPassword, email, rol]
      )

      const [newUser] = await connection.query(
        'SELECT * FROM user where username = ?;', [username]
      )

      return newUser[0]
    } catch (e) {
      console.error('Error:', e)
      throw new Error('Error generando usuario')
    }
  }

  static async delete ({ id }) {
    const result = await connection.query(
      'DELETE FROM USER WHERE id = ?;', [id]
    )
    console.log(result)
  }

  static async update ({ username, input }) {
    const {
      password,
      email
    } = input

    try {
      await connection.query(
        'UPDATE user(password, email) values(?, ?) where username = ?;', [password, email, username]
      )
    } catch (e) {
      throw new Error('Error generando usuario')
    }
  }
}
