import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler, 
  useAnimatedStyle,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { BannerItem } from './data';

interface BannerProps {
  banners: BannerItem[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const { width } = Dimensions.get('window');
  const actualWidth = width - 16; 

  // Auto scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      scrollX.value = withTiming(nextIndex * actualWidth);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, banners.length, actualWidth, scrollX]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const index = Math.round(event.contentOffset.x / actualWidth);
      setCurrentIndex(index);
    },
  });

  return (
    <BannerContainer>
      <AnimatedScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {banners.map((banner, index) => (
          <BannerSlide key={banner.id} width={actualWidth}>
            <BannerImage
              source={{ uri: banner.imageUrl }}
              resizeMode="cover"
            />
            <BannerOverlay>
              <BannerTitle>{banner.title}</BannerTitle>
              <BannerSubtitle>{banner.subtitle}</BannerSubtitle>
            </BannerOverlay>
          </BannerSlide>
        ))}
      </AnimatedScrollView>
      
      <PaginationContainer>
        {banners.map((_, index) => (
          <PaginationDot key={index} active={index === currentIndex} />
        ))}
      </PaginationContainer>
    </BannerContainer>
  );
};

const BannerContainer = styled.View`
  margin: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const AnimatedScrollView = styled(Animated.ScrollView)`
  width: 100%;
`;

interface BannerSlideProps {
  width: number;
}

const BannerSlide = styled.View<BannerSlideProps>`
  width: ${({ width }) => width}px;
  aspect-ratio: 2.5/1;
`;

const BannerImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

const BannerOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.md}px;
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

const BannerTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: white;
`;

const BannerSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: white;
`;

const PaginationContainer = styled.View`
  position: absolute;
  bottom: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface PaginationDotProps {
  active: boolean;
}

const PaginationDot = styled.View<PaginationDotProps>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 4px;
  background-color: ${({ active, theme }) => 
    active ? theme.colors.primary : 'rgba(255, 255, 255, 0.5)'};
`;

export default Banner; 