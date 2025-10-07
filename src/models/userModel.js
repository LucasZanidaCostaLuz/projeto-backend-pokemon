const pool = require("../config/database")

const getUser = async () => {
    const result = await pool.query("SELECT * FROM users")
    return result.rows
}

const getUserById = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id])
    return result.rows[0]
}

const createUser = async (nome, email, password_hash) => {
    const result = await pool.query(
        "INSERT INTO users (name, email, password_hash) VALUES($1, $2, $3) RETURNING *",
        [nome, email, password_hash]
    );
    return result.rows[0];
}

const updateUser = async (id, nome, email, password_hash) => {
    const result = await pool.query(
        "UPDATE users SET name = $1, email = $2, password_hash = $3 WHERE id = $4 RETURNING *",
        [nome, email, password_hash, id]
    );
    return result.rows[0];
}

const deleteUser = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])
    if(result.rowCount === 0){
        return { error: "Usuário não encontrado" };
    } 
    return { message: "Usuário deletado com sucesso" }
}

module.exports = { getUser, getUserById, createUser, updateUser, deleteUser }