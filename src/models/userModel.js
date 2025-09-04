const pool = require("../config/database")

const getUser = async () => {
    const result = await pool.query("SELECT * FROM users")
    return result.rows
}

const qetUserPokemon = async (id) => {
    const result = await pool.query("SELECT * FROM pokemons WHERE user_id=$1", [id])
    return result.rows
}

const getUserById = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id=$1 RETURNING *", [id])
    return result.rows[0]
}

const createUser = async (nome, email, senha) => {
    const result = await pool.query("INSERT INTO users (name, email, senha) VALUES($1, $2, $3) RETURNING", [nome, email, senha]);
    return result.rows[0];
}

const updateUser = async (nome, email, senha, id) => {
    const result = await pool.query("UPDATE users SET name = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *", [nome, email, senha, id]);
    return result.rows[0];
}

const deleteUser = async (id) => {
    const result = await pool.query("DELETE * FROM users WHERE id = $1 RETURNING *")
    if(result.rowCount === 0){
        return{ error: "Usuários deletado com sucesso" };
    } 
    return {message: "Usuário deletado com sucesso" }
}

module.exports = {getUser, getUserById, createUser, updateUser, deleteUser}