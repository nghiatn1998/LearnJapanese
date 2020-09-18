import React from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 100,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
});

class ProgressiveImage extends React.Component {
  imageAnimated = new Animated.Value(0);

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start();
  }

  render() {
    const {
      thumbnailSource,
      source,
      style,
      ...props
    } = this.props;

    return (
      <View style={styles.container}>
        <Image
          {...props}
          source={thumbnailSource}
          style={style}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
        />
      </View>
    );
  }
}

export default ProgressiveImage;
