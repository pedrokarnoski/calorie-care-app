import '../../global.css'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Platform, View } from 'react-native'

import { setAndroidNavigationBar } from '@/lib/android-navigation-bar'
import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { type Theme, ThemeProvider } from '@react-navigation/native'
import { PortalHost } from '@rn-primitives/portal'
import { Slot, SplashScreen, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { env } from '@/env'
import { queryClient } from '@/lib/react-query'
import { tokenCache } from '@/storage/tokenCache'
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
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

  const publishableKey = env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  function InitialLayout() {
    const { isSignedIn, isLoaded } = useAuth()

    useEffect(() => {
      if (!isLoaded) return

      if (!isSignedIn) {
        router.replace('/(auth)')
      } else {
        router.replace('/(drawer)/home')
      }
    }, [isSignedIn, isLoaded])

    return isLoaded ? (
      <Slot />
    ) : (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    )
  }

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
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <ClerkLoaded>
            <GestureHandlerRootView className="flex-1">
              <InitialLayout />
            </GestureHandlerRootView>
          </ClerkLoaded>
        </ClerkProvider>
      </QueryClientProvider>
      <PortalHost />
    </ThemeProvider>
  )
}
