import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Normalize} from '../../Themes'
import {BlockAnswers} from '../index'

const VocabularyTopicGame = (props) => {
  const {title} = props

  const groupAnswerByQuantity = (answers, quantityAnswer) => {
    const size = quantityAnswer
    return answers.reduce((accumulator, curr, i) => {
      if (!(i % size)) {    // if index is 0 or can be divided by the `size`...
        // ..push a chunk of the original array to the accumulator
        accumulator.push(answers.slice(i, i + size))
      }
      return accumulator
    }, [])
  }

  const renderAnswers = () => {
    const {answers, quantityAnswer, answer_id, checkAnswer, numberQuestion} = {props}
    const answersFormat = answers.map((answer, index) => {
      return {
        ...answer,
        index: index,
        answerCorrect: answer_id === index,
        numberQuestion: numberQuestion
      }
    })
    if (quantityAnswer === 4 || quantityAnswer === 6 || quantityAnswer === 8) {
      const group2Answer = groupAnswerByQuantity(answersFormat, 2)
      return group2Answer.map((answers, index) => {
        return (
          <BlockAnswers
            key={'Answer' + index.toString()}
            answersEachRow={2}
            answers={answers}
            onPress={checkAnswer}
          />
        )
      })
    } else {
      const group3Answer = groupAnswerByQuantity(answersFormat, 3)
      return group3Answer.map((answers, index) => {
        return (
          <BlockAnswers
            key={'Answer' + index.toString()}
            answersEachRow={3}
            answers={answers}
            onPress={checkAnswer}
          />
        )
      })
    }
  }

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.vocabularyContainer}>
        <Text style={styles.vocabularyText}>
          {title}
        </Text>
      </View>
      <View style={styles.separator}/>
      {renderAnswers()}
      <View style={styles.bottomSeparator}/>
    </View>
  )
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: '#150B7B',
    marginTop: 5,
    paddingHorizontal: 20
  },
  vocabularyContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vocabularyText: {
    fontSize: Normalize(24),
    fontFamily: 'source-code-pro-bold'
  },
  separator: {
    marginVertical: 10
  },
  bottomSeparator: {
    marginBottom: 10
  }
})

export default VocabularyTopicGame