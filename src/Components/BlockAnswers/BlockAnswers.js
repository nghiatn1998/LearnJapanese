import React from 'react'
import {View, StyleSheet} from 'react-native'

// Components
import BlockAnswer from './BlockAnswer'

const BlockAnswers = (props) => {
  const {answersEachRow, answers, onPress} = props

  const renderTwoQuestionEachRow = (answers) => {
    return (
      <View style={styles.answerBlockContainer}>
        <BlockAnswer
          onPress={onPress}
          numberQuestion={answers[0].numberQuestion}
          answer_index={answers[0].index}
          answerCorrect={answers[0].answerCorrect}
          image={answers[0].answer}
          id={answers[0]._id}
        />
        <View style={styles.separator}/>
        <BlockAnswer
          onPress={onPress}
          numberQuestion={answers[1].numberQuestion}
          answer_index={answers[1].index}
          answerCorrect={answers[1].answerCorrect}
          image={answers[1].answer}
          id={answers[1]._id}
        />
      </View>
    )
  }

  const renderThreeQuestionEachRow = (answers) => {
    return (
      <View style={styles.answerBlockContainer}>
        <BlockAnswer
          onPress={onPress}
          numberQuestion={answers[0].numberQuestion}
          answer_index={answers[0].index}
          answerCorrect={answers[0].answerCorrect}
          image={answers[0].answer}
          id={answers[0]._id}
        />
        <View style={styles.separator}/>
        <BlockAnswer
          onPress={onPress}
          numberQuestion={answers[1].numberQuestion}
          answer_index={answers[1].index}
          answerCorrect={answers[1].answerCorrect}
          image={answers[1].answer}
          id={answers[1]._id}
        />
        <View style={styles.separator}/>
        <BlockAnswer
          onPress={onPress}
          numberQuestion={answers[2].numberQuestion}
          answer_index={answers[2].index}
          clicked={answers[2].clicked}
          answerCorrect={answers[2].answerCorrect}
          image={answers[2].answer}
          id={answers[2]._id}
        />
      </View>
    )
  }

  return (
    <React.Fragment>
      {(answersEachRow !== 0 && answersEachRow === 2) && renderTwoQuestionEachRow(answers)}
      {(answersEachRow !== 0 && answersEachRow === 3) && renderThreeQuestionEachRow(answers)}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  answerBlockContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15
  },
  separator: {
    marginHorizontal: 5
  }
})

export default BlockAnswers
