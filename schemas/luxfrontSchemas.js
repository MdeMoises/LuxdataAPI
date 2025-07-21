import z from 'zod'

const luxfrontSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Nombre debe ser una cadena',
    required_error: 'Nombre es requerido.'
  }),
  tipoDocumento: z.string({
    invalid_type_error: 'Tipo de documento debe ser una cadena',
    required_error: 'Tipo de documento es requerido.'
  }),
  documento: z.string({
    invalid_type_error: 'Documento debe ser un número',
    required_error: 'Documento es requerido.'
  }),
  fechaNac: z.string().refine((fecha) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(fecha)
  }, {
    message: 'La fecha de nacimiento debe estar en el formato YYYY-MM-DD'
  }),
  telefono: z.string({
    invalid_type_error: 'Teléfono debe ser un número',
    required_error: 'Teléfono es requerido.'
  }),
  correo: z.string({
    invalid_type_error: 'Correo debe ser una cadena',
    required_error: 'Correo es requerido.'
  }).email({
    message: 'Correo no es válido'
  }),
  localidad: z.string({
    invalid_type_error: 'Localidad debe ser una cadena',
    required_error: 'Localidad es requerida.'
  }),
  genero: z.string({
    invalid_type_error: 'Género debe ser una cadena',
    required_error: 'Género es requerido.'
  }),
  fechaReservaIn: z.string().refine((fecha) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(fecha)
  }, {
    message: 'La fecha de reserva-In debe estar en el formato YYYY-MM-DD'
  }),
  fechaReservaOut: z.string().refine((fecha) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(fecha)
  }, {
    message: 'La fecha de reserva-Out debe estar en el formato YYYY-MM-DD'
  }),
  nroOcupantes: z.number({
    invalid_type_error: 'Número de ocupantes debe ser un número',
    required_error: 'Número de ocupantes es requerido.'
  }),
  habitaciones: z.array(z.number(), {
    invalid_type_error: 'Habitaciones debe ser un arreglo de números',
    required_error: 'Habitaciones es requerido.'
  }),
  estadoReserva: z.number({
    invalid_type_error: 'Estado de reserva debe ser un número',
    required_error: 'Estado de reserva es requerido.'
  }),
  fechaPago: z.string().refine((fecha) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(fecha)
  }, {
    message: 'La fecha de pago debe estar en el formato YYYY-MM-DD'
  }),
  monto: z.number({
    invalid_type_error: 'Monto debe ser un número',
    required_error: 'Monto es requerido.'
  }),
  referencia: z.string({
    invalid_type_error: 'Referencia debe ser una cadena',
    required_error: 'Referencia es requerida.'
  })
})

export function validate (input) {
  return luxfrontSchema.safeParse(input)
}

export function validatePartial (input) {
  return luxfrontSchema.partial().safeParse(input)
}
