import { ChevronLeft } from '@/lib/icons/ChevronLeft'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

type ScreenHeaderProps = {
  title: string
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  const router = useRouter()

  const handleBackPress = () => {
    router.back()
  }

  return (
    <View className="flex-row items-center gap-4 px-8 bg-primary pb-6 pt-16">
      <TouchableOpacity onPress={handleBackPress}>
        <ChevronLeft className="text-foreground" size={28} />
      </TouchableOpacity>
      <Text className="text-foreground font-bold text-xl">{title}</Text>
    </View>
  )
}
