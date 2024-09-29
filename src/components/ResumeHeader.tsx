import { ChevronLeft } from '@/lib/icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

type ResumeHeaderProps = {
  title: string
  onShare: () => void
}

export function ResumeHeader({ title, onShare }: ResumeHeaderProps) {
  const router = useRouter()

  const handleBackPress = () => {
    router.replace('/')
  }

  return (
    <View className="flex-row items-center gap-4 px-8 bg-primary pb-6 pt-16">
      <TouchableOpacity onPress={handleBackPress}>
        <ChevronLeft className="text-foreground" size={28} />
      </TouchableOpacity>
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="text-foreground font-bold text-xl">{title}</Text>
        <TouchableOpacity onPress={onShare}>
          <Text className="text-foreground font-medium">Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
