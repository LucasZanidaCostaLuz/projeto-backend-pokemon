const pool = require("../config/database")

const getPokemons = async () => {
    const result = await pool.query("SELECT * FROM pokemon")
    return result.rows
}

const getAllInfoOfAllPokemons = async () => {
    const result = await pool.query("SELECT p.id, p.name, p.weight, p.height, p.evolves_from_species, p.evolves_to_species, a.ability AS ability_name FROM pokemon p LEFT JOIN pokemon_abilities a ON p.id = a.pokemon_id")
    return result.rows
}

const getPokemonAndAbilities = async (id) => {
    const result = await pool.query("SELECT p.id, p.name, p.weight, p.height, p.evolves_from_species, p.evolves_to_species, a.ability AS ability_name FROM pokemon p LEFT JOIN pokemon_abilities a ON p.id = a.pokemon_id WHERE p.id = $1", [id])
    return result.rows
}

const getPokemonByName = async (name) => {
    const result = await pool.query("SELECT * FROM pokemon WHERE name ILIKE $1", [`%${name}%`])
    return result.rows
}

const getPokemonById = async (id) => {
    const result = await pool.query("SELECT * FROM pokemon WHERE id=$1", [id])
    return result.rows[0]
}

const createPokemon = async (name, weight, height, evolves_from_species, evolves_to_species) => {
    const result = await pool.query(
        "INSERT INTO pokemon (name, weight, height, evolves_from_species, evolves_to_species) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [name, weight, height, evolves_from_species, evolves_to_species]
    );
    return result.rows[0];
}

const updatePokemon = async (name, weight, height, evolves_from_species, evolves_to_species, id) => {
    const result = await pool.query(
        "UPDATE pokemon SET name = $1, weight = $2, height = $3, evolves_from_species = $4, evolves_to_species = $5 WHERE id = $6 RETURNING *",
        [name, weight, height, evolves_from_species, evolves_to_species, id]
    );
    return result.rows[0];
}

const deletePokemon = async (id) => {
    const result = await pool.query("DELETE FROM pokemon WHERE id = $1 RETURNING *", [id]);
    if(result.rowCount === 0){
        return { error: "Pokémon não encontrado" };
    }
    return { message: "Pokémon deletado com sucesso" };
}

module.exports = {getPokemons, getPokemonById, createPokemon, updatePokemon, deletePokemon, getPokemonAndAbilities, getPokemonByName}