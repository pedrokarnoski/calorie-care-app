import { useRef } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { ScreenHeader } from '@/components/ScreenHeader'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useDataStorage } from '@/storage/data'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const nutritionSchema = z.object({
  name: z.string().min(1, { message: 'Preencha o nome' }),
  weight: z.string().min(1, { message: 'Preencha o peso' }),
  age: z.string().min(1, { message: 'Preencha a idade' }),
  height: z.string().min(1, { message: 'Preencha a altura' }),
})

type FormData = z.infer<typeof nutritionSchema>

export default function CreateDiet() {
  const router = useRouter()

  const weightRef = useRef(null)
  const ageRef = useRef(null)
  const heightRef = useRef(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(nutritionSchema),
  })

  const { setPageOne } = useDataStorage(state => state)

  function handleCreate(data: FormData) {
    setPageOne({
      name: data.name,
      weight: data.weight,
      age: data.age,
      height: data.height,
    })

    router.push('/second-step')
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScreenHeader title="Dieta" subtitle="Passo 1" />

      <ScrollView className="p-8">
        <Text className="text-xl font-bold mb-4">Informe seus dados</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nome"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Seu nome completo"
              autoCapitalize="words"
              errorMessage={errors.name?.message}
              returnKeyType="next"
              onSubmitEditing={() => weightRef.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="weight"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Peso"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Seu peso atual em kg"
              keyboardType="numeric"
              errorMessage={errors.weight?.message}
              returnKeyType="next"
              ref={weightRef}
              onSubmitEditing={() => ageRef.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Idade"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Sua idade"
              keyboardType="numeric"
              errorMessage={errors.age?.message}
              ref={ageRef}
              onSubmitEditing={() => heightRef.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="height"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Altura"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Sua altura em cm"
              keyboardType="numeric"
              errorMessage={errors.height?.message}
              returnKeyType="done"
              ref={heightRef}
              onSubmitEditing={handleSubmit(handleCreate)}
            />
          )}
        />

        <Button className="mt-4 mb-20" onPress={handleSubmit(handleCreate)}>
          <Text>Avançar</Text>
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
