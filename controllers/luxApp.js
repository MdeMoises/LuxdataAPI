import { LuxAppModel } from '../models/luxApp.js'
import { LuxfrontModel } from '../models/luxfrontModel.js'
import { audiController } from '../auditoria/auditoriaController.js'
import { UserController } from '../controllers/users.js'

export class LuxAppController {
  // Funcion para obtener la ocupacion de hoy GET http://localhost:1234/inicio/ocupacytoday
  static async getOcupacy (req, res) {
    const ocupadas = await LuxAppModel.getOcupacy({ })
    const disponibles = await LuxAppModel.getTotalHab({ })
    disponibles[0].Total -= ocupadas[0].Ocupadas
    res.json({
      ocupadas: ocupadas[0].Ocupadas,
      disponibles: disponibles[0].Total,
      bloqueadas: 0
    })
    res.end()
  }

  // Funcion para obtener la informacion de las habitaciones GET http://localhost:1234/inicio/habinfo
  static async getHabInfo (req, res) {
    const habitaciones = await LuxAppModel.getHabInfo({ })
    if (habitaciones.length === 0) {
      res.status(404).json({ message: 'No hay habitaciones disponibles' })
      return
    }
    res.json(habitaciones)
    res.end()
  }

  // Funcion para obtener la informacion de los ocupantes GET http://localhost:1234/inicio/ocupantes
  static async getOcupantes (req, res) {
    const ocupantes = await LuxAppModel.getOcupantes({ })
    if (ocupantes.length === 0) {
      res.status(404).json({ message: 'No hay ocupantes el dia de hoy' })
      return
    }
    res.json(ocupantes)
    res.end()
  }

  // Funcion para obtener la informacion de los reservantes GET http://localhost:1234/inicio/reservantes
  static async getReservantes (req, res) {
    const ocupantes = await LuxAppModel.getReservantes({ })
    if (ocupantes.length === 0) {
      res.status(404).json({ message: 'No hay reservantes actualmente' })
      return
    }
    res.json(ocupantes)
    res.end()
  }

  static async getReservasNoPagas (req, res) {
    const reservas = await LuxAppModel.getReservasNoPagas({ })
    if (reservas.length === 0) {
      res.status(404).json({ message: 'No hay reservas no pagadas actualmente' })
      return
    }
    res.json(reservas)
    res.end()
  }

  static async setCheckIn (req, res) {
    const { id } = req.params
    const validateCheckin = await LuxAppModel.validateCheckIn(id)
    if (validateCheckin.length === 0) {
      res.status(404).json({ message: 'La reserva no tiene la fecha valida para hacerle CheckIn' })
      return
    }
    if (validateCheckin[0].checkIn !== null) {
      res.status(404).json({ message: 'No se pudo realizar el check-in o ya se realizo antes' })
      return
    }
    const acompanantes = req.body
    if (Array.isArray(acompanantes) && acompanantes.length > 0) {
      for (const acompanante of acompanantes) {
        const { nombre, tipoDocumento, documento, localidad, genero } = acompanante
        const result = await LuxfrontModel.createCliente({
          nombre,
          tipoDocumento,
          documento,
          localidad,
          genero
        })
        const audi = await audiController.createAuditoria(0, 'INSERT', 'Cliente', `ID estancia: ${result}; acompañante de estancia: ${id}`)
        console.log(audi)
      }
    }
    const checkin = await LuxAppModel.setCheckIn(id)
    if (checkin === null || checkin.length === 0) {
      res.status(404).json({ message: 'No se pudo realizar el check-in' })
      return
    }
    const audi2 = await audiController.createAuditoria(0, 'UPDATE', 'Estancia', `ID estancia: ${id} CheckIn realizado`)
    console.log(audi2)
    res.status(200).json({ message: 'Check-in realizado correctamente' })
    res.end()
  }

  static async setCheckOut (req, res) {
    const { id } = req.params
    const checkout = await LuxAppModel.setCheckOut(id)
    if (checkout === null || checkout.length === 0) {
      res.status(404).json({ message: 'No se pudo realizar el check-out o ya se realizo antes' })
      return
    }
    await audiController.createAuditoria(0, 'UPDATE', 'Estancia', `ID estancia: ${id} CheckOut realizado`)    
    res.status(200).json({ message: 'Check-out realizado correctamente' })
    res.end()
  }

