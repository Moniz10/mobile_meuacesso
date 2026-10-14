import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { AppHeader, TituloEcra } from '../../components/app';
import { CartaoHistorico, FiltroChips, TituloDia } from '../../components/historico';
import { historicoVisitas } from '../../data/mock';

const FILTROS = [
  { valor: 'todas', rotulo: 'Todas' },
  { valor: 'semana', rotulo: 'Esta semana' },
  { valor: 'mes', rotulo: 'Este mês' },
];

// Escolhe os dias que entram em cada filtro.
function filtrar(dias, filtro) {
  if (filtro === 'semana') return dias.filter((d) => d.periodo === 'semana');
  if (filtro === 'mes') return dias.filter((d) => ['semana', 'mes'].includes(d.periodo));
  return dias;
}

export default function HistoricoScreen() {
  const [filtro, setFiltro] = useState('todas');
  const dias = filtrar(historicoVisitas, filtro);

  return (
    <View className="flex-1 bg-canvas">
      <AppHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <TituloEcra titulo="Histórico" subtitulo="Onde esteve e com quem falou." />

        <FiltroChips opcoes={FILTROS} valor={filtro} onChange={setFiltro} />

        {dias.map((dia) => (
          <View key={dia.id}>
            <TituloDia texto={dia.dia} />
            {dia.visitas.map((v) => (
              <CartaoHistorico key={v.id} visita={v} />
            ))}
          </View>
        ))}

        {dias.length === 0 && (
          <View className="items-center mt-12">
            <Feather name="calendar" size={28} color="#9AA39F" />
            <Text className="font-manrope-medium text-[15px] text-muted mt-3">
              Sem visitas neste período.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}