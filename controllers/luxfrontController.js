import { LuxfrontModel } from '../models/luxfrontModel.js'
import { validate } from '../schemas/luxfrontSchemas.js'
import { audiController } from '../auditoria/auditoriaController.js'

export class LuxfrontController {
  // Funcion para obtener todas los detalles de todas las habitaciones
  static async getAll (req, res) {
    const habitaciones = await LuxfrontModel.getAll({})
    if (habitaciones.length === 0) {
      res.status(404).json({ message: 'No hay habitaciones disponibles' })
      return
    }
    res.json(habitaciones)
    res.end()
  }

  // Funcion para obtener los detalles de una habitacion en especifico
  static async getById (req, res) {
    const { id } = req.params
    const habitacion = await LuxfrontModel.getById({ id })
    if (!habitacion) {
      res.status(404).json({ message: 'Habitacion no encontrada' })
      return
    }
    res.json(habitacion)
    res.end()
  }

  // Funcion para obtener las habitaciones disponibles en un rango de fechas
  static async getHabitacionesDisponibles (req, res) {
    const { fechaIn, fechaOut } = req.query
    const habitaciones = await LuxfrontModel.getTiposHabitacionesDisponibles({
      fechaIn,
      fechaOut
    })
    if (habitaciones.length === 0) {
      res.status(404).json({ message: 'No hay habitaciones disponibles' })
      return
    }
    const habitacionesCompleta = []
    for (const habitacion of habitaciones) {
      const habi = await LuxfrontModel.getById({ id: habitacion.id })
      if (habi) {
        habitacionesCompleta.push(habi)
      }
    }
    res.json(habitacionesCompleta)
    res.end()
  }

