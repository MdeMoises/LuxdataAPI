import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: '33065',
  password: '',
  database: 'luxdata'
}

const connection = await mysql.createConnection(config)

export class LuxAppModel {
  static async getOcupacy () {
    const [ocupacion] = await connection.query(
      `SELECT COUNT(he.habitacionId) AS 'Ocupadas'
          FROM habitaciones_x_estancia he 
          INNER JOIN estancia e ON e.id = he.estanciaId
          WHERE (e.fechaReservaIn <= CURDATE() AND e.fechaReservaOut >= CURDATE())`)
    return ocupacion.map((row) => ({
      Ocupadas: parseFloat(row.Ocupadas)
    }))
  }

  static async getTotalHab () {
    const [total] = await connection.query(
      `SELECT COUNT(h.id) AS 'Total'
        FROM habitacion h`)
    return total.map((row) => ({
      Total: parseFloat(row.Total)
    }))
  }

  static async getHabInfo () {
    const [habitaciones] = await connection.query(`
        SELECT 
            th.id,
            th.tipoNombre, 
            th.tipoCamas, 
            th.minPersonas, 
            th.maxPersonas, 
            th.precio, 
                COUNT(DISTINCT h.id) - COUNT(e.id) AS Disponibles
        FROM 
            tipo_habitacion th
        LEFT JOIN 
            habitacion h ON th.id = h.tipoId
        LEFT JOIN 
            habitaciones_x_estancia he ON h.id = he.habitacionId
        LEFT JOIN 
            estancia e ON he.estanciaId = e.id AND DATE(e.fechaReservaIn) = CURDATE()
        GROUP BY 
            th.id
    `)
    return habitaciones.map((row) => ({
      id: row.id,
      tipo: row.tipoNombre,
      camas: row.tipoCamas,
      min: row.minPersonas,
      max: row.maxPersonas,
      precio: parseFloat(row.precio),
      disponibles: (row.Disponibles || 0) // Asumiendo que si no hay ocupadas, es 0
    }))
  }

  static async getOcupantes () {
    const [ocupantes] = await connection.query(`
        SELECT c.nombre, c.Documento, e.fechaReservaIn, e.fechaReservaOut, e.nroOcupantes,  c.localidad, e.id, c.telefono, c.correo
        FROM estancia e
        INNER JOIN clientes c ON c.id = e.reservanteId
        WHERE e.fechaReservaIn <= CURDATE() AND e.fechaReservaOut >= CURDATE() AND e.checkIn IS NOT NULL AND e.checkOut IS NULL`)
    return ocupantes.map((row) => ({
      nombre: row.nombre,
      documento: row.Documento,
      fechaReservaIn: row.fechaReservaIn.toISOString().split('T')[0],
      fechaReservaOut: row.fechaReservaOut.toISOString().split('T')[0],
      nroOcupantes: row.nroOcupantes,
      localidad: row.localidad,
      telefono: row.telefono,
      correo: row.correo,
      reserva: row.id
    }))
  }

  static async getReservantes () {
    const [reservantes] = await connection.query(`
        SELECT c.nombre, c.Documento, e.fechaReservaIn, e.fechaReservaOut, e.nroOcupantes, c.localidad, e.id, c.telefono, c.correo, (e.fechaReservaIn = CURDATE()) AS isToday
        FROM estancia e
        INNER JOIN clientes c ON c.id = e.reservanteId
        WHERE e.checkIn IS NULL AND e.checkOut IS NULL AND e.cancelado = 0
        ORDER BY e.fechaReservaIn ASC`)
    return reservantes.map((row) => ({
      nombre: row.nombre,
      documento: row.Documento,
      fechaReservaIn: row.fechaReservaIn.toISOString().split('T')[0],
      fechaReservaOut: row.fechaReservaOut.toISOString().split('T')[0],
      nroOcupantes: row.nroOcupantes,
      localidad: row.localidad,
      telefono: row.telefono,
      correo: row.correo,
      reserva: row.id,
      checkInToday: row.isToday === 1 // Convertir booleano a true/false
    }))
  }

