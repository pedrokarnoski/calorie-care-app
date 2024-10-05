import { Text } from '@/components/ui/text'
import { setAndroidNavigationBar } from '@/lib/android-navigation-bar'
import { MoonStar, Sun } from '@/lib/icons'
import { useColorScheme } from '@/lib/useColorScheme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity, View } from 'react-native'

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme()
  return (
    <TouchableOpacity
      onPress={() => {
        const newTheme = isDarkColorScheme ? 'light' : 'dark'
        setColorScheme(newTheme)
        setAndroidNavigationBar(newTheme)
        AsyncStorage.setItem('theme', newTheme)
      }}
      className="w-full web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      <View>
        {isDarkColorScheme ? (
          <View className="flex-row gap-4 items-center">
            <MoonStar className="text-foreground" size={24} />
            <Text className="font-medium">Escuro</Text>
          </View>
        ) : (
          <View className="flex-row gap-4 items-center">
            <Sun className="text-foreground" size={24} />
            <Text className="font-medium">Claro</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}
