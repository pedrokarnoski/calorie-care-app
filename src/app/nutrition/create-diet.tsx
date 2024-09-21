import { ScrollView, View } from 'react-native'

import { ScreenHeader } from '@/components/ScreenHeader'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { zodResolver } from '@hookform/resolvers/zod'
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
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(nutritionSchema),
  })

  function handleCreate(data: FormData) {
    console.log(data)
  }

  return (
    <View className="flex-1">
      <ScreenHeader title="Dieta" />

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
            />
          )}
        />

        <Button className="mt-4" onPress={handleSubmit(handleCreate)}>
          <Text>Avançar</Text>
        </Button>
      </ScrollView>
    </View>
  )
}
