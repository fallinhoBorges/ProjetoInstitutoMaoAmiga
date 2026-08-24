import { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { pontosMock } from './pontos';
import PontoItem from './PontoItem';
import { RootStackParamList } from './navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPontos'>;

export default function TelaListaPontos({ navigation }: Props) {
  const [busca, setBusca] = useState('');

  const pontosFiltrados = useMemo(() => {
    return pontosMock.filter((ponto) =>
      ponto.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [busca]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.busca}
        placeholder="Buscar pontos..."
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={pontosFiltrados}
        keyExtractor={(ponto) => ponto.id}
        renderItem={({ item }) => (
          <PontoItem
            ponto={item}
            onPress={() =>
              navigation.navigate('DetalhePonto', { pontoId: item.id })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  busca: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
});
