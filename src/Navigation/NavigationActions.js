import { NavigationActions, StackActions } from 'react-navigation'

export const resetTo = routeName =>
  StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: routeName })]
  })

export const getRouteName = navigationState => {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getRouteName(route)
  }
  return route.routeName
}
