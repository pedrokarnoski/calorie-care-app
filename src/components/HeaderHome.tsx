import { View } from 'react-native'

import { Text } from '@/components/ui/text'
import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'
import { DrawerToggleButton } from '@react-navigation/drawer'

export function HeaderHome() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View className="flex-row bg-primary pt-16 pb-6 px-8 items-center">
      <View className="flex-1 flex-row gap-3 items-center">
        <Text className="text-foreground font-semibold text-xl">
          CalorieCare
        </Text>
      </View>
      <DrawerToggleButton
        tintColor={
          isDarkColorScheme
            ? NAV_THEME.dark.foreground
            : NAV_THEME.light.foreground
        }
      />
    </View>
  )
}
