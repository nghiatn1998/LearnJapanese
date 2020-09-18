import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import MainNavigatorGame from './MainNavigationGame'

const NavigationContainer = () => {
  const navRef = useRef()
  const isAuthenticate = useSelector(
    state =>
      !!state.authenticate.token && !!state.authenticate.userInformation.token
  )

  useEffect(() => {
    if (!isAuthenticate) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'AuthScreen' })
      )
    }
  }, [isAuthenticate])

  return <MainNavigatorGame ref={navRef} />
}

export default NavigationContainer
