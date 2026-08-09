import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

type Produto = (
  id: string,
  nome: string,
  preco: number,
  imagem: string
)

const produtos: Produto[] = [
  (id: 1, nome: 'Produto1', preco: 25.50, imagem: 'wwwwww'),
  (id: 2, nome: 'Produto2', preco: 40.00, imagem: 'wwwweee'),
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
