import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { HeaderBoxItem } from './data';

interface HeaderGridProps {
  boxes: HeaderBoxItem[];
  onBoxPress?: (id: string) => void;
}

const HeaderGrid: React.FC<HeaderGridProps> = ({ boxes, onBoxPress }) => {
  // Ensure we have exactly 6 boxes (3x2 grid)
  const gridBoxes = boxes.slice(0, 6);
  
  // If less than 6 boxes provided, fill with empty boxes
  while (gridBoxes.length < 6) {
    gridBoxes.push({
      id: `empty-${gridBoxes.length}`,
      imageUrl: '',
    });
  }

  const handlePress = (id: string) => {
    if (onBoxPress) {
      onBoxPress(id);
    }
  };

  return (
    <Container>
      <GridContainer>
        {gridBoxes.map((box) => (
          <GridItemWrapper key={box.id}>
            <GridItem onPress={() => handlePress(box.id)}>
              {box.imageUrl ? (
                <>
                  <GridImage source={{ uri: box.imageUrl }} resizeMode="cover" />
                  {/* {box.title && <GridTitle>{box.title}</GridTitle>} */}
                </> 
              ) : (
                <EmptyBox />
              )}
            </GridItem>
          </GridItemWrapper>
        ))}
      </GridContainer>
    </Container>
  );
};

const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GridItemWrapper = styled.View`
  width: 32%;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  aspect-ratio: 1;
`;

const GridItem = styled.TouchableOpacity`
  flex: 1;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.border};
  position: relative;
`;

const GridImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const GridTitle = styled.Text`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  text-align: center;
  font-weight: bold;
`;

const EmptyBox = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.border};
`;

export default HeaderGrid;
