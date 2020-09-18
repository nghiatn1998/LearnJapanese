import { StyleSheet } from 'react-native'
import { Metrics, Normalize } from '../../../Themes'

let cardWidth = Metrics.screenWidth
if (Metrics.screenWidth > 500) {
  cardWidth = 500
}

export default StyleSheet.create({
  closeContainer: {
    position: "absolute",
    top: Normalize(98),
    left: "50%",
    marginLeft: -22,
    zIndex: 1
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  title: {
    color: 'white',
    fontSize: Normalize(24),
    fontWeight: '600'
  },
  subtitle: {
    fontSize: Normalize(13),
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 8
  },
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    width: cardWidth,
    alignSelf: 'center',
    height: '100%',
    zIndex: 100,
    borderRadius: 10,
    overflow: 'hidden'
  },
  cover: {
    height: Normalize(142),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    height: Metrics.screenHeight,
    backgroundColor: '#f0f3f5',
    paddingHorizontal: 50,
    paddingTop: 20
  }
})
