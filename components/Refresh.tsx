import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

type RefreshProps = {
    refreshFn: () => void
}

const Refresh = ({ refreshFn }: RefreshProps) => {
  return (
    <TouchableOpacity className="btn-secondary" onPress={refreshFn}>
        <Text className="btn-text-white">Odśwież</Text>
    </TouchableOpacity>
  )
}

export default Refresh