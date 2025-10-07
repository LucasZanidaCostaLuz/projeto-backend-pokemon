Projeto Backend Pokémon

Este projeto é um backend para gerenciamento de Pokémons, desenvolvido em Node.js, Express e PostgreSQL. Ele permite cadastrar, listar, atualizar, remover e buscar Pokémons, além de consultar habilidades e gerenciar usuários.

🛠 Tecnologias Utilizadas
Node.js
Express
PostgreSQL
pg (driver PostgreSQL para Node)

🚀 Funcionalidades
Cadastro de Pokémons
Listagem de todos os Pokémons
Busca de Pokémon por nome ou ID
Atualização e remoção de Pokémons
Consulta de habilidades de um Pokémon
Estrutura para autenticação de usuários

📁 Estrutura do Projeto

projeto-backend-pokemon/
├──.env
├── package.json
├── server.js
└── src/
    ├── config/
    │   └── database.js         # Configuração da conexão com o banco
    ├── controllers/
    │   ├── pokemonController.js
    │   └── userController.js
    ├── database/
    │   └── schema.sql          # Script de criação do banco
    ├── models/
    │   ├── pokemonModel.js
    │   └── userModel.js
    └── routes/
        ├── pokemonRoutes.js
        └── userRoutes.js

⚙️ Instalação e Execução

1.Clone o repositório:

git clone <url-do-repositorio>

2.Instale as dependências:

npm install

3.Configure o banco de dados PostgreSQL e ajuste o arquivo database.js conforme necessário.

4.Execute o script SQL em schema.sql para criar as tabelas.

5.Inicie o servidor:

npm run dev

O backend estará disponível em http://localhost:3000 (ou porta definida no seu projeto).

📚 Exemplos de Uso da API
Listar todos os Pokémons
GET /pokemons
Resposta:

[
  {
    "id": 1,
    "name": "Bulbasaur",
    "weight": 69,
    "height": 7
  }
]

Buscar Pokémon por ID
GET /pokemons/1
Resposta:
{
  "id": 1,
  "name": "Bulbasaur",
  "weight": 69,
  "height": 7
}

Criar um novo Pokémon
POST /pokemons
Content-Type: application/json
{
  "name": "Charmander",
  "weight": 85,
  "height": 6,
  "evolves_from_species": null,
  "evolves_to_species": "Charmeleon"
}

Atualizar um Pokémon
PUT /pokemons/1
Content-Type: application/json
{
  "name": "Bulbasaur",
  "weight": 70,
  "height": 7,
  "evolves_from_species": null,
  "evolves_to_species": "Ivysaur"
}

Remover um Pokémon
DELETE /pokemons/1

Desenvolvido por Lucas Zani

Se precisar de mais algum ajuste, é só avisar!