import { Doacao } from './doacoesStorage';

export type RootStackParamList = {
  ListaPontos: undefined;
  DetalhePonto: { pontoId: string };
  CadastroDoacao: { doacao?: Doacao } | undefined;
  HistoricoDoacoes: undefined;
  DetalheDoacao: { doacao: Doacao };
};
