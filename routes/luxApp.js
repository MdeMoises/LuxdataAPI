import { Router } from 'express'
import { LuxAppController } from '../controllers/luxApp.js'
import { LuxfrontController } from '../controllers/luxfrontController.js'
import { audiController } from '../auditoria/auditoriaController.js'

export const LuxAppRouter = Router()

// INICIO
LuxAppRouter.get('/inicio/ocupacytoday', LuxAppController.getOcupacy)
LuxAppRouter.get('/inicio/habinfo', LuxAppController.getHabInfo)
LuxAppRouter.get('/inicio/ocupantes', LuxAppController.getOcupantes)
LuxAppRouter.get('/inicio/reservantes', LuxAppController.getReservantes)
LuxAppRouter.patch('/inicio/checkin/:id', LuxAppController.setCheckIn)    //INSERT (-Cliente, ocupantes_x_estancia) AND UPDATE -Estancia *
LuxAppRouter.patch('/inicio/checkout/:id', LuxAppController.setCheckOut)    //UPDATE  -Estancia *

// RESERVA
LuxAppRouter.post('/reserva/data/:id', LuxAppController.getEstanciaData)
LuxAppRouter.patch('/reserva/update/:id', LuxAppController.updateEstancia)  //UPDATE  -Estancia *
LuxAppRouter.patch('/reserva/cancel/:id', LuxAppController.cancelReserva)   //UPDATE  -Estancia *
LuxAppRouter.post('/reserva/create', LuxfrontController.createReserva)    //INSERT  -Cliente, estancia, habitacion_x_estancia, pagos, pagos_x_estancia  *
LuxAppRouter.post('/reserva/presupuesto', LuxfrontController.createPresupuesto)

// HABITACIONES ESTADO
LuxAppRouter.get('/habstatus', LuxAppController.getHabStatus)

// ESTADISTICAS
LuxAppRouter.get('/estadisticas/ocupacion', LuxAppController.getEstadisticasOcupacion)
LuxAppRouter.get('/estadisticas/ingresos', LuxAppController.getEstadisticasIngresos)
LuxAppRouter.get('/estadisticas/localizacion', LuxAppController.getEstadisticasLocalizacion)

// CALENDARIO
LuxAppRouter.get('/calendar', LuxAppController.getCalendar)

// PAGOS
LuxAppRouter.get('/pagos', LuxAppController.getPagos)
LuxAppRouter.get('/pagos/pending', LuxAppController.getPagosPendientes)
LuxAppRouter.patch('/pagos/:referencia', LuxAppController.setValidarPago) //UPDATE - Pagos  * 

// AUDITORIA
LuxAppRouter.get('/movimientos', audiController.getAuditoria)
