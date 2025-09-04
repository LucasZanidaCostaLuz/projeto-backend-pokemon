const pool = require("../config/database")

const getPokemons = async () => {
    const result = await pool.query("SELECT * FROM pokemon")
    return result.rows
}

const getPokemonById = async (id) => {
    const result = await pool.query("SELECT * FROM pokemon WHERE id=$1 RETURNING *", [id])
    return result.rows[0]
}

const createPokemon = async (name, type, level, user_id) => {
    const result = await pool.query("INSERT INTO pokemons (name, type, level, user_id) VALUES($1, $2, $3, $4) RETURNING", [name, type, level, user_id]);
    return result.rows[0];
}

const updatePokemon = async (name, type, level, user_id, id) => {
    const result = await pool.query("UPDATE pokemons SET name = $1, type = $2, level = $3, user_id = $4 WHERE id = $5 RETURNING *", [name, type, level, user_id, id]);
    return result.rows[0];
}

const deletePokemon = async (id) => {
    const result = await pool.query("DELETE * FROM pokemons WHERE id = $1 RETURNING *")
    if(result.rowCount === 0){
        return{ error: "Pokémon deletado com sucesso" };
    } 
    return {message: "Pokémon deletado com sucesso" }
}

module.exports = {getPokemons, getPokemonById, createPokemon, updatePokemon, deletePokemon}