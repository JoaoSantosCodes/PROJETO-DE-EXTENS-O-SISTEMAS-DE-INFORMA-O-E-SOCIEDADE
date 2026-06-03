# Projeto de Extensão - Sistemas de Informação e Sociedade
## Portal ConectaInclusão (Capacitação e Oportunidades)

Este repositório contém o código-fonte do protótipo da plataforma web **ConectaInclusão** e os documentos de evidência relativos à atividade prática de Extensão Universitária da **Estácio** para a disciplina **Sistemas de Informação e Sociedade**.

---

## 🎯 Objetivo do Projeto
O principal objetivo do projeto é utilizar a tecnologia como instrumento de inclusão social e inserção no mercado de trabalho de grupos socialmente vulneráveis ou minoritários (como refugiados, indígenas urbanizados, pessoas de baixa renda e minorias de gênero) na comunidade local.

A solução consiste em uma plataforma digital de fácil acessibilidade, dividida em três pilares principais:
1. **Letramento Digital:** Repositório de microcursos com foco no desenvolvimento de habilidades em ferramentas de informática básica, segurança na internet e produtividade com IA.
2. **Gerador de Currículos:** Ferramenta interativa e guiada que auxilia o usuário a estruturar seu histórico profissional e gerar um documento formatado para impressão ou salvamento em PDF.
3. **Painel de Vagas Inclusivas:** Quadro com vagas de trabalho reais de microempreendedores e empresas locais comprometidas com pautas de diversidade e inclusão.

---

## 📂 Estrutura do Repositório

O repositório está organizado da seguinte forma:

```bash
├── index.html                   # Estrutura semântica do portal
├── styles.css                   # Estilização com design system moderno (Modo Escuro/Claro)
├── app.js                       # Lógica de interatividade, filtros e gerador de currículos
├── relatorio_extensao.md        # Relatório de atividades completo preenchido (modelo Estácio)
├── ata_reuniao_ong.md           # Evidência 1: Ata de alinhamento com a ONG parceira
├── feedback_participantes.csv   # Evidência 2: Dados consolidados das avaliações pós-oficina
└── fotos/
    └── README.md                # Evidência 3: Orientações para inclusão das fotos do projeto
```

---

## 🚀 Como Executar o Portal

Por ser um portal de página única (SPA) estático e sem dependências externas complexas, você pode executá-lo diretamente no seu navegador local:

1. Baixe os arquivos do repositório ou clone o projeto:
   ```bash
   git clone https://github.com/JoaoSantosCodes/PROJETO-DE-EXTENS-O-SISTEMAS-DE-INFORMA-O-E-SOCIEDADE.git
   ```
2. Acesse a pasta do projeto.
3. Dê um duplo clique no arquivo `index.html` para abri-lo no Chrome, Edge, Firefox ou Safari.
4. Para simular a geração e impressão do currículo:
   - Preencha o formulário na seção **"Criar Currículo"**.
   - Clique em **"Gerar Visualização"**.
   - O botão **"Imprimir / Salvar PDF"** ficará disponível. Ao clicar nele, a caixa de impressão nativa do navegador se abrirá pré-configurada para salvar apenas a folha do currículo no formato A4, ocultando o restante do site automaticamente.

---

## 🛠️ Tecnologias Utilizadas
* **HTML5:** Estrutura semântica e técnicas de acessibilidade (leitor de tela e tags semânticas).
* **CSS3:** Variáveis CSS, layout moderno com Flexbox e Grid, efeitos de vidro (glassmorphism), transições e folha de estilo dedicada para impressão (`@media print`).
* **Vanilla JavaScript:** Manipulação de DOM para atualização do preview em tempo real, filtros de vagas e chaveamento de temas (Dark/Light mode) com persistência em `localStorage`.
* **Font Awesome:** Ícones vetoriais modernos.
* **Google Fonts (Inter / Outfit):** Tipografia limpa e profissional.

---

## 🎓 Informações Acadêmicas
* **Aluno Extensionista:** João Carlos de Souza Santos
* **Disciplina:** Sistemas de Informação e Sociedade
* **Instituição:** Universidade Estácio de Sá (2026)
* **Local de Execução:** Carapicuíba - SP
