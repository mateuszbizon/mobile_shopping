import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='index' options={{ headerShown: false, title: "Home" }} />
    </Tabs>
  )
}

export default _layout