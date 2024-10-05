import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

import { AppleIcon, FacebookIcon, GoogleIcon, Salad } from '@/lib/icons'

import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const googleOAuth = useOAuth({
    strategy: 'oauth_google',
  })

  const facebookOAuth = useOAuth({
    strategy: 'oauth_facebook',
  })

  const appleOAuth = useOAuth({
    strategy: 'oauth_apple',
  })

  async function onGoogleSignIn() {
    await handleOAuthSignIn(googleOAuth, 'Google')
  }

  async function onFacebookSignIn() {
    await handleOAuthSignIn(facebookOAuth, 'Facebook')
  }

  async function onAppleSignIn() {
    await handleOAuthSignIn(appleOAuth, 'Apple')
  }

  interface OAuthProvider {
    startOAuthFlow: (options: {
      redirectUrl: string
    }) => Promise<OAuthFlowResult>
  }

  interface OAuthFlowResult {
    authSessionResult?: { type: string }
    setActive?: (options: { session: string }) => Promise<void>
    createdSessionId?: string
  }

  async function handleOAuthSignIn(
    oAuthProvider: OAuthProvider,
    providerName: string
  ): Promise<void> {
    try {
      setIsLoading(true)

      const redirectUrl = Linking.createURL('/(drawer)/home')

      const oAuthFlow = await oAuthProvider.startOAuthFlow({ redirectUrl })

      if (oAuthFlow.authSessionResult?.type === 'success') {
        if (oAuthFlow.setActive) {
          if (oAuthFlow.createdSessionId) {
            await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
          } else {
            throw new Error('Session ID is undefined')
          }
        }
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(`Failed to sign in with ${providerName}`, error)
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync()

    return () => {
      WebBrowser.coolDownAsync()
    }
  }, [])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    )
  }

  return (
    <View className="flex-1 items-center justify-center gap-4 px-8 bg-background">
      <View className="flex items-center gap-2 mb-16">
        <Salad className="text-primary" size={48} />
        <Text className="text-foreground font-semibold">CalorieCare</Text>
        <Text className="text-foreground text-sm">Bem-vindo de volta!</Text>
      </View>

      <Text className="font-semibold text-foreground text-xl">
        Acesse sua conta
      </Text>

      <View className="flex-row justify-between gap-4 mt-4 w-full">
        <Button
          size="lg"
          variant="outline"
          onPress={onGoogleSignIn}
          className="flex-1"
        >
          <GoogleIcon className="text-foreground" size={22} />
        </Button>

        <Button
          size="lg"
          variant="outline"
          onPress={onFacebookSignIn}
          className="flex-1"
        >
          <FacebookIcon className="text-foreground" size={22} />
        </Button>

        <Button
          size="lg"
          variant="outline"
          onPress={onAppleSignIn}
          className="flex-1"
        >
          <AppleIcon className="text-foreground" size={22} />
        </Button>
      </View>
    </View>
  )
}
