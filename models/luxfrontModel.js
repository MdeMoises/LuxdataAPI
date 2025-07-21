import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: '33065',
  password: '',
  database: 'luxdata'
}

const connection = await mysql.createConnection(config)

export class LuxfrontModel {
  static async getAll () {
    const [habitaciones] = await connection.query(
      'SELECT * FROM tipo_habitacion;'
    )
    return habitaciones
  }

  static async getById ({ id }) {
    const [habitacion] = await connection.query(
      'SELECT * FROM tipo_habitacion WHERE id = ?',
      [id]
    )
    return habitacion[0]
  }

  static async createCliente ({ nombre, tipoDocumento, documento, fechaNac, telefono, correo, localidad, genero }) {
    const [result] = await connection.query(
      'INSERT INTO clientes (nombre, tipoDocumento, documento, fechaNac, telefono, correo, localidad, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, tipoDocumento, documento, fechaNac, telefono, correo, localidad, genero]
    )
    return result.insertId
  }

  static async validarCliente ({ documento }) {
    const [cliente] = await connection.query(
      'SELECT id FROM clientes WHERE documento = ?',
      [documento]
    )
    if (cliente.length === 0) {
      return null
    }
    return cliente[0]
  }

  static async createPago ({ fechaPago, monto, referencia }) {
    const [result] = await connection.query(
      'INSERT INTO pagos (fecha, monto, referencia) VALUES (?, ?, ?)',
      [fechaPago, monto, referencia]
    )
    return result.insertId
  }

  static async createEstancia ({ reservanteId, fechaReservaIn, fechaReservaOut, nroOcupantes, estadoReserva}) {
    const [result] = await connection.query(
      'INSERT INTO estancia (reservanteId, fechaReservaIn, fechaReservaOut, nroOcupantes, estadoReservaId) VALUES (?, ?, ?, ?, ?)',
      [reservanteId, fechaReservaIn, fechaReservaOut, nroOcupantes, estadoReserva]
    )
    return result.insertId
  }

  static async createPagoEstancia ({ estanciaId, pagoId }) {
    const [result] = await connection.query(
      'INSERT INTO pagosxestancia (idEstancia, idPago) VALUES (?, ?)',
      [estanciaId, pagoId]
    )
    return result.affectedRows > 0
  }

  static async createHabitacionxEstancia ({ estanciaId, habitacionId }) {
    const [result] = await connection.query(
      'INSERT INTO habitaciones_x_estancia (estanciaId, habitacionId) VALUES (?, ?)',
      [estanciaId, habitacionId]
    )
    return result.affectedRows > 0
  }

  static async getTiposHabitacionesDisponibles ({ fechaReservaIn, fechaReservaOut }) {
    const [habitaciones] = await connection.query(
      `SELECT DISTINCT th.id
        FROM habitacion h
        JOIN tipo_habitacion th ON h.tipoId = th.id
        WHERE h.ID NOT IN (
        SELECT he.habitacionId
        FROM habitaciones_x_estancia he
        JOIN estancia e ON he.estanciaId = e.id
        WHERE (e.fechaReservaIn < ? AND e.fechaReservaOut > ?)
      );`,
      [fechaReservaIn, fechaReservaOut]
    )
    return habitaciones
  }

  static async getHabitacionesDisponibles ({ fechaReservaIn, fechaReservaOut, tipoId }) {
    const [habitaciones] = await connection.query(
      `SELECT h.id
        FROM habitacion h
        JOIN tipo_habitacion th ON h.tipoId = th.id
        WHERE h.ID NOT IN (
        SELECT he.habitacionId
        FROM habitaciones_x_estancia he
        JOIN estancia e ON he.estanciaId = e.id
        WHERE (e.fechaReservaIn < ? AND e.fechaReservaOut > ?)
      ) AND th.id = ? ;`,
      [fechaReservaIn, fechaReservaOut, tipoId]
    )
    return habitaciones
  }

  static async getPrecioHabitacion ({ id }) {
    const [habitacion] = await connection.query(
      'SELECT precio FROM tipo_habitacion WHERE id = ?',
      [id]
    )
    return habitacion[0].precio
  }

  static async getNombreHabitacion ({ id }) {
    const [habitacion] = await connection.query(
      'SELECT tipoNombre FROM tipo_habitacion WHERE id = ?',
      [id]
    )
    return habitacion[0].tipoNombre
  }
}
