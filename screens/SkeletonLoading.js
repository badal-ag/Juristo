import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const SkeletonLoading = () => {
  return (
    <View className=" bg-white h-full flex justify-content items-center">
    <LottieView
      className="h-100 w-100"
      source={require("../assets/animation/skeletonloading.json")}
      autoPlay
    />
  </View>
  )
}

export default SkeletonLoading