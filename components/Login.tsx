import React, { useState } from "react";
import { Image, ImageBackground } from "react-native";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useAuth } from "./contexts/username";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { ThemedButton } from "./ThemedButton";
import { colors, fonts, spacing } from "../theme";
import { ScreenContainer } from "./ScreenContainer";

interface Users {
  [key: string]: string;
}

interface VerifyResponse {
  username: string;
  verification: boolean;
}

export default function Login({ navigation, route }: React.FunctionComponent) {
  const navigateTo = useNavigation<StackNavigationProp<RootStackParamList>>(); // Get navigation using hook

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const { user, setUser } = useAuth();

  function validUsernameCheck(username: string, password: string) {
    axios
      .post<VerifyResponse>(
        "https://wordslingerserver.onrender.com/api/verify",
        { username: username, password: password }
      )
      .then(({ data: { verification, username } }) => {
        if (verification) {
          setUser(username);
          setIsInvalidUsername(false);
          route.params.setIsLoggedIn(true);
        } else {
          setIsInvalidUsername(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ScreenContainer>
      {/* Decorative Images can be part of the background or overlay */}

      <View style={styles.formContainer}>
        <Text style={styles.title}>Wordslinger</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={colors.text}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholderTextColor={colors.text}
        />

        <ThemedButton
          title="Log In"
          onPress={() => validUsernameCheck(username, password)}
          style={{ width: "100%", marginBottom: spacing.md }}
        />

        <ThemedButton
          title="Sign Up"
          variant="secondary"
          onPress={() => navigateTo.navigate("Signup")}
          style={{ width: "100%" }}
        />

        {isInvalidUsername ? (
          <Text style={styles.errorText}>
            Username or password is not correct!
          </Text>
        ) : null}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    margin: spacing.lg,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 20,
    backgroundColor: "rgba(245, 222, 179, 0.85)", // Semi-transparent Wheat
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 64,
    color: colors.primary,
    marginBottom: spacing.xl,
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    marginBottom: spacing.md,
    textAlign: "center",
    backgroundColor: colors.background,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
  },
  errorText: {
    marginTop: spacing.md,
    color: colors.accent,
    fontFamily: fonts.body,
    fontWeight: "bold",
  },
});
