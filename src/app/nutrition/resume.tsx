import { ScreenHeader } from '@/components/ScreenHeader'
import { Text } from '@/components/ui/text'
import { ScrollView, View } from 'react-native'

export default function Resume() {
  return (
    <View className="flex-1">
      <ScreenHeader title="Dieta" subtitle="Passo 2" />

      <ScrollView className="p-8">
        <Text className="text-xl font-bold mb-4">Minha dieta</Text>
      </ScrollView>
    </View>
  )
}