  // Funcion para crear un presupuesto
  static async createPresupuesto (req, res) {
    const { habitaciones, checkIn, checkOut } = req.body
    // Calcular la cantidad de días de la reserva
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const cantidadDias = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))

    const conteoHabitaciones = {}
    habitaciones.forEach(id => {
      conteoHabitaciones[id] = (conteoHabitaciones[id] || 0) + 1
    })
    const factura = []
    let subtotalTotal = 0
    let bolivaresTotal = 0
    for (const [id, cantidad] of Object.entries(conteoHabitaciones)) {
      const precio = await LuxfrontModel.getPrecioHabitacion({ id })
      const nombre = await LuxfrontModel.getNombreHabitacion({ id })
      const subtotal = precio * cantidad * cantidadDias
      subtotalTotal += subtotal
      const bolivares = subtotal * parseFloat(process.env.BOLIVARES)
      bolivaresTotal += bolivares
      factura.push({
        tipo: nombre, // Aquí puedes mapear el id a un nombre de tipo de habitación si lo deseas
        cantidad,
        dias: cantidadDias,
        valor: precio,
        subtotal,
        bolivares
      })
    }

    factura.push({
      subtotalTotal,
      bolivaresTotal
    })
    res.status(201).json({ factura })
    res.end()
  }

  // Funcion para crear una reserva
  static async createReserva (req, res) {
    const result = validate(req.body)
    if (!result.success) {
      console.log(JSON.parse(result.error.message))
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { nombre, tipoDocumento, documento, fechaNac, telefono, correo, localidad, genero } = req.body
    const clienteExistente = await LuxfrontModel.validarCliente({ documento })
    let idcliente
    if (clienteExistente === null) {
      idcliente = await LuxfrontModel.createCliente({
        nombre,
        tipoDocumento,
        documento,
        fechaNac,
        telefono,
        correo,
        localidad,
        genero
      })
    } else {
      idcliente = clienteExistente.id
    }

    if (!idcliente) {
      res.status(500).json({ message: 'Error al crear el cliente' })
      return
    }

    const { fechaPago, monto, referencia } = req.body
    const idpago = await LuxfrontModel.createPago({
      fechaPago,
      monto,
      referencia
    })
    await audiController.createAuditoria(0, 'INSERT', 'Pagos', `ID pago: ${idpago} creada`)
    const { fechaReservaIn, fechaReservaOut, nroOcupantes, estadoReserva } = req.body
    const idestancia = await LuxfrontModel.createEstancia({
      reservanteId: idcliente,
      fechaReservaIn,
      fechaReservaOut,
      nroOcupantes,
      estadoReserva
    })

    if (!idestancia) {
      res.status(500).json({ message: 'Error al crear la estancia' })
      return
    }
    await audiController.createAuditoria(0, 'INSERT', 'Estancia', `ID Estancia: ${idestancia} creada`)
    const idpagoEstancia = await LuxfrontModel.createPagoEstancia({
      estanciaId: idestancia,
      pagoId: idpago
    })
    if (!idpagoEstancia) {
      res.status(500).json({ message: 'Error al crear el pago de la estancia' })
      return
    }
    await audiController.createAuditoria(0, 'INSERT', 'Pagos_x_estacia', `ID Estancia: ${idestancia} asociada al ID Pago: ${idpago}`)
    const { habitaciones } = req.body
    const habitacionesOcupadas = new Set()
    for (const habitacion of habitaciones) {
      const result = await LuxfrontModel.getHabitacionesDisponibles({
        fechaReservaIn,
        fechaReservaOut,
        tipoId: habitacion
      })
      if (result.length === 0) {
        res.status(404).json({ message: 'No hay habitaciones disponibles' })
        return
      }
      // Filtrar las habitaciones disponibles para evitar duplicados
      const disponible = result.find(h => !habitacionesOcupadas.has(h.id))

      if (!disponible) {
        res.status(404).json({ message: 'No hay habitaciones disponibles' })
        return
      }
      // Marcar la habitación como ocupada
      habitacionesOcupadas.add(disponible.id)
      const result2 = await LuxfrontModel.createHabitacionxEstancia({
        estanciaId: idestancia,
        habitacionId: disponible.id
      })
      if (!result2) {
        res.status(500).json({ message: 'Error al crear la estancia' })
        return
      }
      await audiController.createAuditoria(0, 'INSERT', 'HabitacionxEstancia', `ID Estancia: ${idestancia} asociada a la ID Habitacion: ${disponible.id}`)
    }

    const conteoHabitaciones = {}
    habitaciones.forEach(id => {
      conteoHabitaciones[id] = (conteoHabitaciones[id] || 0) + 1
    })

    const resumenhabitaciones = []
    const checkInDate = new Date(fechaReservaIn)
    const checkOutDate = new Date(fechaReservaOut)
    const cantidadDias = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    let subtotalTotal = 0
    let bolivaresTotal = 0
    for (const [id, cantidad] of Object.entries(conteoHabitaciones)) {
      const precio = await LuxfrontModel.getPrecioHabitacion({ id })
      const nombre = await LuxfrontModel.getNombreHabitacion({ id })
      const subtotal = precio * cantidad * cantidadDias
      subtotalTotal += subtotal
      const bolivares = subtotal * parseFloat(process.env.BOLIVARES)
      bolivaresTotal += bolivares
      resumenhabitaciones.push({
        tipo: nombre, // Aquí puedes mapear el id a un nombre de tipo de habitación si lo deseas
        cantidad,
        dias: cantidadDias,
        valor: precio,
        subtotal,
        bolivares
      })
    }

    resumenhabitaciones.push({
      subtotalTotal,
      bolivaresTotal
    })

    res.status(201).json({ id: idestancia, nombre, documento, fechaReservaIn, fechaReservaOut, resumenhabitaciones })
    res.end()
  }

  static async downloadReserva (req, res) {
    // Generar el PDF después de crear la reserva
    const htmlContent = `
      <div class="factura-content">
        <img src="img/section-shape2.png" alt="">
        <h2 class="text-gold">FACTURA DE RESERVA</h2>
        <br>
        <div class="factura-datos text-white">
          <div class="dato-reserva">
            <p>ID de reserva:</p>
            <p id="id_reserva">${idestancia}</p>
          </div>
          <div class="dato-reserva">
            <p>Nombre de huesped:</p>
            <p id="nombre_huesped">${nombre}</p>
          </div>
          <div class="dato-reserva">
            <p>Cédula de huesped:</p>
            <p id="cedula_huesped">${documento}</p>
          </div>
          <div class="dato-reserva">
            <p>Fecha de Check-in:</p>
            <p id="fecha_Check_In">${fechaReservaIn}</p>
          </div>
          <div class="dato-reserva">
            <p>Fecha de Check-out:</p>
            <p id="fecha_Check_Out">${fechaReservaOut}</p>
          </div>
        </div>
        <div class="resumen-habitaciones text-white">
          <h3 class="text-gold">Resumen de Habitaciones</h3>
          <div class="tabla-habitaciones" id="tabla_habitaciones">
            <div class="fila">
              <span>Tipo de habitacion</span>
              <span>Cantidad</span>
              <span>Dias</span>
              <span>Valor</span>
              <span>Subtotal</span>
              <span>Bolivares</span>
            </div>
            ${resumenhabitaciones.map(h => `
              <div class="fila">
                <span>${h.tipo}</span>
                <span>${h.cantidad}</span>
                <span>${h.dias}</span>
                <span>${h.valor}</span>
                <span>${h.subtotal}</span>
                <span>${h.bolivares}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="informacion-contacto text-white">
          <h3 class="text-gold">Información de contacto</h3>
          <p>atencioncliente@royella.com</p>
        </div>
      </div>
    `

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(htmlContent)
    const pdfBuffer = await page.pdf({ format: 'A4' })
    await browser.close()

    // Enviar la respuesta con el PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="factura_reserva_${idestancia}.pdf"`
    })
    res.send(pdfBuffer)
  }
}
