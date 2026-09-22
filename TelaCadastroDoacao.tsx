import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ponto } from './pontos';
import { RootStackParamList } from './navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroDoacao'> & {
  pontos: Ponto[];
};

const CHAVE_ULTIMA_DOACAO = '@instituto_mao_amiga:ultima_doacao';

type DoacaoSalva = {
  tipoItem: string;
  quantidade: string;
  pontoDestinoId: string | null;
};

export default function TelaCadastroDoacao({ pontos }: Props) {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestinoId, setPontoDestinoId] = useState<string | null>(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    async function carregarUltimaDoacao() {
      const salvo = await AsyncStorage.getItem(CHAVE_ULTIMA_DOACAO);
      if (!salvo) return;
      const doacao: DoacaoSalva = JSON.parse(salvo);
      setTipoItem(doacao.tipoItem);
      setQuantidade(doacao.quantidade);
      setPontoDestinoId(doacao.pontoDestinoId);
    }
    carregarUltimaDoacao();
  }, []);

  function handleQuantidadeChange(texto: string) {
    if (texto === '' || /^\d+$/.test(texto)) {
      setQuantidade(texto);
      setErro('');
    } else {
      setErro('Quantidade deve conter apenas números.');
    }
    setSucesso(false);
  }

  async function validar() {
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
    const doacao: DoacaoSalva = { tipoItem, quantidade, pontoDestinoId };
    await AsyncStorage.setItem(CHAVE_ULTIMA_DOACAO, JSON.stringify(doacao));
    setErro('');
    setSucesso(true);
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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
        <Text style={styles.sucesso}>Doação registrada e salva!</Text>
      )}

      <TouchableOpacity style={styles.botao} onPress={validar}>
        <Text style={styles.botaoTexto}>Registrar doação</Text>
      </TouchableOpacity>
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
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 14,
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
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
