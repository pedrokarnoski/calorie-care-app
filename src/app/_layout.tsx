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
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

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
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth/sign-in" />
          <Stack.Screen name="home" />
          <Stack.Screen name="nutrition/create-diet" />
          <Stack.Screen name="nutrition/second-step" />
          <Stack.Screen name="nutrition/resume" />
        </Stack>
      </QueryClientProvider>
      <PortalHost />
    </ThemeProvider>
  )
}
