import { useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ponto } from './pontos';
import { RootStackParamList } from './navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroDoacao'> & {
  pontos: Ponto[];
};

export default function TelaCadastroDoacao({ pontos }: Props) {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestinoId, setPontoDestinoId] = useState<string | null>(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  function handleQuantidadeChange(texto: string) {
    if (texto === '' || /^\d+$/.test(texto)) {
      setQuantidade(texto);
      setErro('');
    } else {
      setErro('Quantidade deve conter apenas números.');
    }
    setSucesso(false);
  }

  function validar() {
    setSucesso(false);
    if (tipoItem.trim() === '') {
      setErro('Informe o tipo do item.');
      return;
    }
    if (quantidade.trim() === '' || !/^\d+$/.test(quantidade.trim())) {
      setErro('Quantidade deve ser um número válido.');
      return;
    }
    if (!pontoDestinoId) {
      setErro('Selecione um ponto de destino.');
      return;
    }
    setErro('');
    setSucesso(true);
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Registrar doação</Text>

      <Text style={styles.rotulo}>Tipo do item</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Alimentos, roupas, higiene..."
        value={tipoItem}
        onChangeText={(texto) => {
          setTipoItem(texto);
          setSucesso(false);
        }}
        returnKeyType="next"
      />

      <Text style={styles.rotulo}>Quantidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 10"
        value={quantidade}
        onChangeText={handleQuantidadeChange}
        keyboardType="numeric"
        returnKeyType="done"
      />

      <Text style={styles.rotulo}>Ponto de destino</Text>
      <View style={styles.listaPontos}>
        {pontos.map((ponto) => {
          const selecionado = ponto.id === pontoDestinoId;
          return (
            <TouchableOpacity
              key={ponto.id}
              style={[styles.chipPonto, selecionado && styles.chipPontoSelecionado]}
              onPress={() => {
                setPontoDestinoId(ponto.id);
                setSucesso(false);
              }}
            >
              <Text
                style={[
                  styles.chipPontoTexto,
                  selecionado && styles.chipPontoTextoSelecionado,
                ]}
              >
                {ponto.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
      {sucesso && (
        <Text style={styles.sucesso}>Formulário válido! (registro será salvo na Aula 15)</Text>
      )}

      <TouchableOpacity style={styles.botao} onPress={validar}>
        <Text style={styles.botaoTexto}>Registrar doação</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B3A5C',
    marginBottom: 16,
  },
  rotulo: {
    fontSize: 13,
    color: '#757575',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  listaPontos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipPonto: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipPontoSelecionado: {
    backgroundColor: '#1B3A5C',
    borderColor: '#1B3A5C',
  },
  chipPontoTexto: {
    color: '#1B3A5C',
  },
  chipPontoTextoSelecionado: {
    color: '#FFFFFF',
  },
  erro: {
    color: '#C62828',
    marginTop: 12,
  },
  sucesso: {
    color: '#2E7D32',
    marginTop: 12,
  },
  botao: {
    backgroundColor: '#1B3A5C',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
