import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'

type TabIconProps = {
    focused: boolean
    title: string
    icon?: ReactNode
}

const TabIcon = ({ focused, title, icon }: TabIconProps) => {
  return (
    <View className='flex flex-1 w-full min-w-[112px] min-h-10 mt-3 justify-center items-center'>
        {icon}
        <Text className={`text-sm font-medium ${focused ? "text-primary" : "text-black"}`}>{title}</Text>
    </View>
  )
}

export default TabIcon