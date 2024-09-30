import { useDrawerProgress } from '@react-navigation/drawer'
import type { ReactNode } from 'react'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

export function DrawerSceneWrapper({ children }: { children: ReactNode }) {
  const progress = useDrawerProgress()

  const animatedStyled = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [1, 0.8],
          Extrapolation.CLAMP
        ),
      },
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, 200],
          Extrapolation.CLAMP
        ),
      },
      {
        rotateY: `${interpolate(progress.value, [0, 1], [0, -25], Extrapolation.CLAMP)}deg`,
      },
    ],
    borderRadius: 18,
    overflow: 'hidden',
  }))

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyled]}>
      {children}
    </Animated.View>
  )
}
