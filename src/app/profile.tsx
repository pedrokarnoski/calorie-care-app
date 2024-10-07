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
          {user?.hasImage ? (
            <Avatar className="h-28 w-28" alt="Avatar">
              <AvatarImage source={{ uri: user?.imageUrl }} />
            </Avatar>
          ) : (
            <Avatar className="h-28 w-28" alt="Avatar">
              <AvatarFallback>
                <Text className="text-2xl">{firstLetter}</Text>
              </AvatarFallback>
            </Avatar>
          )}

          {user?.fullName && (
            <Text className="text-foreground font-semibold text-xl mt-4">
              {user.fullName}
            </Text>
          )}

          {user?.emailAddresses && (
            <Text className="text-foreground text-sm mt-1">
              {user.emailAddresses[0].emailAddress}
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}
