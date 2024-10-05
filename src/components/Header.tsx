import { ChevronLeft } from '@/lib/icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

type HeaderProps = {
  title: string
  action?: JSX.Element
}

export function Header({ title, action }: HeaderProps) {
  const router = useRouter()

  const handleBackPress = () => {
    router.back()
  }

  return (
    <View className="flex-row items-center gap-4 px-8 bg-primary pb-6 pt-16">
      <TouchableOpacity onPress={handleBackPress}>
        <ChevronLeft className="text-foreground" size={28} />
      </TouchableOpacity>
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="text-foreground font-bold text-xl">{title}</Text>
        {action && <View>{action}</View>}
      </View>
    </View>
  )
}
