import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useI18n } from '../../i18n/I18nProvider';

const { width: screenWidth } = Dimensions.get('window');

interface AdItem {
  textKey: string;
  gradient: [string, string];
  icon: keyof typeof MaterialIcons.glyphMap;
}

const AdsBanner = () => {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const adData: AdItem[] = [
    {
      textKey: 'ads.summerSale',
      gradient: ['#FF6B6B', '#FFD93D'],
      icon: 'local-offer',
    },
    {
      textKey: 'ads.freeShipping',
      gradient: ['#36D1DC', '#5B86E5'],
      icon: 'local-shipping',
    },
    {
      textKey: 'ads.newCollection',
      gradient: ['#667EEA', '#764BA2'],
      icon: 'new-releases',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % adData.length;
      scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / screenWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        decelerationRate="fast"
      >
        {adData.map((item, index) => (
            <LinearGradient
            key={index}
            colors={item.gradient}
            style={styles.slide}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <View style={styles.content}>
            <MaterialIcons name={item.icon} size={18} color="white" style={styles.icon} />
            <Text style={styles.text}>{t(item.textKey)}</Text>
            </View>
        </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  slide: {
    width: screenWidth,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  
  icon: {
    marginRight: 8,
  },
  
  text: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },  
});

export default AdsBanner;
