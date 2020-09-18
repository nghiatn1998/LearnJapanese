import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  smallMargin: 5,
  baseMargin: 10,
  base: 8,
  doubleBase: 16,
  halfTripleBaseMargin: 15,
  spaceMargin: 18,
  spaceMarginFeed: 22,
  spaceMarginProfileImage: 24,
  doubleBaseMargin: 20,
  halfQuintupleBaseMargin: 25,
  tripleBaseMargin: 30,
  quadrupleBaseMargin: 40,
  spaceMarginContact: 48,
  quintupleBaseMargin: 50,
  heightHeader: 54,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  heightFeed: (9 * (width - 22 * 2)) / 16 // 9:20
}

export default metrics
