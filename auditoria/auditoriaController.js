import { audiModel } from './auditoriaModel.js'

  export class audiController {
    static async createAuditoria(user, action, tabla, texto) {
      const auditoria = await audiModel.createAuditoria(user, action, tabla, texto)
    console.log('Auditoria created Controller:', auditoria) 
    if (!auditoria) {
        throw new Error('Error creating auditoria')
      }
      return auditoria
    }

    static async getAuditoria(req, res) {
      const auditoria = await audiModel.getAuditoria()
      //console.log('Auditoria fetched Controller:', auditoria)
      if (!auditoria) {
        throw new Error('Error fetching auditoria')
      }

      res.status(200).json(auditoria)
      res.end()
    }
  }