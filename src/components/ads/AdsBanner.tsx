import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

interface AdItem {
  text: string;
  gradient: [string, string];
  icon: keyof typeof MaterialIcons.glyphMap;
}

const adData: AdItem[] = [
  {
    text: 'Yaz indirimleri başladı! Tüm ürünlerde %50 indirim',
    gradient: ['#FF6B6B', '#FFD93D'],
    icon: 'local-offer',
  },
  {
    text: '100 TL ve üzeri alışverişlerde ücretsiz kargo!',
    gradient: ['#36D1DC', '#5B86E5'],
    icon: 'local-shipping',
  },
  {
    text: 'Yeni koleksiyon şimdi satışta!',
    gradient: ['#667EEA', '#764BA2'],
    icon: 'new-releases',
  },
];

const AdsBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

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
            <Text style={styles.text}>{item.text}</Text>
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
