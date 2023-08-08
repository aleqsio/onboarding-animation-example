import { Image, ImageSource } from "expo-image";
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  Easing,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

export function Background({ source }: { source?: ImageSource }) {
  const offset = useSharedValue({ x: 0, y: 0 });
  const imageStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(offset.value.x, {
            easing: Easing.bezier(0.5, 0.05, 0.25, 1),
            duration: 500,
          }),
        },
        {
          translateY: withTiming(offset.value.x, {
            easing: Easing.bezier(0.3, 0.01, 0.01, 0.98),
            duration: 500,
          }),
        },
        {
          translateY: withRepeat(
            withSequence(
              withTiming(Math.random() * 70 - 35, { duration: 5000 }),
              withTiming(Math.random() * 70 - 35, { duration: 5000 })
            ),
            1000,
            true
          ),
        },
        {
          translateX: withRepeat(
            withSequence(
              withTiming(Math.random() * 140 - 70, {
                duration: 4000,
                easing: Easing.cubic,
              }),
              withTiming(Math.random() * 140 - 70, {
                duration: 4000,
                easing: Easing.cubic,
              })
            ),
            1000,
            true
          ),
        },
        {
          rotateY:
            Math.round(
              withRepeat(
                withSequence(
                  withTiming((Math.random() - 0.5) * 100, {
                    duration: 4500,
                    easing: Easing.cubic,
                  }),
                  withTiming((Math.random() - 0.5) * 100, {
                    duration: 4500,
                    easing: Easing.cubic,
                  })
                ),
                30,
                true
              )
            ) + "deg",
        },
        { scale: 1.3 },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: height,
          height,
          position: "absolute",
          left: (width - height) / 2,
          right: 0,
        },
        imageStyles,
      ]}
    >
      <Image
        style={{ flex: 1 }}
        source={source}
        onLoad={() => {
          offset.value = {
            x: Math.random() * 200 - 100,
            y: Math.random() * 100 - 50,
          };
        }}
        transition={{ duration: 500, effect: "cross-dissolve" }}
      />
    </Animated.View>
  );
}
