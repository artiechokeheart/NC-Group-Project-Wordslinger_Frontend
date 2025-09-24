import React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
} from 'react-native';

// Let's assume you have a nice western background image
const westernBackground = require('../../assets/images/wood-background.png');

interface ScreenContainerProps {
  children: React.ReactNode;
}

const DESKTOP_BREAKPOINT = 768; // Pixels

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= DESKTOP_BREAKPOINT;

  return (
    <ImageBackground
      source={westernBackground}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, isDesktop && styles.desktopContainer]}>
          {children}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  desktopContainer: {
    maxWidth: 960, // Max width for the content on desktop
    alignSelf: 'center', // Center the container on the page
    width: '100%',
  },
});