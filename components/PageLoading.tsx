import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const PageLoading = () => {
  return (
    <View className='container justify-center items-center'>
        <ActivityIndicator size={"large"} />
    </View>
  )
}

export default PageLoading