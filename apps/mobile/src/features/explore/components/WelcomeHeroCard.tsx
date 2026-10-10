import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface WelcomeHeroCardProps {
  visitsCount?: number;
  visitsTarget?: number;
  onPressCTA?: () => void;
}

export const WelcomeHeroCard: React.FC<WelcomeHeroCardProps> = ({
  onPressCTA,
}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.9}
      onPress={onPressCTA}
    >
      <Image
        source={require('../../../../assets/explore/banner_explorar.jpg')}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    aspectRatio: 3168 / 1344,
    marginBottom: 14,
    overflow: 'hidden',
    backgroundColor: '#0A0E1A',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});
