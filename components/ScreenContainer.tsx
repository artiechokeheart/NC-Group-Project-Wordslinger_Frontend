import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  Image,
} from "react-native";

const backgroundUI = {
  background: require("../assets/Background4.png"),
  moutain: require("../assets/Background2.png"),

  cloud1: require("../assets/Cloud1.png"),
  cloud2: require("../assets/Cloud2.png"),
  cloud3: require("../assets/Cloud3.png"),
  cloud4: require("../assets/Cloud4.png"),
};

const westernBackground = require("../assets/Background4.png");

interface ScreenContainerProps {
  children: React.ReactNode;
}

const DESKTOP_BREAKPOINT = 768; // Pixels

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
}) => {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === "web" && width >= DESKTOP_BREAKPOINT;

  return (
    <ImageBackground
      source={westernBackground}
      style={styles.background}
      resizeMode="repeat"
    >
      <Image
        style={styles.mountain}
        source={backgroundUI.moutain}
        resizeMode="stretch"
      />

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
    resizeMode: "repeat",
    width: "100%",
    height: "70%",
    backgroundColor: "#F07C25",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  desktopContainer: {
    maxWidth: 960, // Max width for the content on desktop
    alignSelf: "center", // Center the container on the page
    width: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "repeat",
    width: "100%",
  },
  mountain: {
    position: "absolute",
    bottom: 0,
    width: "110%",
    height: "115%", // Adjust as needed
    left: "-5%",
  },
});