  static async getReservasNoPagas () {
    const [reservas] = await connection.query(`
        SELECT c.nombre, c.Documento, e.fechaReservaIn, e.fechaReservaOut, e.nroOcupantes
        FROM estancia e
        INNER JOIN clientes c ON c.id = e.reservanteId
        WHERE e.boolPago IS FALSE`)
    return reservas.map((row) => ({
      nombre: row.nombre,
      documento: row.Documento,
      fechaReservaIn: row.fechaReservaIn.toISOString().split('T')[0],
      fechaReservaOut: row.fechaReservaOut.toISOString().split('T')[0],
      nroOcupantes: row.nroOcupantes
    }))
  }

  static async validateCheckIn (id) {
    const [comprobar] = await connection.query(`
        SELECT e.checkIn
        FROM estancia e
        WHERE e.id = ?
        `, [id])
    // AND fechaReservaIn = CURDATE()`, [id]
    return comprobar
  }

  static async setCheckIn (id) {
    const [checkin] = await connection.query(`
        UPDATE estancia
        SET checkIn = NOW()
        WHERE id = ?`, [id])
    return checkin
  }

  static async setCheckOut (id) {
    const [comprobar] = await connection.query(`
        SELECT e.checkOut
        FROM estancia e
        WHERE e.id = ?`, [id])
    if (comprobar[0].checkOut !== null) {
      return null
    }
    const [checkOut] = await connection.query(`
        UPDATE estancia
        SET checkOut = NOW()
        WHERE id = ?`, [id])
    return checkOut
  }

  static async getEstanciaData (id, action) {
    let query
    switch (action) {
      case 'modificar':
        query = `
          SELECT c.nombre, c.tipoDocumento, c.Documento, c.telefono, c.correo, c.correo,
          e.fechaReservaIn, e.fechaReservaOut, e.nroOcupantes,
          h.id AS habitacionId, th.tipoNombre
          FROM estancia e
          INNER JOIN habitaciones_x_estancia he ON e.id = he.estanciaId
          INNER JOIN clientes c ON c.id = e.reservanteId
          INNER JOIN habitacion h ON h.id = he.habitacionId
          INNER JOIN tipo_habitacion th ON th.id = h.tipoId
          WHERE e.id = ? AND e.checkOut IS NOT NULL AND e.cancelado = 0`
        break
      case 'cancelar':
        query = `
          SELECT c.nombre, c.tipoDocumento, c.Documento, c.telefono, c.correo, c.correo,
          e.fechaReservaIn, e.fechaReservaOut, e.nroOcupantes,
          h.id AS habitacionId, th.tipoNombre
          FROM estancia e
          INNER JOIN habitaciones_x_estancia he ON e.id = he.estanciaId
          INNER JOIN clientes c ON c.id = e.reservanteId
          INNER JOIN habitacion h ON h.id = he.habitacionId
          INNER JOIN tipo_habitacion th ON th.id = h.tipoId
          WHERE e.id = ? AND e.checkIn IS NULL AND e.checkOut IS NULL`
        break
    }
    const [comprobar] = await connection.query(query, [id])
    if (comprobar.length === 0) {
      return null
    }
    const result = []
    const firstEntry = {
      nombre: comprobar[0].nombre,
      tipoDocumento: comprobar[0].tipoDocumento,
      documento: comprobar[0].Documento,
      telefono: comprobar[0].telefono,
      correo: comprobar[0].correo,
      fechaReservaIn: comprobar[0].fechaReservaIn.toISOString().split('T')[0],
      fechaReservaOut: comprobar[0].fechaReservaOut.toISOString().split('T')[0],
      nroOcupantes: comprobar[0].nroOcupantes
    }

    result.push(firstEntry)

    const habitaciones = comprobar.map(row => ({
      id: row.habitacionId,
      tipo: row.tipoNombre
    }))
    // Combinar las habitaciones en el resultado
    result.push(...habitaciones)
    return result
  }

