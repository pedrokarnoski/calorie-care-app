import React, { useRef, useState } from 'react'
import { View } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Salad } from '@/lib/icons/Salad'
import { SafeAreaView } from 'react-native-safe-area-context'
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

  function handleNewAccount() {
    // navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)

      // await signIn(email, password);
    } catch (error) {
      // const isAppError = error instanceof AppError;

      // const description = isAppError
      //   ? error.message
      //   : "Não foi possível entrar. Tente novamente mais tarde.";

      // toast(description, "destructive", 5000);

      reset({
        email: '',
        password: '',
      })

      setIsLoading(false)
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="flex-grow"
      showsVerticalScrollIndicator={false}
      ref={scrollRef}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 px-8 py-32">
        {/* <Image
          className="absolute"
          source={require('@/assets/background.png')}
          defaultSource={require('@/assets/background.png')}
          alt="Pessoas treinando"
        /> */}

        <SafeAreaView>
          <View className="flex items-center justify-center gap-2 mb-20">
            <Salad className="text-primary" size={64} />
            <Text>
              Calorie<Text className="font-bold">Care</Text>
            </Text>
          </View>

          <View className="flex items-center justify-center">
            <Text className="font-semibold text-xl mb-2">Acesse sua conta</Text>
          </View>

          <Controller
            control={control}
            name="email"
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="E-mail"
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

          {/* isLoading={isLoading} */}
          <Button className="mt-4" onPress={handleSubmit(handleSignIn)}>
            <Text>Acessar</Text>
          </Button>

          <View className="mt-12 items-center justify-center">
            <Text className="text-gray-100 mb-1.5">Ainda não tem acesso?</Text>
          </View>
          <Button variant="link" onPress={handleNewAccount}>
            <Text>Criar conta</Text>
          </Button>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  )
}
