import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableOpacityProps,
  ImageSourcePropType,
  View,
} from 'react-native';
import { colors, spacing } from '../theme';

interface ThemedIconButtonProps extends TouchableOpacityProps {
  icon: ImageSourcePropType;
}

export const ThemedIconButton: React.FC<ThemedIconButtonProps> = ({
  icon,
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} {...props}>
      <View style={styles.iconWrapper}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30, // Make it circular
    backgroundColor: colors.secondary, // Tan color
    borderWidth: 3,
    borderColor: colors.primary, // Saddle Brown
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
  },
  iconWrapper: {
    width: '100%',
    height: '100%',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});