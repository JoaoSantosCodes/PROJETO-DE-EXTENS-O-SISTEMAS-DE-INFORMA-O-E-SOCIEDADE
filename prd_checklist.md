# Documento de Requisitos do Produto (PRD) & Checklist de Implementação
## Plataforma ConectaInclusão (Capacitação e Oportunidades)
### Contexto de Extensão Universitária - Estácio de Sá

---

## 1. Visão Geral do Projeto
A plataforma **ConectaInclusão** é um projeto de extensão universitária no âmbito da disciplina **Sistemas de Informação e Sociedade** desenvolvido para promover a inclusão digital e a empregabilidade de grupos socialmente vulneráveis ou minoritários (refugiados, comunidades indígenas urbanizadas, pessoas de baixa renda, minorias de gênero) na região de Carapicuíba - SP. A plataforma conecta capacitação básica, ferramenta de estruturação profissional e vagas de trabalho inclusivas.

### Objetivos Principais
- **Letramento Digital:** Capacitar a comunidade local no uso de ferramentas essenciais de informática e IA.
- **Empregabilidade:** Facilitar a criação estruturada de currículos com exportação formatada.
- **Integração Social:** Disponibilizar vagas reais de parceiros comerciais e microempresas engajados com diversidade e inclusão.
- **Ética e Cidadania na TI:** Proporcionar uma interface inclusiva, sem barreiras de acessibilidade e que respeite a diversidade cultural e linguística.

---

## 2. Público-Alvo e Personas
- **Público Beneficiário:** Pessoas atendidas por ONGs parceiras, com baixa renda (até 1,5 salário mínimo), com ou sem letramento digital consolidado.
- **Persona 1: Refugiado em Busca de Inclusão**
  - *Perfil:* 32 anos, refugiado recente, possui dificuldades com a gramática formal do português e busca vagas que ofereçam flexibilidade ou suporte linguístico.
- **Persona 2: Jovem de Comunidade Tradicional / Indígena Urbanizada**
  - *Perfil:* 19 anos, busca o primeiro emprego formal através de programas como Jovem Aprendiz e necessita de orientação para formular seu primeiro currículo.
- **Persona 3: Microempreendedor / Empresa Local Parceira**
  - *Perfil:* Dono de comércio ou pequena empresa em Carapicuíba/Osasco que quer apoiar a diversidade e cadastrar vagas inclusivas na plataforma.

---

## 3. Requisitos Funcionais (RF)
### RF01: Autenticação de Usuários (Segurança)
- O sistema deve permitir o cadastro de novos usuários com Nome Completo, E-mail e Senha (mínimo de 6 caracteres).
- O sistema deve permitir o login com validação de credenciais via hash bcrypt e emissão de token JWT.
- O fluxo de autenticação deve suportar integração com banco PostgreSQL e possuir fallback para simulação em memória (garantindo robustez caso o banco local ou na nuvem esteja offline).

### RF02: Letramento Digital (Capacitação)
- Exibição de cards interativos de cursos focados em letramento digital básico (Informática Básica, Segurança Digital e Produtividade com IA).
- Exibição de nível, duração estimada e descrição detalhada de cada módulo.

### RF03: Gerador Dinâmico de Currículos (Acessibilidade e Usabilidade)
- Formulário intuitivo para inserção de dados: Informações Pessoais, Resumo Profissional, Formação Acadêmica, Experiência Profissional e Habilidades.
- Autopreenenchimento do Nome e E-mail baseado nos dados do usuário logado.
- Visualização (Live Preview) em tempo real do currículo formatado no padrão A4.
- Impressão nativa do navegador (`window.print`) otimizada via CSS `@media print` para ocultar elementos da página (menu, formulários, botões) e imprimir apenas a folha limpa do currículo.

### RF04: Painel de Vagas Inclusivas (Conexão)
- Exibição de vagas com detalhes: cargo, empresa parceira, modalidade (integral, meio-período, remoto), tags de acessibilidade/diversidade (Apoio a Refugiados, Jovem Aprendiz, Trabalho Remoto, LGBTQIA+ Friendly) e descrição.
- Filtro dinâmico em tempo real por barra de busca (cargo, empresa) e por categorias/tags selecionáveis.
- Regra de negócio: A candidatura às vagas deve exigir login do usuário e a prévia geração de um currículo para garantir que o candidato esteja qualificado e com documento estruturado.
- Modal de confirmação animado ao enviar a candidatura.

---

## 4. Requisitos Não-Funcionais (RNF)
- **RNF01: Estética e Interface (UI/UX):** Design system moderno com suporte a modo escuro/claro nativo, variáveis CSS, transições suaves, glassmorphism, sem placeholders genéricos e com layout totalmente responsivo para dispositivos móveis.
- **RNF02: Performance:** Carregamento rápido da página única (Single Page Application conceitual sem dependências pesadas de frameworks).
- **RNF03: Segurança:** Criptografia de senhas (bcryptjs) no backend e controle de rotas privadas baseado em tokens JWT com expiração de 24h.
- **RNF04: Compatibilidade de Impressão:** Garantir que o currículo impresso se enquadre perfeitamente na folha física A4 sem quebras indesejadas de layout.

