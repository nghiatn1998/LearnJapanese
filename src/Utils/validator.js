export const isValidEmail = (email) => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/.test(email)

export const isValidPassword = (password) => /(?=.{8,})/.test(password)

export const isValidName = (name) => /([a-zA-Z]+\s+[a-zA-Z]+)/.test(name)
