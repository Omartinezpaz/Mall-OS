import React, { useState, useEffect } from 'react';
import { View, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';

const FRAMES = [
  require('../../../assets/concierge/frames/f_0.png'),
  require('../../../assets/concierge/frames/f_1.png'),
  require('../../../assets/concierge/frames/f_2.png'),
  require('../../../assets/concierge/frames/f_3.png'),
  require('../../../assets/concierge/frames/f_4.png'),
  require('../../../assets/concierge/frames/f_5.png'),
  require('../../../assets/concierge/frames/f_6.png'),
  require('../../../assets/concierge/frames/f_7.png'),
  require('../../../assets/concierge/frames/f_8.png'),
  require('../../../assets/concierge/frames/f_9.png'),
  require('../../../assets/concierge/frames/f_10.png'),
  require('../../../assets/concierge/frames/f_11.png'),
  require('../../../assets/concierge/frames/f_12.png'),
  require('../../../assets/concierge/frames/f_13.png'),
  require('../../../assets/concierge/frames/f_14.png'),
  require('../../../assets/concierge/frames/f_15.png'),
  require('../../../assets/concierge/frames/f_16.png'),
  require('../../../assets/concierge/frames/f_17.png'),
  require('../../../assets/concierge/frames/f_18.png'),
  require('../../../assets/concierge/frames/f_19.png'),
  require('../../../assets/concierge/frames/f_20.png'),
  require('../../../assets/concierge/frames/f_21.png'),
  require('../../../assets/concierge/frames/f_22.png'),
  require('../../../assets/concierge/frames/f_23.png'),
  require('../../../assets/concierge/frames/f_24.png'),
  require('../../../assets/concierge/frames/f_25.png'),
  require('../../../assets/concierge/frames/f_26.png'),
  require('../../../assets/concierge/frames/f_27.png'),
  require('../../../assets/concierge/frames/f_28.png'),
  require('../../../assets/concierge/frames/f_29.png'),
];

interface AnimatedConciergeAvatarProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  isPlaying?: boolean;
  intervalMs?: number;
}

export const AnimatedConciergeAvatar: React.FC<AnimatedConciergeAvatarProps> = ({
  size = 64,
  style,
  imageStyle,
  isPlaying = true,
  intervalMs = 150,
}) => {
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % FRAMES.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [isPlaying, intervalMs]);

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Image
        source={FRAMES[frameIdx] || FRAMES[0]}
        style={[{ width: '100%', height: '100%' }, imageStyle]}
        resizeMode="cover"
      />
    </View>
  );
};
