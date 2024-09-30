import { House } from '@/lib/icons'
import { Drawer } from 'expo-router/drawer'

import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'

export default function DrawerLayout() {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: isDarkColorScheme
          ? NAV_THEME.dark.primary
          : NAV_THEME.light.primary,
        drawerInactiveBackgroundColor: '#fff',
        drawerHideStatusBarOnOpen: true,
        overlayColor: 'transparent',
        drawerStyle: {
          backgroundColor: isDarkColorScheme
            ? NAV_THEME.dark.background
            : NAV_THEME.light.background,
          paddingTop: 32,
          width: '50%',
        },
        drawerLabelStyle: {
          marginLeft: -16,
        },
        sceneContainerStyle: {
          backgroundColor: isDarkColorScheme
            ? NAV_THEME.dark.background
            : NAV_THEME.light.background,
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: 'Início',
          drawerIcon: () => (
            <House className="text-muted-foreground" size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name="create-diet"
        options={{
          drawerLabel: 'Criar dieta',
        }}
      />
    </Drawer>
  )
}
