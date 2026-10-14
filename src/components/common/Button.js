import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { colors } from '../../constants/colors';
import { fonts, radius } from '../../constants/theme';

// Variantes: 'primary' (verde), 'accent' (dourado), 'outline' (contorno), 'ghost' (só texto)
const VARIANTS = {
  primary: { bg: colors.primary, fg: colors.white, border: colors.primary },
  accent: { bg: colors.accent, fg: colors.text, border: colors.accent },
  outline: { bg: colors.surface, fg: colors.primary, border: colors.primary },
  ghost: { bg: 'transparent', fg: colors.primary, border: 'transparent' },
};

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
  style,
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: v.bg, borderColor: v.border },
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color={v.fg} />
      ) : (
        <View style={styles.content}>
          {icon ? <Feather name={icon} size={20} color={v.fg} /> : null}
          <Text style={[styles.text, { color: v.fg }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    paddingHorizontal: 20,
    borderRadius: radius.button,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontFamily: fonts.bold,
    fontSize: 17,
  },
  disabled: {
    opacity: 0.6,
  },
});