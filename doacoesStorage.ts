import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_DOACOES = '@instituto_mao_amiga:doacoes';

export type Doacao = {
  id: string;
  tipoItem: string;
  quantidade: number;
  pontoDestino: string;
  criadoEm: string;
};

export type NovaDoacao = Omit<Doacao, 'id' | 'criadoEm'>;

export async function listarDoacoes(): Promise<Doacao[]> {
  const salvo = await AsyncStorage.getItem(CHAVE_DOACOES);
  if (!salvo) return [];
  try {
    return JSON.parse(salvo) as Doacao[];
  } catch {
    return [];
  }
}

async function gravarDoacoes(doacoes: Doacao[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(doacoes));
}

function gerarId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function salvarDoacao(nova: NovaDoacao): Promise<Doacao> {
  const doacao: Doacao = {
    ...nova,
    id: gerarId(),
    criadoEm: new Date().toISOString(),
  };
  const doacoes = await listarDoacoes();
  await gravarDoacoes([...doacoes, doacao]);
  return doacao;
}

export async function excluirDoacao(id: string): Promise<void> {
  const doacoes = await listarDoacoes();
  await gravarDoacoes(doacoes.filter((doacao) => doacao.id !== id));
}

export async function atualizarDoacao(atualizada: Doacao): Promise<void> {
  const doacoes = await listarDoacoes();
  await gravarDoacoes(
    doacoes.map((doacao) => (doacao.id === atualizada.id ? atualizada : doacao))
  );
}
