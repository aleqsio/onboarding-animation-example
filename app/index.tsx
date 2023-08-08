import { Image } from "expo-image";
import { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolate,
  FadeInDown,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Signin from "../components/Signin";

const imageSize = { width: 1105, height: 2269 };
const frameOffset = { left: 53, top: 42, bottom: 42, right: 49 };
const frameSize = {
  width: imageSize.width - frameOffset.left - frameOffset.right,
  height: imageSize.height - frameOffset.top - frameOffset.bottom,
};

export default function Index() {
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const { width, height } = useWindowDimensions();
  const ratio = width / frameSize.width;

  const initialScroll = useSharedValue(0);
  const currentScroll = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      initialScroll.value = currentScroll.value;
    })
    .onUpdate((e) => {
      currentScroll.value = Math.max(0, initialScroll.value - e.translationY);
    })
    .onEnd(() => {
      if (
        currentScroll.value < 300 ||
        initialScroll.value > currentScroll.value
      ) {
        currentScroll.value = withTiming(0, { duration: 500 });
      } else {
        currentScroll.value = withTiming(650, {
          duration: 1000,
          easing: Easing.inOut(Easing.cubic),
        });
      }

      initialScroll.value = currentScroll.value;
    });

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Easing.inOut(Easing.cubic)(currentScroll.value / 300),
      [0, 1],
      [1, 0.7],
      Extrapolate.CLAMP
    );
    const translation = interpolate(
      currentScroll.value,
      [0, 350, 600],
      [0, -40, -300],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.EXTEND,
      }
    );
    const rotation = interpolate(currentScroll.value, [500, 600], [0, 0.1], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.EXTEND,
    });
    return {
      transform: [
        { scaleX: scale },
        { scaleY: scale },
        { translateY: translation },
        { rotateZ: String(rotation) + "rad" },
      ],
    };
  });

  const imageOffStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(currentScroll.value, [250, 280], [1, 0], {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.EXTEND,
      }),
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        currentScroll.value,
        [320, 370],
        [0, 1],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          scale:
            2 -
            Easing.bounce(
              interpolate(
                currentScroll.value,
                [330, 500],
                [0, 1],
                Extrapolate.CLAMP
              )
            ),
        },
      ],
    };
  });

  return (
    <View className="h-screen w-full bg-slate-300 absolute left-0 top-0">
      <Signin />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            {
              width: ratio * imageSize.width,
              height: ratio * imageSize.height,
              left: -ratio * frameOffset.left,
              top: -ratio * frameOffset.top,
            },
            animatedStyle,
          ]}
          className="absolute left-0 top-0"
        >
          <Image
            source={require("../assets/14_noicon.png")}
            className="absolute left-0 top-0 w-full h-full"
            contentFit="cover"
          />
          <AnimatedImage
            source={require("../assets/icon.svg")}
            className="absolute"
            style={[
              {
                width: 162 * ratio,
                height: 208 * ratio,
                left: 822 * ratio,
                top: 1511 * ratio,
              },
              iconStyle,
            ]}
            contentFit="cover"
          />
          <AnimatedImage
            source={require("../assets/14_off_black.png")}
            className="absolute left-0 top-0 w-full h-full"
            contentFit="cover"
            style={imageOffStyle}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
