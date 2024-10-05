import { Text } from '@/components/ui/text'
import { Link } from 'expo-router'
import { View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <View className="flex-1 justify-center bg-background items-center gap-5 py-10">
      <Text className="text-4xl text-foreground font-bold text-center">
        404
      </Text>
      <Text className="text-lg text-foreground text-center">
        Página não encontrada.{' '}
        <Link href="/(drawer)/home" className="text-primary">
          Voltar para a página inicial
        </Link>
      </Text>
    </View>
  )
}
