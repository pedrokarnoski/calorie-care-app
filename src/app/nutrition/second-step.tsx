import { ScreenHeader } from '@/components/ScreenHeader'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Text } from '@/components/ui/text'
import { ChevronDown } from '@/lib/icons'
import { useDataStorage } from '@/storage/data'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { z } from 'zod'

const nutritionSchema = z.object({
  gender: z.string().min(1, { message: 'Selecione seu gênero' }),
  objective: z.string().min(1, { message: 'Selecione o seu objetivo' }),
  level: z.string().min(1, { message: 'Selecione seu nível atual' }),
})

type FormData = z.infer<typeof nutritionSchema>

export default function SecondStep() {
  const dropdownRef = useRef(null)
  const [menuWidth, setMenuWidth] = useState(0)

  function measureDropdownWidth() {
    dropdownRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setMenuWidth(width)
    })
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(nutritionSchema),
  })

  const genderOptions = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
  ]

  const levelOptions = [
    {
      label: 'Sedentário (pouco ou nenhuma atividade física)',
      value: 'Sedentário',
    },
    {
      label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)',
      value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)',
    },
    {
      label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)',
      value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)',
    },
    {
      label: 'Altamente ativo (exercícios 5 a 7 dia por semana)',
      value: 'Altamente ativo (exercícios 5 a 7 dia por semana)',
    },
  ]

  const objectiveOptions = [
    { label: 'Emagrecer', value: 'emagrecer' },
    { label: 'Hipertrofia', value: 'Hipertrofia' },
    { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
    { label: 'Definição', value: 'Definição' },
  ]

  const { setPageTwo } = useDataStorage(state => state)

  function handleCreate(data: FormData) {
    setPageTwo({
      gender: data.gender,
      objective: data.objective,
      level: data.level,
    })

    router.push('nutrition/resume')
  }

  return (
    <View className="flex-1">
      <ScreenHeader title="Dieta" subtitle="Passo 2" />

      <ScrollView className="p-8">
        <Text className="text-xl font-bold mb-4">Informe seus dados</Text>

        <View className="gap-4">
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <DropdownMenu>
                <Text className="mb-1">Gênero</Text>
                <DropdownMenuTrigger asChild>
                  <Button
                    ref={dropdownRef}
                    variant="dropdown"
                    onLayout={measureDropdownWidth}
                  >
                    <View className="flex flex-row items-center justify-between w-full">
                      {value ? (
                        <Text className="text-lg font-normal text-foreground">
                          {
                            genderOptions.find(option => option.value === value)
                              ?.label
                          }
                        </Text>
                      ) : (
                        <Text className="text-lg font-normal">
                          Escolha uma opção
                        </Text>
                      )}

                      <ChevronDown className="text-muted-foreground ml-2" />
                    </View>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="mt-1.5"
                  style={{ width: menuWidth }}
                >
                  <DropdownMenuGroup>
                    {genderOptions.map(option => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => onChange(option.value)}
                      >
                        <Text>{option.label}</Text>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
          {errors.gender && (
            <Text className="text-red-500 mt-1">{errors.gender.message}</Text>
          )}

          <Controller
            control={control}
            name="level"
            render={({ field: { onChange, value } }) => (
              <DropdownMenu>
                <Text className="mb-1">Seu nível de atividade física</Text>
                <DropdownMenuTrigger asChild>
                  <Button
                    ref={dropdownRef}
                    variant="dropdown"
                    onLayout={measureDropdownWidth}
                  >
                    <View className="flex flex-row items-center justify-between w-full">
                      {value ? (
                        <Text className="text-lg font-normal text-foreground">
                          {
                            levelOptions.find(option => option.value === value)
                              ?.label
                          }
                        </Text>
                      ) : (
                        <Text className="text-lg font-normal">
                          Escolha uma opção
                        </Text>
                      )}

                      <ChevronDown className="text-muted-foreground ml-2" />
                    </View>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="mt-1.5"
                  style={{ width: menuWidth }}
                >
                  <DropdownMenuGroup>
                    {levelOptions.map(option => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => onChange(option.value)}
                      >
                        <Text>{option.label}</Text>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
          {errors.level && (
            <Text className="text-red-500 mt-1">{errors.level.message}</Text>
          )}

          <Controller
            control={control}
            name="objective"
            render={({ field: { onChange, value } }) => (
              <DropdownMenu>
                <Text className="mb-1">Seu objetivo</Text>
                <DropdownMenuTrigger asChild>
                  <Button
                    ref={dropdownRef}
                    variant="dropdown"
                    onLayout={measureDropdownWidth}
                  >
                    <View className="flex flex-row items-center justify-between w-full">
                      {value ? (
                        <Text className="text-lg font-normal text-foreground">
                          {
                            objectiveOptions.find(
                              option => option.value === value
                            )?.label
                          }
                        </Text>
                      ) : (
                        <Text className="text-lg font-normal">
                          Escolha uma opção
                        </Text>
                      )}

                      <ChevronDown className="text-muted-foreground ml-2" />
                    </View>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="mt-1.5"
                  style={{ width: menuWidth }}
                >
                  <DropdownMenuGroup>
                    {objectiveOptions.map(option => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => onChange(option.value)}
                      >
                        <Text>{option.label}</Text>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
          {errors.objective && (
            <Text className="text-red-500 mt-1">
              {errors.objective.message}
            </Text>
          )}
        </View>

        <Button className="mt-4" onPress={handleSubmit(handleCreate)}>
          <Text>Avançar</Text>
        </Button>
      </ScrollView>
    </View>
  )
}
