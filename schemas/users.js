import z from 'zod'

const userSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required.'
  }),
  password: z.string({
    invalid_type_error: 'Password must be a string',
    required_error: 'Password is required.'
  }),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required.'
  }),
  rol: z.number({
    invalid_type_error: 'Rol must be a number',
    required_error: 'Rol is required.'
  })
})

export function validateUser (input) {
  return userSchema.safeParse(input)
}

export function validatePartialUser (input) {
  return userSchema.partial().safeParse(input)
}
