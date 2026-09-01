import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ponto } from './pontos';
import { RootStackParamList } from './navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalhePonto'> & {
  pontos: Ponto[];
};

export default function TelaDetalhePonto({ route, pontos }: Props) {
  const { pontoId } = route.params;
  const ponto = pontos.find((item) => item.id === pontoId);

  if (!ponto) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Ponto não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.endereco}>{ponto.endereco}</Text>
      <Text style={styles.info}>{ponto.diasHorarios}</Text>
      <Text style={styles.info}>{ponto.recebeDistribui}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B3A5C',
    marginBottom: 12,
  },
  endereco: {
    fontSize: 16,
    marginBottom: 8,
  },
  info: {
    fontSize: 15,
    color: '#2E7D32',
    marginTop: 8,
  },
});
