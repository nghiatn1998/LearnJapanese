import IO from 'socket.io-client'

export let socket
const SocketURL = 'http://192.168.1.7:3001'

// Socket event connect, disconnect
export const socketConnection = () => {
  socket = IO.connect(SocketURL, {
    'reconnection': true,
    'reconnectionDelay': 100,
    'reconnectionAttempts': Infinity,
    transports: ['websocket'],
    forceNew: true
  })
}
export const socketCheckConnect = () => {
  if (socket) {
    socket.on('connect', () => {
      // console.log('Connected to server success')
    })
    socket.on('disconnect', () => {
      socket.removeAllListeners()
    })
  }
}
export const socketDisconnect = () => {
  // console.log('------- Disconnect Socket -------')
  if (socket) {
    socket.disconnect(true)
  }
}

// Socket emit event
export const emitQuizJoin = (userId, topicId) => {
  socket.emit('quiz-join', {userId, topicId})
}
export const emitQuizClosed = (roomId) => {
  socket.emit('quiz-closed', { roomId })
}
export const emitQuizAnswer = (roomId, questionId, answerAtSecond, answerId, userId) => {
  socket.emit('quiz-answer', {roomId, questionId, answerAtSecond, answerId, userId})
}
export const emitQuizAutoAnswer = (roomId, questionId) => {
  socket.emit('quiz-auto-answer', {roomId, questionId})
}

// Socket on event
export const onQuizNewUser = (callback) => {
  if (socket && socket.connected) {
    socket.on('quiz-new-user', (response) => {
      callback(response)
    })
  }
}
export const onQuizRank = (callback) => {
  if (socket && socket.connected) {
    socket.on('quiz-rank', (response) => {
      callback(response)
    })
  }
}
export const onQuizAnswerResponse = (callback) => {
  if (socket && socket.connected) {
    socket.on('quiz-answer-response', (response) => {
      callback(response)
    })
  }
}
export const onQuizReturnQuestion = (callback) => {
  if (socket && socket.connected) {
    socket.on('quiz-return-questions', (response) => {
      callback(response)
    })
  }
}
export const onQuizJoinSuccess = (callback) => {
  if (socket && socket.connected) {
    socket.on('quiz-join-success', (response) => {
      callback(response)
    })
  }
}
export const onQuizJoinError = (callback) => {
  if (socket && socket.connected) {
    socket.on('quiz-join-error', (response) => {
      callback(response)
    })
  }
}

// Socket remove event
export const removeListener = (eventListener) => {
  if (socket) {
    switch (eventListener) {
      case socketCheckConnect:
        socket.off('connect')
        socket.off('disconnect')
        break
      case onQuizNewUser:
        socket.off('quiz-new-user')
        break
      case onQuizJoinSuccess:
        socket.off('quiz-join-success')
        break
      case onQuizJoinError:
        socket.off('quiz-join-error')
        break
      case onQuizReturnQuestion:
        socket.off('quiz-return-questions')
        break
      case onQuizAnswerResponse:
        socket.off('quiz-answer-response')
        break
      case onQuizRank:
        socket.off('quiz-rank')
        break
      default:
        break
    }
  }
}
