import { BlurView } from "@react-native-community/blur"
import { useNavigation } from "@react-navigation/native"
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native"


export default function BackButton() {
  const { goBack } = useNavigation()

  return (
    <BlurView blurType="light" blurAmount={10} style={styles.header}>
      <TouchableOpacity onPress={goBack} style={styles.touchButtonBack} >
        <Image source={require("../../../assets/images/app/back.png")} style={styles.imageBack} resizeMode="cover" />
      </TouchableOpacity>
    </BlurView>
  )
}


const styles = StyleSheet.create({
  header: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  touchButtonBack: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  imageBack: {
    width: 20,
    height: 20,
  },
})