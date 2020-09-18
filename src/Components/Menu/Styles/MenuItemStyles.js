import {StyleSheet} from 'react-native'
import {Normalize} from '../../../Themes'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15
  },
  iconView: {
    width: Normalize(32),
    height: Normalize(32),
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    paddingLeft: 20
  },
  title: {
    color: '#3c4560',
    fontSize: 24,
    fontWeight: '600'
  },
  text: {
    color: '#3c4560',
    fontWeight: '600',
    opacity: 0.6,
    marginTop: 5
  }
})
