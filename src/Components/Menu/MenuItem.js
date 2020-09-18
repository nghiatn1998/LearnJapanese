import React from 'react'
import {View, Text} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

// Styles
import styles from './Styles/MenuItemStyles'
import {Normalize} from '../../Themes'

const MenuItem = props => (
  <View style={styles.container}>
    <View style={styles.iconView}>
      <Ionicons name={props.icon} size={Normalize(24)} color="#546bfb"/>
    </View>
    <View style={styles.content}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  </View>
)

export default MenuItem

