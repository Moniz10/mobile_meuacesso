import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { colors } from '../../constants/colors';
import { fonts, radius } from '../../constants/theme';

export default function Input({ label, error, secureTextEntry = false, style, ...props }) {
  const [hidden, setHidden] = useState(secureTextEntry);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.field, focused && styles.fieldFocused, error && styles.fieldError]}>
        <TextInput
          placeholderTextColor={colors.placeholder}
          autoCapitalize="none"
          accessibilityLabel={label}
          {...props}
          style={[styles.input, style]}
          secureTextEntry={hidden}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setHidden((h) => !h)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Mostrar palavra-passe' : 'Esconder palavra-passe'}
          >
            <Feather name={hidden ? 'eye' : 'eye-off'} size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.input,
  },
  fieldFocused: {
    borderColor: colors.primary,
  },
  fieldError: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.danger,
    marginTop: 6,
  },
});