import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, fonts, spacing } from '../theme';

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  textStyle?: StyleProp<TextStyle>;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  ...props
}) => {
  const containerStyles = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    style, // Allow custom styles to be passed
  ];

  const textStyles = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    textStyle,
  ];

  return (
    <TouchableOpacity onPress={onPress} style={containerStyles} {...props}>
      <Text style={textStyles}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.text, // A dark border for that rustic, branded look
  },
  primaryButton: {
    backgroundColor: colors.primary, // Saddle Brown
  },
  secondaryButton: {
    backgroundColor: 'transparent', // An "outline" style button
    borderColor: colors.primary,
  },
  text: {
    fontFamily: fonts.heading, // Our western heading font
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  primaryText: {
    color: colors.background, // Wheat color for text
  },
  secondaryText: {
    color: colors.primary, // Saddle Brown text
  },
});
