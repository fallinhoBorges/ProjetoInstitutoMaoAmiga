import { ImageSourcePropType } from 'react-native';

export type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  diasHorarios: string;
  recebeDistribui: string;
  imagem?: ImageSourcePropType;
};

export const pontosIniciais: Ponto[] = [
  {
    id: '1',
    nome: 'Ponto Vila Esperança',
    endereco: 'Rua das Acácias, 120 - Vila Esperança',
    diasHorarios: 'Segunda a sexta, 8h às 12h',
    recebeDistribui: 'Recebe alimentos não perecíveis - Distribui cestas básicas',
    imagem: require('./assets/pontos/ponto-1.jpg'),
  },
  {
    id: '2',
    nome: 'Ponto Jardim das Flores',
    endereco: 'Av. Central, 890 - Jardim das Flores',
    diasHorarios: 'Terça e quinta, 14h às 18h',
    recebeDistribui: 'Recebe roupas e calçados - Distribui roupas para famílias cadastradas',
    imagem: require('./assets/pontos/ponto-2.jpg'),
  },
  {
    id: '3',
    nome: 'Ponto Bela Vista',
    endereco: 'Rua dos Ipês, 45 - Bela Vista',
    diasHorarios: 'Sábados, 9h às 13h',
    recebeDistribui: 'Recebe doações de feiras e mercados - Distribui hortifruti e pães',
    imagem: require('./assets/pontos/ponto-3.jpg'),
  },
];
