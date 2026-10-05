import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import TelaListaPontos from './TelaListaPontos';
import TelaDetalhePonto from './TelaDetalhePonto';
import TelaCadastroDoacao from './TelaCadastroDoacao';
import TelaHistoricoDoacoes from './TelaHistoricoDoacoes';
import TelaDetalheDoacao from './TelaDetalheDoacao';
import { RootStackParamList } from './navigation';
import { Ponto, pontosIniciais } from './pontos';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [pontos, setPontos] = useState<Ponto[]>(pontosIniciais);

  function adicionarPonto(novoPonto: Ponto) {
    setPontos((atual) => [...atual, novoPonto]);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaPontos">
        <Stack.Screen name="ListaPontos" options={{ title: 'Pontos de Coleta' }}>
          {(props) => (
            <TelaListaPontos {...props} pontos={pontos} onAdicionarPonto={adicionarPonto} />
          )}
        </Stack.Screen>
        <Stack.Screen name="DetalhePonto" options={{ title: 'Detalhe do Ponto' }}>
          {(props) => <TelaDetalhePonto {...props} pontos={pontos} />}
        </Stack.Screen>
        <Stack.Screen
          name="CadastroDoacao"
          options={({ route }) => ({
            title: route.params?.doacao ? 'Editar Doação' : 'Registrar Doação',
          })}
        >
          {(props) => <TelaCadastroDoacao {...props} pontos={pontos} />}
        </Stack.Screen>
        <Stack.Screen
          name="HistoricoDoacoes"
          component={TelaHistoricoDoacoes}
          options={{ title: 'Minhas doações' }}
        />
        <Stack.Screen
          name="DetalheDoacao"
          component={TelaDetalheDoacao}
          options={{ title: 'Detalhe da Doação' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
