import React from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {StyleSheet} from 'react-native'
import '@/i18n'
import {RootNavigator} from './navigation/RootNavigator'

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <RootNavigator />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {flex: 1},
})
