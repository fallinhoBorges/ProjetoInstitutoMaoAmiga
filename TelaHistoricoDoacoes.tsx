import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Doacao, listarDoacoes } from './doacoesStorage';
import DoacaoItem from './DoacaoItem';
import { RootStackParamList } from './navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'HistoricoDoacoes'>;

export default function TelaHistoricoDoacoes({ navigation }: Props) {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [busca, setBusca] = useState('');

  const doacoesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return doacoes.filter((doacao) => doacao.tipoItem.toLowerCase().includes(termo));
  }, [doacoes, busca]);

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
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={styles.busca}
          placeholder="Filtrar por tipo de item..."
          value={busca}
          onChangeText={setBusca}
        />
        <FlatList
          style={styles.lista}
          data={doacoesFiltradas}
          keyExtractor={(doacao) => doacao.id}
          renderItem={({ item }) => <DoacaoItem doacao={item} onPress={abrirDoacao} />}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            doacoes.length === 0 ? (
              <View style={styles.vazio}>
                <Text style={styles.vazioTexto}>Nenhuma doação registrada ainda.</Text>
                <TouchableOpacity
                  style={styles.botao}
                  onPress={() => navigation.navigate('CadastroDoacao')}
                >
                  <Text style={styles.botaoTexto}>Registrar doação</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.vazioTexto}>
                Nenhuma doação encontrada para "{busca.trim()}".
              </Text>
            )
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  busca: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  lista: {
    flex: 1,
    marginTop: 16,
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