  static async getEstanciaData (req, res) {
    const { id } = req.params
    const { action } = req.body
    const reserva = await LuxAppModel.getEstanciaData(id, action)
    if (reserva === null || reserva.length === 0) {
      res.status(404).json({ message: 'No se encontro la reserva, o no es valida en esta seccion' })
      return
    }
    res.json(reserva)
    res.end()
  }

  static async updateEstancia (req, res) {
    const { id } = req.params
    const { fechaReservaIn, fechaReservaOut } = req.body
    const reserva = await LuxAppModel.updateEstancia(id, fechaReservaIn, fechaReservaOut)
    if (reserva === null || reserva.length === 0) {
      res.status(404).json({ message: 'No se pudo actualizar la reserva' })
      return
    }
    const reservaData = await LuxAppModel.checkOutOld(id)
    await audiController.createAuditoria(0, 'UPDATE', 'Estancia', `ID estancia: ${id} Datos viejos FechaIn: ${reservaData[0].fechaReservaIn} FechaOut: ${reservaData[0].fechaReservaOut} Datos actualizados FechaIn: ${fechaReservaIn} FechaOut: ${fechaReservaOut}`)
    res.status(200).json({ message: 'Reserva actualizada correctamente' })
    res.end()
  }

  static async cancelReserva (req, res) {
    const { id } = req.params
    const reserva = await LuxAppModel.cancelReserva(id)
    if (reserva === null || reserva.length === 0) {
      res.status(404).json({ message: 'No se pudo cancelar la reserva' })
      return
    }
    await audiController.createAuditoria(0, 'UPDATE', 'Estancia', `ID estancia: ${id} Cancelada`)   
    res.status(200).json({ message: 'Reserva actualizada correctamente' })
    res.end()
  }

  static async getHabStatus (req, res) {
    const habitaciones = await LuxAppModel.getHabStatus({ })
    if (habitaciones.length === 0) {
      res.status(404).json({ message: 'Error SQL' })
      return
    }
    res.json(habitaciones)
    res.end()
  }

  static async getEstadisticasOcupacion (req, res) {
    const estadisticas = await LuxAppModel.getEstadisticasOcupacion({ })
    if (estadisticas.length === 0) {
      res.status(404).json({ message: 'No hay estadisticas de ocupacion' })
      return
    }
    res.json(estadisticas)
    res.end()
  }

  static async getEstadisticasIngresos (req, res) {
    const estadisticas = await LuxAppModel.getEstadisticasIngresos({ })
    if (estadisticas.length === 0) {
      res.status(404).json({ message: 'No hay estadisticas de ganancias' })
      return
    }
    res.json(estadisticas)
    res.end()
  }

  static async getEstadisticasLocalizacion (req, res) {
    const estadisticas = await LuxAppModel.getEstadisticasLocalizacion({ })
    if (estadisticas.length === 0) {
      res.status(404).json({ message: 'No hay estadisticas de localizacion' })
      return
    }
    res.json(estadisticas)
    res.end()
  }

  static async getCalendar (req, res) {
    const calendar = await LuxAppModel.getCalendar({ })
    if (calendar.length === 0) {
      res.status(404).json({ message: 'No hay reservas para mostrar' })
      return
    }
    res.json(calendar)
    res.end()
  }

  static async getPagos (req, res) {
    const pagos = await LuxAppModel.getPagos({ })
    if (pagos.length === 0) {
      res.status(404).json({ message: 'No hay pagos para mostrar' })
      return
    }
    res.json(pagos)
    res.end()
  }

  static async getPagosPendientes (req, res) {
    const pagosPendientes = await LuxAppModel.getPagosPendientes({ })
    if (pagosPendientes.length === 0) {
      res.status(404).json({ message: 'No hay pagos pendientes para mostrar' })
      return
    }
    res.json(pagosPendientes)
    res.end()
  }

  static async setValidarPago (req, res) {
    const { referencia } = req.params
    const validarPago = await LuxAppModel.setValidarPago(referencia)
    if (validarPago === null || validarPago.length === 0) {
      res.status(404).json({ message: 'No se pudo validar el pago' })
      return
    }
    await audiController.createAuditoria(0, 'UPDATE', 'Pagos', `ID Pago: ${referencia} validado`)
    res.status(200).json({ message: 'Pago validado correctamente' })
    res.end()
  }
}
