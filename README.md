## Este é o README do projeto de API web Meus Mantos, desenvolvido para a disciplina Programação WEB. A API é uma ferramenta para Controle de estoque de camisas de futebol.

# Funcionalidades
* Cadastrar Usuário
* Fazer Login de usuário
* Cadastrar uma camisa
* Alterar uma camisa cadastrada
* Excluir uma camisa cadastrada
* Listar as camisas que o usuário cadastrou

# Requisitos
* O sistema deve permitir o registro de novos usuários com um nome de usuário e senha.
*  O sistema deve permitir que os usuários façam login e recebam um token JWT para autenticação.
*  O sistema deve permitir que usuários autenticados cadastrem novas camisas fornecendo informações como time, ano, tipo, tamanho e cor.
*  O sistema deve permitir que usuários autenticados alterem as informações de camisas já cadastradas.
*  O sistema deve permitir que usuários autenticados excluam camisas cadastradas.
*  O sistema deve permitir que usuários autenticados listem todas as camisas cadastradas por eles.
*  O sistema deve garantir que apenas usuários autenticados possam acessar as funcionalidades de gerenciamento de camisas.
*  O sistema deve utilizar tokens JWT para autenticar e autorizar usuários.
*  O sistema deve fornecer uma interface web intuitiva para que os usuários possam interagir com as funcionalidades de cadastro, login e gerenciamento de camisas.
*  O sistema deve permitir a navegação entre as páginas de cadastro de usuário, login, listagem de camisas, cadastro de novas camisas, alteração e exclusão de camisas.

# Instalação da API:]
## Pré requisitos
* Python 3.7 ou superior
* Node.js e npm


Clone o repositório:
```
git clone https://github.com/Padualb7/PW.git
```
## BACKEND

Navegue até o diretório do projeto:
```
cd backend
```
Instale as dependências:
```
pip install -r requirements.txt
```
Inicie o servidor FastAPI:
```
python -m uvicorn main:app --reload
```
Seu backend deverá estar rodando no localhost:8000

## FRONTEND
Navegue até a pasta do frontend:
```
cd frontend\shirts-front
```
Instale as dependências:
```
npm install
```
Rode o projeto angular
```
ng serve
```
Seu frontend deverá estar rodando na porta localhost:4200

# Uso da API
```
curl -X POST "http://localhost:8000/token/" \
-H "Content-Type: application/json" \
-d '{
  "username": "novo_usuario",
  "password": "senha123"
}'
```

```
curl -X POST "http://localhost:8000/users/" \
-H "Content-Type: application/json" \
-d '{
  "username": "novo_usuario",
  "password": "senha123"
}'
```

```
curl -X GET "http://localhost:8000/products/" \
-H "Authorization: Bearer SEU_TOKEN_JWT"
```

```
curl -X POST "http://localhost:8000/products/" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN_JWT" \
-d '{
  "team": "Time Exemplo",
  "year": 2023,
  "type": "Home",
  "size": "M",
  "color": "Azul"
}'
```

```
curl -X PUT "http://localhost:8000/products/1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN_JWT" \
-d '{
  "team": "Time Exemplo Alterado",
  "year": 2024,
  "type": "Away",
  "size": "G",
  "color": "Vermelho"
}'
```

```
curl -X DELETE "http://localhost:8000/products/1" \
-H "Authorization: Bearer SEU_TOKEN_JWT"
```

# Testes

* Teste 1: Testar o endpoint de cadastro de usuário para garantir que novos usuários podem ser registrados.
* Teste 2: Testar o endpoint de autenticação para garantir que usuários registrados podem fazer login.
* Teste 3: Testar o endpoint de gerenciamento de produtos para garantir que apenas usuários autenticados podem criar, visualizar, atualizar e excluir camisas.

# Contribuição
Lucas de Pádua Bergamaschi
