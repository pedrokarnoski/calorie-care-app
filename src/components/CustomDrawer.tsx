import { ThemeToggle } from '@/components/ThemeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Text } from '@/components/ui/text'
import { LogOut } from '@/lib/icons'
import { useAuth, useUser } from '@clerk/clerk-expo'
import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { TouchableOpacity, View } from 'react-native'
import { expo } from '../../app.json'

const GITHUB_AVATAR_URI = 'https://github.com/pedrokarnoski.png'
const version = expo.version

export function CustomDrawer(drawerProps: DrawerContentComponentProps) {
  const { signOut } = useAuth()
  const { user } = useUser()

  const firstLetter = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : ''

  return (
    <View className="flex-1">
      <DrawerContentScrollView className="bg-card" {...drawerProps}>
        <View className="flex-row gap-4 p-4 py-10 items-center">
          {user?.hasImage ? (
            <Avatar alt="Avatar">
              <AvatarImage source={{ uri: user?.imageUrl }} />
            </Avatar>
          ) : (
            <Avatar alt="Avatar">
              <AvatarFallback>
                <Text>{firstLetter}</Text>
              </AvatarFallback>
            </Avatar>
          )}

          <View>
            <Text className="font-semibold">{user?.firstName}</Text>
            {user?.username && <Text className="text-xs">{user.username}</Text>}
          </View>
        </View>

        <DrawerItemList {...drawerProps} />
      </DrawerContentScrollView>

      <View className="p-6 gap-6 pb-10">
        <View className="flex-row">
          <ThemeToggle />
        </View>

        <TouchableOpacity onPress={() => signOut()}>
          <View className="flex-row gap-4 items-center">
            <LogOut className="text-foreground" size={24} />

            <Text className="font-medium">Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text className="pl-6 pb-1 text-xs text-muted-foreground">
        v{version}
      </Text>
    </View>
  )
}
