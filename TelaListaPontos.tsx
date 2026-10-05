import { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ponto } from './pontos';
import PontoItem from './PontoItem';
import { RootStackParamList } from './navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPontos'> & {
  pontos: Ponto[];
  onAdicionarPonto: (ponto: Ponto) => void;
};

export default function TelaListaPontos({ navigation, pontos, onAdicionarPonto }: Props) {
  const [busca, setBusca] = useState('');

  const pontosFiltrados = useMemo(() => {
    return pontos.filter((ponto) =>
      ponto.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [pontos, busca]);

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [erro, setErro] = useState('');
  const inputEnderecoRef = useRef<TextInput>(null);

  function validarESalvar() {
    if (nome.trim() === '') {
      setErro('O nome do ponto não pode ficar vazio.');
      return;
    }
    if (endereco.trim() === '') {
      setErro('O endereço não pode ficar vazio.');
      return;
    }
    onAdicionarPonto({
      id: Date.now().toString(),
      nome: nome.trim(),
      endereco: endereco.trim(),
      diasHorarios: 'A definir',
      recebeDistribui: 'A definir',
    });
    setNome('');
    setEndereco('');
    setErro('');
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.tituloCadastro}>Cadastrar novo ponto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do ponto"
          value={nome}
          onChangeText={setNome}
          returnKeyType="next"
          onSubmitEditing={() => inputEnderecoRef.current?.focus()}
        />
        <TextInput
          ref={inputEnderecoRef}
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
          returnKeyType="done"
          onSubmitEditing={validarESalvar}
        />
        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
        <TouchableOpacity style={styles.botao} onPress={validarESalvar}>
          <Text style={styles.botaoTexto}>Cadastrar ponto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => navigation.navigate('CadastroDoacao')}
        >
          <Text style={styles.botaoSecundarioTexto}>Registrar doação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => navigation.navigate('HistoricoDoacoes')}
        >
          <Text style={styles.botaoSecundarioTexto}>Minhas doações</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.busca}
          placeholder="Buscar pontos..."
          value={busca}
          onChangeText={setBusca}
        />

        <FlatList
          style={styles.lista}
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
  busca: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
  },
  lista: {
    flex: 1,
    marginTop: 16,
  },
  tituloCadastro: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
  },
  erro: {
    color: '#C62828',
    marginTop: 8,
  },
  botao: {
    backgroundColor: '#1B3A5C',
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: '#1B3A5C',
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  botaoSecundarioTexto: {
    color: '#1B3A5C',
    fontWeight: 'bold',
  },
});
