import React, { useRef, useState, useImperativeHandle } from 'react'
import { Text, View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

// Style
import { Metrics, Colors, Normalize, ImagesStudy } from '../../Themes'
const styles = StyleSheet.create({
  content: {
    marginBottom: Metrics.baseMargin
  },
  title: {
    fontFamily: 'SFProText-Bold',
    fontSize: Normalize(12),
    color: Colors.blackRussian
  },
  wrapTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.smallMargin + 3,
    backgroundColor: Colors.white,
    borderRadius: Metrics.smallMargin
  },
  textInput: {
    flex: 1,
    height: Normalize(Metrics.quadrupleBaseMargin),
    paddingHorizontal: Metrics.baseMargin,
    fontSize: Normalize(12),
    fontFamily: 'source-code-pro',
    color: Colors.blackRussian
  },
  iconRight: {
    padding: Metrics.baseMargin,
    marginHorizontal: Metrics.spaceMargin
  },
  textError: {
    marginTop: Metrics.smallMargin,
    fontFamily: 'source-code-pro',
    fontSize: Normalize(12),
    color: Colors.redOrange
  }
})

const DTextInput = React.forwardRef((props, ref) => {
  const { contentContainerStyle, textInputStyle } = props
  const [value, setValue] = useState(props.value || '')
  const [isHide, setHide] = useState(true)
  const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry || false)

  const { title, onChangeTextCallback, error } = props
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))

  const onChangeText = (value) => {
    setValue(value)
    onChangeTextCallback(value)
  }

  const changeSetShowHidePassword = () => {
    setSecureTextEntry(!secureTextEntry)
    setHide(!isHide)
    setValue(value)
  }

  return (
    <View style={[styles.content, contentContainerStyle]}>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={styles.wrapTextInput}>
        <TextInput
          ref={inputRef}
          textContentType={'none'}
          style={[styles.textInput, textInputStyle]}
          placeholderTextColor={'rgba(0, 0, 36, 0.5)'}
          autoCapitalize={'none'}
          underlineColorAndroid={'transparent'}
          value={value}
          onChangeText={onChangeText}
          {...props}
          secureTextEntry={secureTextEntry}
        />
        {
          props.secureTextEntry &&
          <TouchableOpacity onPress={changeSetShowHidePassword}>
            <Image
              source={isHide ? ImagesStudy.eyeGrey : ImagesStudy.eyeBlack}
              style={styles.iconRight}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        }
      </View>
      {
        error &&
        <Text style={styles.textError} numberOfLines={2}>{error}</Text>
      }
    </View>
  )
})

DTextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  contentContainerStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.string
}

export default DTextInput
