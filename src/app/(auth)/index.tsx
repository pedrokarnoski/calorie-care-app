import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

import { GoogleIcon, Salad } from '@/lib/icons'

import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const googleOAuth = useOAuth({
    strategy: 'oauth_google',
  })

  async function onGoogleSignIn() {
    try {
      setIsLoading(true)

      const redirectUrl = Linking.createURL('/(drawer)/home')

      const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl })

      if (oAuthFlow.authSessionResult?.type === 'success') {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
        } else {
          setIsLoading(false)
        }
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Failed to sign in with Google', error)
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync()

    return () => {
      WebBrowser.coolDownAsync()
    }
  }, [])

  return (
    <View className="flex-1 bg-background">
      <ImageBackground
        className="flex-1 justify-center"
        source={require('@/assets/background.png')}
      >
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <View className="flex items-center gap-2 mb-16">
            <Salad className="text-primary" size={64} />
            <Text className="text-foreground">
              Calorie<Text className="text-foreground font-bold">Care</Text>
            </Text>
          </View>

          <Text className="font-semibold text-foreground text-xl">
            Acesse sua conta
          </Text>

          <View className="w-full">
            <View className="flex-1 gap-4 mt-6">
              <Separator />

              <Button
                isLoading={isLoading}
                variant="ghost"
                onPress={onGoogleSignIn}
              >
                <GoogleIcon className="text-foreground" size={18} />
                <Text>Entrar com o Google</Text>
              </Button>

              <View className="mt-8 items-center justify-center">
                <Text className="text-foreground">Ainda não tem acesso?</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
