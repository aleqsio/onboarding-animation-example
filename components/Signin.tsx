import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

export default function Signin() {
  const triangle = require("../assets/triangle.svg");
  return (
    <View className="flex-1 mx-14 items-center justify-end">
      <View className="flex flex-row justify-center items-center gap-1">
        <Image
          source={require("../assets/triangle.svg")}
          style={{ width: 26, height: 20 }}
          contentFit="contain"
        ></Image>
        <Text className="text-2xl font-bold">Jot down your life.</Text>
      </View>

      <Pressable className="bg-black mt-10 w-full rounded p-2 justify-center items-center">
        <Text className="text-lg text-white font-bold">sign in</Text>
      </Pressable>
      <Pressable className="bg-white mt-2 mb-32 w-full rounded p-2 justify-center items-center">
        <Text className="text-lg text-black font-bold">create an account</Text>
      </Pressable>
    </View>
  );
}
