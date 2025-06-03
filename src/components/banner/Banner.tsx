import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { BannerItem } from './data';

interface BannerProps {
  banners: BannerItem[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const scrollRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get('window');
  const actualWidth = width - 16;

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * actualWidth,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, banners.length]);

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
    <Wrapper>
      <Carousel
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {banners.map((banner) => (
          <Card key={banner.id} width={actualWidth}>
            <ImageBackground source={{ uri: banner.imageUrl }}>
              {/* 
              <Overlay>
                <Title numberOfLines={1}>{banner.title}</Title>
                <Subtitle numberOfLines={2}>{banner.subtitle}</Subtitle>
              </Overlay>
              */}
            </ImageBackground>
          </Card>
        ))}
      </Carousel>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  margin: 8px;
  overflow: hidden;
  position: relative;
`;

const Carousel = styled(Animated.ScrollView)`
  width: 100%;
`;

const Card = styled.View<{ width: number }>`
  width: ${({ width }) => width}px;
  aspect-ratio: 2.5;
  overflow: hidden;
  margin-right: 8px;
`;

const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

const Overlay = styled.View`
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.45);
`;

const Title = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
`;

const Subtitle = styled.Text`
  color: #e0e0e0;
  font-size: 13px;
  margin-top: 4px;
`;


export default Banner;
