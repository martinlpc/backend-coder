import bcrypt from 'bcrypt'

export const createHash = async (password) => {
  return bcrypt.hash(password, await bcrypt.genSalt(parseInt(process.env.SALT)))
}

export const validatePassword = async (password, storedPassword) => {
  return await bcrypt.compare(password, storedPassword)
}