import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { excluirDoacao } from './doacoesStorage';
import { formatarData } from './formatar';
import { RootStackParamList } from './navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheDoacao'>;

export default function TelaDetalheDoacao({ route, navigation }: Props) {
  const { doacao } = route.params;

  function confirmarExclusao() {
    Alert.alert('Excluir doação', 'Tem certeza que deseja excluir esta doação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await excluirDoacao(doacao.id);
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Text style={styles.rotulo}>Tipo do item</Text>
      <Text style={styles.valor}>{doacao.tipoItem}</Text>

      <Text style={styles.rotulo}>Quantidade</Text>
      <Text style={styles.valor}>{doacao.quantidade}</Text>

      <Text style={styles.rotulo}>Ponto de destino</Text>
      <Text style={styles.valor}>{doacao.pontoDestino}</Text>

      <Text style={styles.rotulo}>Registrada em</Text>
      <Text style={styles.valor}>{formatarData(doacao.criadoEm)}</Text>

      <TouchableOpacity style={styles.botaoExcluir} onPress={confirmarExclusao}>
        <Text style={styles.botaoExcluirTexto}>Excluir doação</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  rotulo: {
    fontSize: 13,
    color: '#757575',
    marginTop: 12,
  },
  valor: {
    fontSize: 18,
    color: '#1B3A5C',
    marginTop: 2,
  },
  botaoExcluir: {
    borderWidth: 1,
    borderColor: '#C62828',
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  botaoExcluirTexto: {
    color: '#C62828',
    fontWeight: 'bold',
  },
});
