// components/AnimatedWaveBackground.js
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);



export default function Background({ children }) {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(withTiming(1, { duration: 5000 }), -1, true);
  }, []);

  const createWaveProps = (i) => {
    const baseY = (i + 1) * height * 0.15;
    return useAnimatedProps(() => {
      const yOffset = interpolate(offset.value, [0, 1], [-10, 10]);
      const y1 = baseY + yOffset;
      const y2 = baseY - yOffset;
      return {
        d: `M 0 ${y1} C ${width * 0.25} ${y2}, ${width * 0.75} ${y1}, ${width} ${y2}`,
      };
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(225, 68, 18, 0.9)', 'rgba(249, 77, 22, 0.9)']}
        style={StyleSheet.absoluteFill}
      />
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        {[...Array(5)].map((_, i) => (
          <AnimatedPath
            key={i}
            animatedProps={createWaveProps(i)}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1.5"
            fill="none"
          />
        ))}
      </Svg>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
});