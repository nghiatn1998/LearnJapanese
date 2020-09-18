import * as Facebook from 'expo-facebook'

const facebookAuthenticateURL = (token) => `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`

// callback(error, result)
export const authenticateFacebook = async (callback) => {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions
    } = await Facebook.logInWithReadPermissionsAsync('959670457736521', {
      permissions: ['public_profile', 'email']
    })

    if (type === 'success') {
      const response = await fetch(facebookAuthenticateURL(token))
      const responseData = await response.json()
      callback(null, responseData)
    } else {
      callback(null, { isCancelled: true })
    }
  } catch (error) {
    callback(error, null)
  }
}
