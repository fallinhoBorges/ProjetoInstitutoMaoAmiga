import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Doacao, listarDoacoes } from './doacoesStorage';
import DoacaoItem from './DoacaoItem';
import { RootStackParamList } from './navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'HistoricoDoacoes'>;

export default function TelaHistoricoDoacoes({ navigation }: Props) {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);

  useFocusEffect(
    useCallback(() => {
      listarDoacoes().then(setDoacoes);
    }, [])
  );

  const abrirDoacao = useCallback(
    (doacao: Doacao) => navigation.navigate('DetalheDoacao', { doacao }),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={doacoes}
        keyExtractor={(doacao) => doacao.id}
        renderItem={({ item }) => <DoacaoItem doacao={item} onPress={abrirDoacao} />}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhuma doação registrada ainda.</Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate('CadastroDoacao')}
            >
              <Text style={styles.botaoTexto}>Registrar doação</Text>
            </TouchableOpacity>
          </View>
        }
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
  vazio: {
    alignItems: 'center',
    marginTop: 32,
  },
  vazioTexto: {
    fontSize: 15,
    color: '#757575',
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#1B3A5C',
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
