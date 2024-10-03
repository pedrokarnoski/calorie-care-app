import { View } from 'react-native'

import { Text } from '@/components/ui/text'
import { NAV_THEME } from '@/lib/constants'
import { Salad } from '@/lib/icons'
import { useColorScheme } from '@/lib/useColorScheme'
import { useUser } from '@clerk/clerk-expo'
import { DrawerToggleButton } from '@react-navigation/drawer'

export function HeaderHome() {
  const { isDarkColorScheme } = useColorScheme()
  const { user } = useUser()

  const firstLetter = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : ''

  return (
    <View className="flex-row h-32 bg-primary pt-14 pb-4 px-8 items-center">
      {/* {!user?.hasImage ? (
        <Avatar alt="Avatar">
          <AvatarImage source={{ uri: user?.imageUrl }} />
        </Avatar>
      ) : (
        <Avatar alt="Avatar">
          <AvatarFallback>
            <Text>{firstLetter}</Text>
          </AvatarFallback>
        </Avatar>
      )} */}

      <View className="flex-1 flex-row gap-3 items-center">
        <Salad size={24} className="text-foreground" />
        <Text className="text-foreground font-semibold text-lg">
          CalorieCare
        </Text>
        {/* <Text className="text-foreground text-lg">Olá, </Text>
        <Text className="text-foreground font-medium">Pedro</Text> */}
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