  static async updateEstancia (id, fechaIn, fechaOut) {
    const [update] = await connection.query(`
        UPDATE estancia
        SET fechaReservaIn = ?, fechaReservaOut = ?
        WHERE id = ?`, [fechaIn, fechaOut, id])
    return update
  }

  static async checkOutOld (id) {
      const [comprobar] = await connection.query(`
        SELECT e.fechaReservaIn, e.fechaReservaOut
        FROM estancia e
        WHERE e.id = ?`, [id])
    if (comprobar[0].checkOut !== null) {
      return null
    }
    return comprobar.map((row) => ({
      fechaReservaIn: row.fechaReservaIn.toISOString().split('T')[0],
      fechaReservaOut: row.fechaReservaOut.toISOString().split('T')[0]
    }))
  }

  static async cancelReserva (id) {
    const [cancel] = await connection.query(`
        UPDATE estancia
        SET cancelado = 1
        WHERE id = ?`, [id])
    return cancel
  }

  static async getHabStatus () {
    const [status] = await connection.query(`
      SELECT 
        h.id AS id,
        th.tipoNombre AS name,
        th.img AS img,
        CASE 
            WHEN e.checkIn IS NOT NULL AND e.checkOut IS NULL THEN 'Ocupado'
            WHEN e.fechaReservaIn >= CURDATE() AND e.checkIn IS NULL THEN 'Reservado'
            ELSE 'Disponible'
        END AS state
        FROM 
            habitacion h
        JOIN 
            tipo_habitacion th ON h.tipoId = th.id
        LEFT JOIN 
            habitaciones_x_estancia he ON h.id = he.habitacionId
        LEFT JOIN 
            estancia e ON he.estanciaId = e.id
        GROUP BY 
            h.id, th.tipoNombre`)
    return status.map((row) => ({
      id: row.id,
      name: row.name,
      img: row.img,
      state: row.state
    }))
  }

  static async getEstadisticasOcupacion () {
    const [estadisticas] = await connection.query(`
      SELECT
          COALESCE(COUNT(e.id), 0) AS total,
          m.mes
      FROM
          (SELECT 1 AS mes UNION ALL
          SELECT 2 UNION ALL
          SELECT 3 UNION ALL
          SELECT 4 UNION ALL
          SELECT 5 UNION ALL
          SELECT 6 UNION ALL
          SELECT 7 UNION ALL
          SELECT 8 UNION ALL
          SELECT 9 UNION ALL
          SELECT 10 UNION ALL
          SELECT 11 UNION ALL
          SELECT 12) m
      LEFT JOIN estancia e ON MONTH(e.fechaReservaIn) = m.mes AND YEAR(e.fechaReservaIn) = YEAR(CURDATE())
      GROUP BY m.mes
      ORDER BY m.mes`)
    return estadisticas.map(row => parseFloat(row.total))
  }

  static async getEstadisticasIngresos () {
    const [estadisticas] = await connection.query(`
      SELECT
          COALESCE(SUM(p.monto), 0) AS total,
          m.mes
      FROM
          (SELECT 1 AS mes UNION ALL
          SELECT 2 UNION ALL
          SELECT 3 UNION ALL
          SELECT 4 UNION ALL
          SELECT 5 UNION ALL
          SELECT 6 UNION ALL
          SELECT 7 UNION ALL
          SELECT 8 UNION ALL
          SELECT 9 UNION ALL
          SELECT 10 UNION ALL
          SELECT 11 UNION ALL
          SELECT 12) m
      LEFT JOIN pagos p ON MONTH(p.fecha) = m.mes AND YEAR(p.fecha) = YEAR(CURDATE())
      GROUP BY m.mes
      ORDER BY m.mes`)
    return estadisticas.map(row => parseFloat(row.total))
  }

