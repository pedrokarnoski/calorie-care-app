import { View } from 'react-native'

import { HeaderHome } from '@/components/HeaderHome'

import { DrawerSceneWrapper } from '@/components/DrawerSceneWrapper'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'expo-router'

export default function Home() {
  return (
    <DrawerSceneWrapper>
      <View className="flex-1 bg-background">
        <HeaderHome />

        <View className="p-8 gap-4">
          <Card className="w-full">
            <Link href="/(drawer)/create-diet">
              <CardHeader>
                <CardTitle>🍲 Gerar dieta</CardTitle>
                <CardDescription>
                  Crie seus planos alimentares personalizados
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="w-full">
            <Link href="/(drawer)/home">
              <CardHeader>
                <CardTitle>🍽️ Receitas</CardTitle>
                <CardDescription>
                  Confira receitas incríveis para sua dieta
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="w-full">
            <Link href="/(drawer)/home">
              <CardHeader>
                <CardTitle>🥗 Alimentos</CardTitle>
                <CardDescription>
                  Consulte informações nutricionais de alimentos
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </View>
      </View>
    </DrawerSceneWrapper>
  )
}
