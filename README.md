# Portfólio - Pedro Paulo Oliveira

Como Desenvolvedor Front-end e UI/UX Designer com 5 anos de experiência, construí este portfólio para refletir não apenas a minha identidade visual, mas também o meu domínio sobre interações complexas, performance de renderização e arquitetura de componentes escaláveis.

Este projeto é uma Single Page Application (SPA) altamente interativa, onde a fronteira entre design e engenharia se dissolve através do uso de animações avançadas e manipulação matemática do DOM.

## 🛠 Tecnologias e Ecossistema

- **React:** Biblioteca principal para a construção das interfaces e gerenciamento do ciclo de vida dos componentes.
- **TypeScript:** Tipagem estática rigorosa para garantir a segurança, previsibilidade e autocomplemento do código, especialmente nas definições de temas e propriedades de componentes customizados.
- **GSAP (GreenSock Animation Platform):** Motor principal de animações responsável pelas transições fluidas e cálculos matemáticos de movimentação em tela.
- **GSAP ScrollTrigger:** Plugin utilizado para orquestrar as animações baseadas na posição do scroll do usuário, garantindo que os elementos surjam e se comportem no tempo exato.
- **Styled-components:** Utilizado para o encapsulamento de estilos em nível de componente e injeção de tema dinâmico via `ThemeProvider`.
- **Filtros SVG Genéricos:** Utilização de primitivas SVG diretamente no DOM para criar efeitos visuais avançados de distorção e ruído sem a necessidade de bibliotecas WebGL pesadas.

## ⚙️ Destaques Técnicos e Arquitetura

### 1. Motor de Animação com GSAP e Efeito "Lava Lamp"

O grande destaque da experiência visual é o componente `LavaBackground`. Em vez de utilizar vídeos ou Canvas/WebGL pesados, o efeito de lava foi construído puramente com elementos DOM e manipulação via GSAP para manter a performance.

- **Animação Randômica e Contínua:** Utilizei `gsap.utils.random` para gerar coordenadas (x, y), escalas e durações únicas para múltiplas instâncias (blobs) na tela.
- **Ciclo de Vida Limpo:** O uso de `gsap.to` com `repeat: -1` e `yoyo: true` cria um movimento perpétuo. As animações são devidamente limpas no unmount do componente (`gsap.killTweensOf`) para evitar memory leaks.
- **Scroll Restaurado:** A manipulação manual do `window.history.scrollRestoration` e o `ScrollTrigger.clearScrollMemory` garantem que o usuário sempre inicie a experiência do topo da página com todas as animações resetadas e prontas para o disparo.

### 2. Processamento Visual com Filtros SVG

Para atingir uma estética única e orgânica no background animado, integrei manipulação de SVG direto no React:

- **Gooey Effect (Efeito Pegajoso):** Implementado através da combinação de `feGaussianBlur` e uma matriz de cores exata em `feColorMatrix`. Isso faz com que os "blobs" do background se fundam de forma orgânica quando colidem, simulando física de fluidos.
- **Ruído e Textura:** Adição de um overlay com `feTurbulence` configurado como `fractalNoise`, gerando uma textura granulada em tempo real que adiciona profundidade visual ao minimalismo do projeto.

### 3. Técnicas Avançadas de CSS e Estilização

A tipografia e o contraste foram planejados milimetricamente no arquivo de configuração de tema (`theme.ts`), baseados em uma paleta monocromática agressiva e minimalista.

- **Mix Blend Mode:** A interface faz o uso estratégico da propriedade `mix-blend-mode: difference` em conjunto com a cor `#FFFFFF` nos containers textuais. O resultado é uma adaptação de cor instantânea do texto (inversão) baseada no que está sendo renderizado por trás dele pelo `LavaBackground`, garantindo acessibilidade e um visual striking sem a necessidade de gerenciar estados de cor por section.
- **Tipografia Consistente:** O projeto faz a importação controlada da família de fontes `Cascadia Mono` (com suas variações de peso e itálico) e `Instrument Serif`, tipadas e distribuídas através de design tokens.
- **Responsividade Padronizada:** O objeto de tema distribui media queries e breakpoints (`xs` até `xl`) que são consumidos globalmente pelos `styled-components`, mantendo a fluidez de layout em qualquer dispositivo.

### 4. Estruturação Modular de Componentes

O projeto segue a metodologia de Atomic Design ou similar (organizado em `atoms`, `molecules`, e `Sections`), permitindo que as responsabilidades fiquem bem isoladas:

- Elementos primitivos (Text, Button, Image, Box) são abstraídos e reutilizáveis.
- A página `Home` serve estritamente como um Controller visual, orquestrando as refs (`useRef`) do DOM para o GSAP e montando as seções (`Hero`, `Twisted`, `Manic`, `Cornucopeiac`).
