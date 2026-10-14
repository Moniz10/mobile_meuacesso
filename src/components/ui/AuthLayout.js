import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

// Estrutura comum aos ecrãs de autenticação:
// fundo, marca "MeuAcesso", botão voltar (opcional) e o cartão com borda de 1px.
export default function AuthLayout({ children, onBack, nota }) {
  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="px-5"
        >
          {/* Topo */}
          <View className="flex-row items-center justify-between mt-4 mb-6">
            {onBack ? (
              <Pressable
                onPress={onBack}
                hitSlop={8}
                className="w-11 h-11 items-center justify-center rounded-full border border-line bg-white active:bg-field"
              >
                <Feather name="chevron-left" size={22} color="#14231C" />
              </Pressable>
            ) : (
              <View className="w-11" />
            )}
            <Text className="font-manrope-extrabold text-lg text-primary tracking-wide">
              MeuAcesso
            </Text>
            <View className="w-11" />
          </View>

          {/* Cartão (borda de 1px) */}
          <View className="bg-white border border-line rounded-3xl px-6 pt-8 pb-6">
            {children}
          </View>

          {nota ? (
            <Text className="font-manrope text-xs text-muted text-center mt-6 mb-4">{nota}</Text>
          ) : (
            <View className="h-6" />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}