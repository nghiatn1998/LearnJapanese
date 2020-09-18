import validator from 'validator'

const LENGTH_TEXT_INPUT = {
  min: 8,
  max: 16
}

const LENGTH_TEXT_INPUT_FULL_NAME = {
  min: 5,
  max: 16
}

export function isEmail (email) {
  if (email) {
    return validator.isEmail(email) ? null : 'Email invalid'
  }
  return null
}

export function isValidateFullName (fullName) {
  if (!fullName) return null
  return validator.isLength(fullName, {
    min: LENGTH_TEXT_INPUT_FULL_NAME.min,
    max: LENGTH_TEXT_INPUT_FULL_NAME.max
  }) ? null : 'Name should be 16 maximum and minimum 3 character'
}

export function isValidPassword (password) {
  if (!password) return null
  return validator.isLength(password, {
    min: LENGTH_TEXT_INPUT.min,
    max: LENGTH_TEXT_INPUT.max
  }) ? null : 'Password min and max'
}

export function isMatchPassword (password, confirmPassword) {
  if (password && confirmPassword) {
    return validator.equals(password, confirmPassword) ? null : 'Password not match'
  }
  return null
}

export function isEmpty (string, messageError = 'have an error') {
  return validator.isEmpty(string) ? messageError : null
}

export function isBlank (str) {
  return (!str || /^\s*$/.test(str))
}

export function isNull (string, messageError = 'have an error') {
  return (string === null) ? messageError : null
}

export function isValidYear (year, checkEmpty) {
  let isValid = true
  if (checkEmpty) {
    if (isNaN(year) || year === '') {
      isValid = false
    }
  }
  if (year < 0 || year > 99) {
    isValid = false
  }
  return isValid ? null : 'Year invalid'
}

export function isValidMonth (month, checkEmpty) {
  let isValid = true
  if (checkEmpty) {
    if (isNaN(month) || month === '') {
      isValid = false
    }
  }
  if (month < 0 || month > 12) {
    isValid = false
  }
  return isValid ? null : 'Month invalid'
}

export function hasWhiteSpace (s) {
  const reWhiteSpace = new RegExp(/^\s+$/)
  // Check for white space
  if (reWhiteSpace.test(s)) {
    return 'Space not allowed'
  }
  return null
}

export function removeExtraSpace (text) {
  return text.replace(/\s+/g, ' ').trim()
}
