import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type Props<T> = {
  data: T[];
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  keyExtractor?: (item: T, index: number) => string;
  placeholder?: React.ReactElement | null;
  itemWidth?: number;
  itemSpacing?: number;
  contentContainerStyle?: ViewStyle;
};

function HorizontalCarousel<T>({
  data,
  renderItem,
  keyExtractor,
  placeholder = null,
  itemWidth = 160,
  itemSpacing = 16,
  contentContainerStyle,
}: Props<T>) {
  const snapInterval = itemWidth + itemSpacing;

  const wrappedRender = (info: ListRenderItemInfo<T>) => (
    <View
      style={[
        styles.itemWrapper,
        { width: itemWidth, marginRight: itemSpacing },
      ]}
    >
      {renderItem(info) ?? placeholder}
    </View>
  );

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      keyExtractor={keyExtractor}
      renderItem={wrappedRender}
      snapToInterval={snapInterval}
      decelerationRate="fast"
      snapToAlignment="start"
      initialNumToRender={4}
      maxToRenderPerBatch={6}
      windowSize={3}
      removeClippedSubviews
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  itemWrapper: {
    // width and marginRight set inline for flexibility
  },
});

export default HorizontalCarousel;
