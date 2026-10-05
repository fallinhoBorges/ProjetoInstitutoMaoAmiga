import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Doacao } from './doacoesStorage';
import { formatarData } from './formatar';

type Props = {
  doacao: Doacao;
  onPress: (doacao: Doacao) => void;
};

function DoacaoItem({ doacao, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(doacao)}>
      <Text style={styles.titulo}>
        {doacao.tipoItem} - {doacao.quantidade}
      </Text>
      <Text style={styles.linha}>Destino: {doacao.pontoDestino}</Text>
      <Text style={styles.data}>{formatarData(doacao.criadoEm)}</Text>
    </TouchableOpacity>
  );
}

export default memo(DoacaoItem);

const styles = StyleSheet.create({
  item: {
    minHeight: 44,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  linha: {
    fontSize: 14,
    color: '#424242',
    marginTop: 4,
  },
  data: {
    fontSize: 13,
    color: '#757575',
    marginTop: 4,
  },
});
