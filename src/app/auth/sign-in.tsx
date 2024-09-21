import React, { useRef, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

import { GoogleIcon, Salad } from '@/lib/icons'

// import { useToast } from "@/components/Toast";

// import Logo from "@/assets/logo.svg";

type FormData = {
  email: string
  password: string
}

export default function SignIn() {
  // const { toast } = useToast();

  const scrollRef = useRef<KeyboardAwareScrollView | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)

      // await signIn(email, password);
    } catch (error) {
      reset({
        email: '',
        password: '',
      })

      setIsLoading(false)
    }
  }

  function handleNewAccount() {
    // navigation.navigate("signUp");
  }

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="flex-grow"
      showsVerticalScrollIndicator={false}
      ref={scrollRef}
      keyboardShouldPersistTaps="handled"
    >
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
              <Controller
                control={control}
                name="email"
                rules={{ required: 'Informe o e-mail' }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="E-mail"
                    labelColor="text-foreground"
                    placeholder="Seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{ required: 'Informe a senha' }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Senha"
                    placeholder="Sua senha"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <View className="flex-1 gap-4 mt-6">
                <Button onPress={handleSubmit(handleSignIn)}>
                  <Text>Entrar</Text>
                </Button>

                <Separator />

                <Button variant="ghost">
                  <GoogleIcon className="text-foreground" size={18} />
                  <Text>Continuar com o Google</Text>
                </Button>

                <View className="mt-8 items-center justify-center">
                  <Text className="text-foreground">Ainda não tem acesso?</Text>
                </View>
                <Button variant="link" onPress={handleNewAccount}>
                  <Text>Criar conta</Text>
                </Button>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  )
}
