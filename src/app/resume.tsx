import { ActivityIndicator, ScrollView, Share, View } from 'react-native'

import { ResumeHeader } from '@/components/ResumeHeader'
import { Text } from '@/components/ui/text'

import { createNutrition } from '@/api/create-nutrition'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Clock,
  Clock1,
  Clock10,
  Clock11,
  Clock12,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
} from '@/lib/icons'
import { useDataStorage } from '@/storage/data'
import { useQuery } from '@tanstack/react-query'
import { Link, router } from 'expo-router'

export default function Resume() {
  const user = useDataStorage(state => state.user)

  const { data, isFetching, error } = useQuery({
    queryKey: ['nutrition'],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error('Failed load nutrition')
        }

        return createNutrition({
          name: user.name,
          weight: user.weight,
          height: user.height,
          age: user.age,
          gender: user.gender,
          objective: user.objective,
          level: user.level,
        })
      } catch (err) {
        console.log(err)
      }
    },
  })

  function getClockIcon(horario: string) {
    const hour = Number.parseInt(horario.split(':')[0], 10)

    const hourIn12 = hour % 12 || 12

    switch (hourIn12) {
      case 1:
        return <Clock1 className="text-foreground" size={18} />
      case 2:
        return <Clock2 className="text-foreground" size={18} />
      case 3:
        return <Clock3 className="text-foreground" size={18} />
      case 4:
        return <Clock4 className="text-foreground" size={18} />
      case 5:
        return <Clock5 className="text-foreground" size={18} />
      case 6:
        return <Clock6 className="text-foreground" size={18} />
      case 7:
        return <Clock7 className="text-foreground" size={18} />
      case 8:
        return <Clock8 className="text-foreground" size={18} />
      case 9:
        return <Clock9 className="text-foreground" size={18} />
      case 10:
        return <Clock10 className="text-foreground" size={18} />
      case 11:
        return <Clock11 className="text-foreground" size={18} />
      case 12:
        return <Clock12 className="text-foreground" size={18} />
      default:
        return <Clock className="text-foreground" size={18} />
    }
  }

  async function handleShare() {
    if (data && Object.keys(data).length === 0) return

    const refeicaoEmojis = {
      'Café da manhã': '🍳',
      'Lanche da manhã': '🥐',
      Almoço: '🍛',
      'Lanche da tarde': '🍪',
      Jantar: '🍽',
    }

    const refeicoesFormatadas = data.refeicoes
      .map(refeicao => {
        const emoji = refeicaoEmojis[refeicao.nome] || '🍽'
        return `${emoji} *${refeicao.nome}* às *${refeicao.horario}*\n\n- ${refeicao.alimentos.join('\n- ')}`
      })
      .join('\n\n')

    const suplementosFormatados = data.suplementos
      .map(suplemento => `${suplemento.nome} (${suplemento.quantidade})`)
      .join('\n- ')

    const message = `
  📋 *Minha dieta personalizada - CalorieCare*
  
  👤 *Nome:* ${data.nome}  
  📏 *Altura:* ${data.altura / 100}m  
  🎂 *Idade:* ${data.idade} anos  
  ⚖️ *Peso:* ${data.peso}kg  
  🎯 *Objetivo:* ${data.objetivo}  
  🚹 *Sexo:* ${data.sexo}
  
  ${refeicoesFormatadas}
  
  💊 *Suplementos:*
  \n- ${suplementosFormatados}
    `

    try {
      await Share.share({
        message: message,
      })
    } catch (err) {
      console.log('Erro ao compartilhar:', err)
    }
  }

  if (isFetching) {
    return (
      <View className="flex-1 items-center justify-center gap-8">
        <Text className="font-semibold text-lg">
          Gerando sua dieta! Por favor, aguarde
        </Text>
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center gap-8">
        <Text className="font-semibold text-lg">Falha ao gerar dieta!</Text>
        <Link href="/">
          <Text className="text-primary">Tente novamente</Text>
        </Link>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <ResumeHeader title="Dieta" onShare={handleShare} />

      <ScrollView className="p-8">
        <Text className="text-xl font-bold mb-4">Recomendação de dieta</Text>
        {data && Object.keys(data).length > 0 ? (
          <>
            <Text className="font-medium text-lg">Nome: {data.nome}</Text>
            <Text>Objetivo: {data.objetivo}</Text>

            <View className="mt-4 mb-10">
              <Text className="mb-4 text-center">Refeições:</Text>

              {data.refeicoes.map(refeicao => (
                <View key={refeicao.nome}>
                  <View className="flex-row justify-between mb-1">
                    <Text className="font-medium">{refeicao.nome}</Text>

                    <View className="flex-row items-center gap-2">
                      {getClockIcon(refeicao.horario)}
                      <Text className="font-medium">{refeicao.horario}</Text>
                    </View>
                  </View>

                  {refeicao.alimentos.map(alimento => (
                    <Text key={alimento}>{alimento}</Text>
                  ))}

                  <Separator className="my-4" />
                </View>
              ))}

              <Text className="mb-4 text-center">Dica de suplementos:</Text>
              {data.suplementos.map(item => (
                <Text key={item.nome}>
                  {item.nome} ({item.quantidade})
                </Text>
              ))}

              <Separator className="my-4" />

              <Button
                variant="secondary"
                onPress={() => router.replace('/create-diet')}
              >
                <Text>Gerar nova dieta</Text>
              </Button>

              <Text className="text-center font-light text-sm mt-4">
                Altere sua dieta conforme sua necessidade
              </Text>
            </View>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  )
}
