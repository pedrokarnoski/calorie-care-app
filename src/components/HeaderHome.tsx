import { View } from 'react-native'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Text } from '@/components/ui/text'
import { DrawerToggleButton } from '@react-navigation/drawer'

const GITHUB_AVATAR_URI = 'https://github.com/pedrokarnoski.png'

export function HeaderHome() {
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

      {/* <ThemeToggle /> */}

      <DrawerToggleButton />
    </View>
  )
}
