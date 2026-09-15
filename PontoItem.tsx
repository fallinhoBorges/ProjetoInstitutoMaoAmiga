import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ponto } from './pontos';

type Props = {
  ponto: Ponto;
  onPress: () => void;
};

export default function PontoItem({ ponto, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      {ponto.imagem && <Image source={ponto.imagem} style={styles.imagem} />}
      <View style={styles.info}>
        <Text style={styles.nome}>{ponto.nome}</Text>
        <Text style={styles.endereco}>{ponto.endereco}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  imagem: {
    width: 56,
    aspectRatio: 1,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  endereco: {
    fontSize: 13,
    color: '#757575',
    marginTop: 4,
  },
});
