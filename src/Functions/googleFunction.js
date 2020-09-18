import * as Google from 'expo-google-app-auth'

const iosClientId = '854026862311-vg3m6nr5vcblgao68gaoi5j4oc3pohj2.apps.googleusercontent.com'
const androidClientId = '854026862311-2o6o4cd469rcoplpfj8epkhlovs0q9ud.apps.googleusercontent.com'

// callback(error, result)
export const authenticateGoogle = async (callback) => {
  try {
    const result = await Google.logInAsync({
      iosClientId: iosClientId,
      androidClientId: androidClientId,
      scopes: ['profile', 'email']
    })

    if (result.type === 'success') {
      callback(null, result)
    } else {
      callback(null, { isCancelled: true })
    }
  } catch (error) {
    callback(error, null)
  }
}