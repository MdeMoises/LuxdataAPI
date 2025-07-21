import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: '33065',
  password: '',
  database: 'luxdata'
}

const connection = await mysql.createConnection(config)

export class audiModel {
  static async createAuditoria(user, action, table, texto){
    try {
      const [result] = await connection.query(`
        INSERT INTO auditoria (user, action, tabla, text) 
        VALUES (?, ?, ?, ?)`, [user, action, table, texto] )

      console.log('Auditoria created Model:', result)
      return result
    } catch (error) {
      console.error('Error creating auditoria:', error)
      return null
    }
  }

  static async getAuditoria() {
    try {
      const [rows] = await connection.query(`
        SELECT a.id, a.user, 
        COALESCE(u.username, 'Usuario Desconocido') AS username, 
        a.action, a.tabla, a.text, a.time 
        FROM auditoria a 
        LEFT JOIN user u ON a.user = u.id 
        ORDER BY time DESC`)
      return rows.map(row => ({
        id: row.id,
        user: row.user,
        username: row.username,
        action: row.action,
        tabla: row.tabla,
        text: row.text,
        createdAt: new Date(row.time)
      }))
    } catch (error) {
      console.error('Error fetching auditoria:', error)
      return []
    }
  }
}


