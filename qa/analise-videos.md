# Análise dos sete vídeos

Análise visual de frames extraídos dos arquivos locais. Amostragem de 1 frame/s nos vídeos 2–7, 2 frames/s na abertura e 4 frames/s no trecho de mudança de fundo do vídeo 6. Não é uma medição exata de easing nem uma inspeção do código original.

| Arquivo | Duração | Evidência visual |
| --- | --- | --- |
| video-demo.mp4 | 8,42 s | Cartela cinematográfica; contador desacelera perto de 100%; desaparecimento da cartela; letras entram em etapas; nome em contorno e retrato aparecem depois; acento rosa completa a composição. |
| video-demo2.mp4 | 10,54 s | SELECT WORK gigante; três cards verticais; estado inativo escuro; hover revela cor e sequências distintas de mockups; círculo com seta acompanha o ponteiro; menu vertical no canto superior direito. |
| video-demo3.mp4 | 4,54 s | Hero preto com retrato escuro atrás do texto; círculo claro inverte visualmente o conteúdo sob o ponteiro. Aproximação e recorte da gravação não comprovam zoom do site acionado por scroll. |
| video-demo4.mp4 | 11,29 s | ABOUT ME gigante; conteúdo em três colunas, em blocos; biografia à esquerda, retrato e formação ao centro, experiência e reconhecimentos à direita; mensagens sobre o retrato aparecem progressivamente; encerramento com agradecimento grande e discreto. |
| video-demo5.mp4 | 14,00 s | Texto editorial com palavras em branco e cinza; bento compacto e assimétrico; tiles reagem individualmente com mudanças internas de interface, cor e composição. O efeito é mais elaborado que aumentar a imagem. |
| video-demo6.mp4 | 7,46 s | Interior do case Starbucks; narrativa vertical com texto, vídeo e composições grandes; fundo passa gradualmente de preto para verde durante a rolagem; controles Go Home, Full/TLDR e Next Project; índice flutuante à direita. O vídeo não demonstra a ação dos controles Full/TLDR. |
| video-demo7.mp4 | 13,63 s | PLAYGROUND gigante e três cards; abertura de apresentação ampla; galeria à esquerda e painel informativo à direita; setas e indicadores de slides; deslocamento horizontal entre imagens com texto lateral estável; fechamento e link externo no topo. |

## Diferenças em relação à implementação atual

1. Abertura atual revela o bloco tipográfico junto; referência revela partes em sequência. Contador atual linear, referência desacelera.
2. Hover de dois projetos ainda é animação de imagem. Vídeo real foi incluído apenas no ServiceBell; não equivale às sequências originais de todos os cards.
3. Bento atual troca imagens. Referência possui microinterações próprias em diferentes tiles.
4. Sobre mim atual é simplificado. Estrutura em blocos pode ser reproduzida, mas histórico, formação, prêmios, músicas e contatos de Martha não foram fornecidos.
5. Projetos e Playground abrem o mesmo modal simples no site atual. Referência tem duas experiências distintas: case narrativo com rolagem e galeria com painel lateral.
6. Ainda falta transição contextual da cor de fundo dentro do estudo de caso.

## Prioridade para fidelidade

Primeiro separar a apresentação de cases da galeria do Playground. Depois ajustar abertura escalonada, transição de fundo e microinterações do bento. Preservar navegação por teclado, acesso por toque e preferência por movimento reduzido. Não usar o zoom editorial da gravação como especificação de comportamento da página.

Esta rodada registra análise; não altera o site. A revisão visual da implementação em navegador continua pendente.
