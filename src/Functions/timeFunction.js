export function getTime (time, hour, minute) {
  const getHours = Math.floor(Math.abs(time) / (1000 * 60 * 60) % 24)
  const getMinutes = Math.floor(Math.abs(time) / (1000 * 60) % 60)
  const getSeconds = Math.floor(Math.abs(time) / (1000) % 60)
  if (getMinutes >= 30) {
    if (hour) {
      return (getHours + 1)
    }
  } else {
    if (hour) {
      return getHours
    }
  }
  if (minute) {
    return (getMinutes + getSeconds / 60)
  }
  return `${getHours}` + `${getMinutes}` + `${getSeconds}`
}

export function pad2 (number) {
  return (number < 10 ? '0' : '') + number
}

export function convertTimeToString (time, type) {
  if (time > 0 && !type) {
    return (pad2(parseInt(time)) + ':' + pad2(parseInt((time - parseInt(time)) * 60)))
  }
  if (parseInt((time - parseInt(time))) < 0) {
    return pad2(0)
  }
  if (!time) {
    return '00:00'
  }
  if (type) {
    return ((parseInt(time)) + ' min ' + pad2(parseInt((time - parseInt(time)) * 60)))
  }
}