  static async getEstadisticasLocalizacion () {
    const [estadisticas] = await connection.query(`
      SELECT
      e.estado,
      COALESCE(COUNT(c.localidad), 0) AS cantidad
      FROM
          (SELECT 'Amazonas' AS estado UNION ALL
              SELECT 'Anzoátegui' UNION ALL
              SELECT 'Apure' UNION ALL
              SELECT 'Aragua' UNION ALL
              SELECT 'Barinas' UNION ALL
              SELECT 'Bolívar' UNION ALL
              SELECT 'Carabobo' UNION ALL
              SELECT 'Cojedes' UNION ALL
              SELECT 'Delta Amacuro' UNION ALL
              SELECT 'Falcón' UNION ALL
              SELECT 'Guárico' UNION ALL
              SELECT 'Lara' UNION ALL
              SELECT 'Mérida' UNION ALL
              SELECT 'Miranda' UNION ALL
              SELECT 'Monagas' UNION ALL
              SELECT 'Nueva Esparta' UNION ALL
              SELECT 'Portuguesa' UNION ALL
              SELECT 'Sucre' UNION ALL
              SELECT 'Táchira' UNION ALL
              SELECT 'Trujillo' UNION ALL
              SELECT 'Vargas' UNION ALL
              SELECT 'Yaracuy' UNION ALL
              SELECT 'Zulia' UNION ALL
              SELECT 'Distrito Capital') e
      LEFT JOIN clientes c ON c.localidad = e.estado
      GROUP BY e.estado`)
    return estadisticas.map(row => [row.estado, row.cantidad])
  }

  static async getCalendar () {
    const [calendar] = await connection.query(`
      SELECT
        CONCAT(th.tipoNombre," ", h.id) AS Habitacion, c.nombre AS Cliente, 
        YEAR(e.fechaReservaIn) AS InicioY, MONTH(e.fechaReservaIn) AS InicioM, DAY(e.fechaReservaIn) AS InicioD,
        YEAR(e.fechaReservaOut) AS FinY, MONTH(e.fechaReservaOut) AS FinM, DAY(e.fechaReservaOut) AS FinD
      FROM estancia e
        INNER JOIN clientes c ON c.id = e.reservanteId
        LEFT JOIN habitaciones_x_estancia he ON he.estanciaId = e.id
        LEFT JOIN habitacion h ON h.id = he.habitacionId
        LEFT JOIN tipo_habitacion th ON th.id = h.tipoId
      WHERE (e.fechaReservaIn >= CURDATE()) AND (e.fechaReservaOut <=  DATE_ADD(CURDATE(), INTERVAL 7 DAY)) AND (e.checkOut IS NULL) AND (e.cancelado = 0)`)
    return calendar.map(row => [
      row.Habitacion,
      row.Cliente,
        `${row.InicioY}`,
        `${row.InicioM.toString().padStart(2, '0')}`,
        `${row.InicioD.toString().padStart(2, '0')}`,
        `${row.FinY}`,
        `${row.FinM.toString().padStart(2, '0')}`,
        `${row.FinD.toString().padStart(2, '0')}`
    ])
  }

  static async getPagos () {
    const [pagos] = await connection.query(`
      SELECT
        p.referencia, p.fecha, p.monto, pe.idEstancia
      FROM pagos p
      LEFT JOIN pagosxestancia pe ON pe.idPago = p.id 
        WHERE (p.validado IS NOT NULL) AND (p.validado != 0)`)
    return pagos.map(row => ({
      referencia: row.referencia,
      fecha: row.fecha.toISOString().split('T')[0],
      monto: parseFloat(row.monto),
      estancia: row.idEstancia
    }))
  }

  static async getPagosPendientes () {
    const [pagos] = await connection.query(`
      SELECT
        p.referencia, p.fecha, p.monto, pe.idEstancia
      FROM pagos p
      LEFT JOIN pagosxestancia pe ON pe.idPago = p.id 
        WHERE (p.validado IS NULL) OR (p.validado = 0)`)
    return pagos.map(row => ({
      referencia: row.referencia,
      fecha: row.fecha.toISOString().split('T')[0],
      monto: parseFloat(row.monto),
      estancia: row.idEstancia
    }))
  }

  static async setValidarPago (referencia) {
    const [validar] = await connection.query(`
      UPDATE pagos
      SET validado = 1
      WHERE referencia = ?`, referencia)
    return validar
  }
}
