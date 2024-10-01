import { ThemeToggle } from '@/components/ThemeToggle'
import { LogOut } from '@/lib/icons'
import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { TouchableOpacity, View } from 'react-native'

export function CustomDrawer(drawerProps: DrawerContentComponentProps) {
  return (
    <View className="flex-1">
      <DrawerContentScrollView {...drawerProps}>
        <View className="flex-row justify-between items-center p-8">
          <ThemeToggle />

          <TouchableOpacity>
            <LogOut className="text-foreground" />
          </TouchableOpacity>
        </View>
        <DrawerItemList {...drawerProps} />
      </DrawerContentScrollView>
    </View>
  )
}
