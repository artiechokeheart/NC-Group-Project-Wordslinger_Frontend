import { View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ThemedIconButton } from "./ThemedIconButton";
const sheriff = require("../assets/icons/Sheriff.png");
const cactus = require("../assets/icons/Cactus2.png");
const hayStack = require("../assets/icons/hay-large.png");
const barrel = require("../assets/icons/barrel.png");
const whiskey = require("../assets/icons/Whiskey.png");
const chariot = require("../assets/icons/chariot.png");
const house = require("../assets/icons/house.png");
const Navbar: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Get navigation using hook

  return (
    <View style={styles.navbar}>
      <ThemedIconButton
        icon={chariot}
        onPress={() => navigation.navigate("Profile")}
      />
      <ThemedIconButton
        icon={sheriff}
        onPress={() => navigation.navigate("Learn")}
      />
      <ThemedIconButton
        icon={hayStack}
        onPress={() => navigation.navigate("Practice")}
      />
      <ThemedIconButton
        icon={cactus}
        onPress={() => navigation.navigate("Game")}
      />
      <ThemedIconButton
        icon={whiskey}
        onPress={() => navigation.navigate("FriendsList")}
      />
      <ThemedIconButton
        icon={barrel}
        onPress={() => navigation.navigate("Leaderboard")}
      />
      <ThemedIconButton
        icon={house}
        onPress={() => navigation.navigate("Review")}
      />
    </View>
  );
};
export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    zIndex: 1,
    borderTopWidth: 2,
    backgroundColor: "rgba(245, 222, 179, 0.8)", // A semi-transparent Wheat color
  },
});
