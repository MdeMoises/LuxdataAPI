/**
 * Prueba unitaria para LuxAppController.getOcupacy usando Jest
 */

import { LuxAppModel } from '../models/luxApp.js' // Ajusta según tu estructura
import { LuxAppController } from '../controllers/luxApp.js'; // Ajusta según tu estructura

// Mock de res para capturar json y end
const createMockResponse = () => {
  const res = {}
  res.json = jest.fn()
  res.end = jest.fn()
  return res
}

describe('getOcupacy', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks()
  })

  it('debe responder con la ocupación correcta y disponibilidad corregida', async () => {
    // Mock de LuxAppModel.getOcupacy para devolver 10 ocupadas
    jest.spyOn(LuxAppModel, 'getOcupacy').mockResolvedValue([{ Ocupadas: 10 }])

    // Mock de LuxAppModel.getTotalHab para devolver 50 totales
    jest.spyOn(LuxAppModel, 'getTotalHab').mockResolvedValue([{ Total: 50 }])

    const req = {} // no usado en función
    const res = createMockResponse()

    await LuxAppController.getOcupacy(req, res)

    // Verificar que res.json se haya llamado con los datos calculados correctamente
    expect(res.json).toHaveBeenCalledWith({
      ocupadas: 10,
      disponibles: 40, // 50 - 10
      bloqueadas: 0
    })

    // Verificar que res.end se haya llamado
    expect(res.end).toHaveBeenCalled()
  })

  it('debe manejar caso con 0 ocupadas y 0 disponibles', async () => {
    jest.spyOn(LuxAppModel, 'getOcupacy').mockResolvedValue([{ Ocupadas: 0 }])
    jest.spyOn(LuxAppModel, 'getTotalHab').mockResolvedValue([{ Total: 0 }])

    const req = {}
    const res = createMockResponse()

    await LuxAppController.getOcupacy(req, res)

    expect(res.json).toHaveBeenCalledWith({
      ocupadas: 0,
      disponibles: 0,
      bloqueadas: 0
    })
    expect(res.end).toHaveBeenCalled()
  })

  // Más pruebas según sea necesario...
})