---

## 5. Arquitetura Técnica
A aplicação foi desenvolvida sobre uma arquitetura leve, moderna e de fácil manutenção:
- **Frontend:** HTML5 Semântico, CSS3 customizado (variáveis, flexbox/grid), Vanilla JavaScript (manipulação de DOM, localStorage e requisições Fetch API).
- **Backend:** Node.js com Express para fornecimento das APIs de cadastro, login e arquivos estáticos.
- **Banco de Dados:** Driver `pg` para integração com PostgreSQL local ou remoto (como Vercel Postgres). Modo de simulação automático com objetos em memória caso a conexão com banco falhe.
- **Segurança:** bcryptjs para hash de senhas e jsonwebtoken (JWT) para proteção e autenticação de rotas.

---

## 6. Mapeamento de Rotas da API
- `POST /api/auth/register` - Registro de novo usuário.
- `POST /api/auth/login` - Login do usuário e geração de token JWT.
- `GET *` - Redirecionamento para index.html para o comportamento de SPA (Single Page Application).

---

## 7. Checklist de Entrega e Evidências (Acadêmico & Técnico)

### Bloco A: Documentação Acadêmica (Estácio)
- [ ] **Relatório de Extensão Preenchido (`relatorio_extensao.md`):** Validação dos dados do aluno, diagnóstico local (Carapicuíba), situação-problema, plano de cronograma e avaliação dos resultados.
- [ ] **Ata de Reunião com a ONG (`ata_reuniao_ong.md`):** Evidência de escuta ativa e diagnóstico local de vulnerabilidade realizado em 15/04/2026.
- [ ] **Dados de Feedback Consolidados (`feedback_participantes.csv`):** Tabela de impacto pós-treinamento com dados reais das avaliações dos participantes.
- [ ] **Diretório de Fotos (`/fotos/`):** Diretório com registros das oficinas práticas na comunidade.

### Bloco B: Frontend, Interface e Interação (UX/UI)
- [ ] **Modo Claro/Escuro:** Testar a persistência do tema selecionado no `localStorage` após recarregar a página.
- [ ] **Responsividade:** Garantir que o portal funcione perfeitamente em telas móveis, tablets e desktop (usar menu de gaveta em mobile).
- [ ] **Gerador de Currículos:**
  - [ ] Validar que campos obrigatórios emitem alertas apropriados se vazios.
  - [ ] Verificar que o botão "Imprimir / Salvar PDF" é habilitado somente após a geração do Live Preview.
  - [ ] Validar a folha de impressão em PDF: simular impressão no Chrome/Edge e verificar se apenas o currículo é exibido na folha A4 e sem cabeçalhos/rodapés do site.
- [ ] **Painel de Vagas:**
  - [ ] Validar filtros dinâmicos de pesquisa por texto.
  - [ ] Validar filtros rápidos por categoria (todas, refugiados, jovens, remoto).
  - [ ] Validar regra de negócio: tentar candidatar-se sem login (deve exibir alerta e abrir modal de login).
  - [ ] Validar regra de negócio: tentar candidatar-se logado, mas sem currículo gerado (deve emitir alerta direcionando para o formulário de currículo).
  - [ ] Validar fluxo de candidatura completa com animação de sucesso no modal.

### Bloco C: Backend, Segurança e Banco de Dados (API/PostgreSQL)
- [ ] **Conexão com PostgreSQL:**
  - [ ] Configuração do arquivo `.env` com as variáveis necessárias (`DB_USER`, `DB_HOST`, `DB_DATABASE`, `DB_PASSWORD`, `DB_PORT`).
  - [ ] Inicialização da tabela `users` utilizando o script `schema.sql`.
  - [ ] Validação do log de sucesso do banco de dados no terminal: `✅ [POSTGRESQL] Banco de dados conectado com sucesso!`.
  - [ ] Teste de resiliência: desativar o banco local e verificar se o backend faz o fallback para o modo simulação (em memória) sem derrubar o servidor.
- [ ] **Segurança e Criptografia:**
  - [ ] Tentar registrar usuário duplicado (deve retornar erro 400).
  - [ ] Testar login com senha errada (deve retornar erro 400).
  - [ ] Inspecionar o banco PostgreSQL para verificar se a senha está sendo salva devidamente criptografada com salt bcrypt (não-plaintext).

### Bloco D: Deploy & Entrega Final
- [ ] **Hospedagem no GitHub:** Versionamento total do projeto com README claro e links.
- [ ] **Hospedagem em Produção:** Deploy configurado na Vercel (utilizando `vercel.json` e as variáveis de ambiente necessárias no dashboard da Vercel).
- [ ] **Validação Geral:** Executar testes manuais na URL pública de produção para certificar o perfeito funcionamento de todos os módulos.
