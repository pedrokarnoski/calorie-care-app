import { House, Salad } from '@/lib/icons'
import { Drawer } from 'expo-router/drawer'

import { CustomDrawer } from '@/components/CustomDrawer'
import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'

export default function DrawerLayout() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <Drawer
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: isDarkColorScheme
          ? NAV_THEME.dark.primary
          : NAV_THEME.light.primary,
        drawerInactiveBackgroundColor: isDarkColorScheme
          ? NAV_THEME.dark.card
          : NAV_THEME.light.card,
        drawerActiveTintColor: isDarkColorScheme
          ? NAV_THEME.dark.foreground
          : NAV_THEME.light.foreground,
        drawerInactiveTintColor: isDarkColorScheme
          ? NAV_THEME.dark.foreground
          : NAV_THEME.light.foreground,
        overlayColor: 'transparent',
        drawerStyle: {
          backgroundColor: isDarkColorScheme
            ? NAV_THEME.dark.card
            : NAV_THEME.light.card,
          // paddingTop: 32,
          width: '50%',
        },
        drawerLabelStyle: {
          marginLeft: -16,
        },
        sceneContainerStyle: {
          backgroundColor: isDarkColorScheme
            ? NAV_THEME.dark.card
            : NAV_THEME.light.card,
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: 'Início',
          drawerIcon: () => <House className="text-foreground" size={24} />,
        }}
      />
      <Drawer.Screen
        name="create-diet"
        options={{
          drawerLabel: 'Criar dieta',
          drawerIcon: () => <Salad className="text-foreground" size={24} />,
        }}
      />
    </Drawer>
  )
}
