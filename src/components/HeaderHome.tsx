import { View } from 'react-native'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Text } from '@/components/ui/text'
import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'
import { DrawerToggleButton } from '@react-navigation/drawer'

const GITHUB_AVATAR_URI = 'https://github.com/pedrokarnoski.png'

export function HeaderHome() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <View className="flex-row h-32 bg-primary pt-14 pb-4 px-8 items-center">
      <Avatar alt="Avatar">
        <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
        <AvatarFallback>
          <Text>PK</Text>
        </AvatarFallback>
      </Avatar>
      <View className="flex-1 flex-col ml-4">
        <Text className="text-foreground text-lg">Olá, </Text>
        <Text className="text-foreground font-medium">Pedro</Text>
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
