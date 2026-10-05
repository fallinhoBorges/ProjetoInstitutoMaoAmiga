Repositório do projeto "ONG - Instituto Mão Amiga". 
Será realizado com o fim de uso Mobile, usando as tecnologias de React Native, através do programa EXPO GO, para análise e acompanhamento em tempo real via aparelho telefone.
O intuito do projeto será auxiliar a ONG com seus serviço de análise de estoque, acompanhamento em tempo real dos pontos de entrega/coleta da área de atuação e das doações feitas, pois hoje os mesmos realizam isso com planilhas e papéis.


## Roteiro de demonstração (até 3 minutos)

1. **Registrar:** na tela inicial, toque em "Registrar doação", preencha tipo, quantidade e ponto de destino e salve. Repita com 2 ou 3 doações de tipos diferentes.
2. **Ver o histórico:** volte e toque em "Minhas doações". As doações aparecem na lista, com o resumo de totais por tipo no topo.
3. **Filtrar:** digite parte de um tipo (por exemplo "rou") no campo de busca. A lista e a mensagem de "nenhum resultado" reagem enquanto se digita; apagar o texto mostra tudo de novo.
4. **Editar:** toque numa doação, depois em "Editar doação". Altere a quantidade, salve e confira o detalhe, o histórico e o resumo atualizados.
5. **Excluir:** no detalhe, toque em "Excluir doação" e confirme. Mostre também o "Cancelar" não apagando nada.
6. **Fechar e reabrir:** feche o app de verdade e abra de novo. O histórico continua lá.

## Decisões técnicas da semana

- **Acesso ao armazenamento num arquivo só (`doacoesStorage.ts`):** nenhuma tela chama o AsyncStorage diretamente. Se a forma de guardar mudar, só esse arquivo muda.
- **Totais calculados, não salvos:** o resumo é derivado do array de doações a cada renderização. Assim nunca fica dessincronizado ao registrar, editar ou excluir.
- **Filtro derivado:** só o texto digitado é estado; a lista filtrada é calculada a partir dele e do array completo, sem uma segunda cópia da lista.
- **Formulário único:** cadastro e edição usam a mesma tela (`TelaCadastroDoacao`); a presença de `route.params.doacao` define se é edição.
