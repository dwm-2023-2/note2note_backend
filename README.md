# Note2Note - Backend

## Iniciar localmente

Clone o repositório:

```bash
  git clone https://github.com/dwm-2023-2/note2note_backend.git
```

Entre no diretório do projeto:
```bash
  cd note2note_backend
```

Instale as dependências:
```bash
  npm install
```

Inicie o servidor de desenvolvimento:
```bash
  node index.js
```

Inice o ramificação de desenvolvimento (GitFlow):
```bash
  git flow init
```
Crie uma *feature*:
```bash
  git flow feature start MYFEATURE
```

Crie uma *bugfix*:
```bash
  git flow bugfix start MYFEATURE
```

Crie uma *hotfix*:
```bash
  git flow hotfix start MYFEATURE
```

Crie um arquivo .env e cole o conteúdo de .env.example nele.

# Guia de Uso do Devcontainer na Equipe de Desenvolvimento

## Visão Geral

Este guia fornece instruções sobre como usar devcontainers em nossa equipe de desenvolvimento. Devcontainers são ambientes de desenvolvimento consistentes e isolados, que podem ser facilmente compartilhados e replicados por toda a equipe. Eles garantem que todos tenham o mesmo ambiente de desenvolvimento, economizando tempo e evitando problemas de configuração.

## Pré-requisitos

- Visual Studio Code (VSCode) instalado: [Download VSCode](https://code.visualstudio.com/)
- Extensão "Remote - Containers" instalada no VSCode: [Instalação da Extensão](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Configuração Inicial

Antes de começar a usar devcontainers, siga estas etapas de configuração inicial:

1. Clone o repositório do projeto para o seu computador:

    ```bash
    git clone https://github.com/dwm-2023-2/note2note_backend
    ```

2. Abra a pasta do projeto no Visual Studio Code:

    ```bash
    cd note2note_backend
    code .
    ```

3. O VSCode detectará automaticamente a configuração do devcontainer e perguntará se deseja reabrir o projeto no contêiner. Aceite a oferta.

4. O ambiente de desenvolvimento dentro do devcontainer será construído e iniciado. Isso pode levar algum tempo na primeira execução.

## Uso Diário

Após a configuração inicial, usar o devcontainer é simples:

1. Abra o projeto no VSCode da maneira usual.

2. O VSCode detectará automaticamente o devcontainer e perguntará se deseja reabrir o projeto no contêiner.

3. Você está agora dentro do ambiente de desenvolvimento do devcontainer. Todas as ferramentas e dependências necessárias estão configuradas.

4. Escreva seu código, execute testes e realize tarefas de desenvolvimento como faria normalmente.

## Gerenciando o Devcontainer

### Parar o Devcontainer

Para parar o devcontainer e liberar recursos do seu computador:

1. Clique no ícone "Remote Explorer" no canto inferior esquerdo do VSCode.

2. No painel "Containers", clique com o botão direito do mouse no devcontainer em uso.

3. Selecione "Stop Container" para interromper o devcontainer.

### Iniciar o Devcontainer Manualmente

Caso o devcontainer não seja iniciado automaticamente:

1. Abra a pasta do projeto no VSCode.

2. Na parte inferior direita da janela, clique em "Abrir uma janela ou pasta remota".

3. Selecione o devcontainer do projeto na lista.

4. O ambiente de desenvolvimento será construído e iniciado.

Documentação criada por: [wilque](https://github.com/uiuqm)

08/10/2023