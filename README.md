# Note2Note - Backend

## Iniciar localmente

Clone o repositório:

```bash
  git clone https://github.com/dwm-2023-2/note2note_backend.git
```

Entre no diretório do projeto:
```bash
  cd note2note_backend

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