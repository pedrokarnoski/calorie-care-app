import '../../global.css'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'

import { setAndroidNavigationBar } from '@/lib/android-navigation-bar'
import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { type Theme, ThemeProvider } from '@react-navigation/native'
import { PortalHost } from '@rn-primitives/portal'
import { Slot, SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
}

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      const theme = await AsyncStorage.getItem('theme')

      if (Platform.OS === 'web') {
        document.documentElement.classList.add('bg-background')
      }

      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme)
        setIsColorSchemeLoaded(true)
        return
      }

      const colorTheme = theme === 'dark' ? 'dark' : 'light'

      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme)
        setAndroidNavigationBar(colorTheme)
        setIsColorSchemeLoaded(true)
        return
      }

      setAndroidNavigationBar(colorTheme)
      setIsColorSchemeLoaded(true)
    })().finally(() => {
      SplashScreen.hideAsync()
    })
  }, [colorScheme, setColorScheme])

  if (!isColorSchemeLoaded) {
    return null
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView className="flex-1">
          {/* <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth/sign-in" />
          <Stack.Screen name="root/home" />
          <Stack.Screen name="root/create-diet" />
          <Stack.Screen name="root/second-step" />
          <Stack.Screen name="root/resume" />
        </Stack> */}
          <Slot />
        </GestureHandlerRootView>
      </QueryClientProvider>
      <PortalHost />
    </ThemeProvider>
  )
}
