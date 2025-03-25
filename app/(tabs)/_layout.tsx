import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='index' options={{ headerShown: false, title: "Home" }} />
        <Tabs.Screen name='categories' options={{ headerShown: false, title: "Kategorie" }} />
        <Tabs.Screen name='products' options={{ headerShown: false, title: "Produkty" }} />
    </Tabs>
  )
}

export default _layout