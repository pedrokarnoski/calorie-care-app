import { Header } from '@/components/Header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Text } from '@/components/ui/text'
import { UserPen } from '@/lib/icons'
import { useUser } from '@clerk/clerk-expo'
import { TouchableOpacity, View } from 'react-native'

export default function Profile() {
  const { user } = useUser()

  const firstLetter = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : ''

  return (
    <View className="flex-1">
      <Header
        title="Meu perfil"
        action={
          <TouchableOpacity>
            <UserPen className="text-foreground" size={24} />
          </TouchableOpacity>
        }
      />

      <View className="flex-1 bg-background">
        <View className="items-center justify-center py-8">
          {!user?.hasImage ? (
            <Avatar className="h-32 w-h-32" alt="Avatar">
              <AvatarImage source={{ uri: user?.imageUrl }} />
            </Avatar>
          ) : (
            <Avatar className="h-32 w-h-32" alt="Avatar">
              <AvatarFallback>
                <Text>{firstLetter}</Text>
              </AvatarFallback>
            </Avatar>
          )}
        </View>
      </View>
    </View>
  )
}
