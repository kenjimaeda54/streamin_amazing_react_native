import useSearchViewModel from "@/view_models/useSearchViewModel";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { emojiFromUtf16 } from "rn-emoji-picker"
import { styles } from "./home.styles";
import { FlatList } from "react-native-gesture-handler";
import RowSubscription from "@/components/row_subscription/RowSubscription";
import { subscriptionsMock } from "@/mocks/subscriptionsMock";
import { videosMock } from "@/mocks/videosMock";
import RowVideos from "@/components/row_videos/RowVideos";
import theme from "@/theme/theme";
import { useUserAuthenticationStore } from "@/stores/userAuthenticationStore";
import { useShallow } from "zustand/react/shallow";




export default function HomeScreen() {
  const { videosWithChannel, isLoadingChannel, isLoadingSearchVideo, } = useSearchViewModel()
  const { userStore } = useUserAuthenticationStore(useShallow(state => ({ userStore: state.user })))


  if (isLoadingChannel || isLoadingSearchVideo) {

    return <Text>Loading</Text>
  }

  return (
    <SafeAreaView edges={['top']} style={{
      flex: 1,
      paddingVertical: 10,
      gap: 10,

    }}>
      <View style={styles.rowPresentation}>
        <Image source={userStore.user.photo != null ? { uri: userStore.user.photo } : require("../../../assets/images/bottom_tab/avatar_user.png")} style={{ width: 60, height: 60, borderRadius: userStore.user.photo != null ? 30 : 0, }} />
        <View>
          <View style={styles.rowWelcome}>
            <Text style={styles.presentationWelcome}>Bem vindo</Text>
            <Text>{emojiFromUtf16('1F44B')} </Text>
          </View>
          <Text style={styles.presentationName}>{userStore.user.givenName}</Text>
        </View>
      </View>
      <Text style={styles.textSubscriptions}>Assinaturas</Text>
      <FlatList
        style={{
          height: 120
        }}
        data={subscriptionsMock}
        keyExtractor={(_, index) => `${index}`}
        snapToOffsets={[...Array(subscriptionsMock.length).map((_, i) => i * (70 - 30) + (i - 1) * 30)]}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={16}
        renderItem={RowSubscription}
      />
      <FlatList
        data={videosWithChannel}
        contentContainerStyle={{
          paddingHorizontal: 13
        }}
        keyExtractor={(_, index) => `${index}`}
        renderItem={RowVideos}
      />
    </SafeAreaView>
  )
}


