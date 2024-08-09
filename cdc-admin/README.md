# BALLIT CHAMPIONSHIP

Ballit é um sistema para gerenciar um campeonato fictício. O sistema permite o usuário cadastrar o time, organiza automaticamente as fases do campeonato, administra as partidas e determina o campeão.

1. Cadastro de times
- O sistema permite o cadastro dos times, deve-se incluir o Nome do Time, o Grito de Guerra e o Ano de fundação
- O campeonato deve ter entre 8 e 16 times.
- O número de times cadastrados deve ser par.
- Não deve ter times com nomes ou grito de guerras iguais.

2. Início do Campeonato
- Após o cadastro, o campeonato pode ser iniciado. O sistema sorteia as duplas de times.
- As duplas disputarão até sobrar somente um time, que será o vencedor.

3. Gestão de fases
- O sistema controla as fases, sorteia as duplas, permite escolher entre as partidas aidna não ocorridas e avança automaticamente quando a fase é concluída.
  
 4. Administração de Partidas
 - Cada partida é administrada em detalhes, com exibição dos times, registro de pontos e encerramento
 - Cada time começa com 50 pontos
 - "Blot" Vale 5 pontos
 - "Plif" Vale 1 ponto
 - Em caso de empate o "Grusht", onde as torcidas competem para ver quem grita mais alto, vale 3 pontos adicionais
  
 5. Penalidades
 - A qualquer momento do campeonato, se o time ou a torcida cometer uma irregularidade, perde 10 pontos

 6. Resultados Finais
 - Ao término do campeonato, o sistema exibe uma tabela classificatória com o tato de pontos
 - O grito de guerra é mostrado acima da tabela
 
    
## Como Executar o Projeto

### Requisitos
- Node.js
- NPM ou Yarn