const pool = require("../config/database");

const getPokemonsFromTeam = async (team_id, userId) => {
    const result = await pool.query(`
        SELECT p.* FROM pokemon p
        JOIN team_pokemons tp ON p.id = tp.pokemon_id
        JOIN teams t ON t.id = tp.team_id
        WHERE tp.team_id = $1 AND t.user_id = $2;
    `, [team_id, userId]);
    return result.rows;
};

const addPokemonToTeam = async (team_id, pokemon_id, userId) => {
    const result = await pool.query(`
        INSERT INTO team_pokemons (team_id, pokemon_id)
        SELECT $1, $2
        WHERE EXISTS (
            SELECT 1 FROM teams WHERE id = $1 AND user_id = $3
        )
        RETURNING *;
    `, [team_id, pokemon_id, userId]);

    if (result.rowCount === 0) {
        throw new Error("Time não encontrado ou você não tem permissão para adicionar Pokémon a este time.");
    }
    
    return result.rows[0];
};

const removePokemonFromTeam = async (team_id, pokemon_id, userId) => {
    const result = await pool.query(`
        DELETE FROM team_pokemons
        WHERE team_id = $1 AND pokemon_id = $2
        AND EXISTS (
            SELECT 1 FROM teams WHERE id = $1 AND user_id = $3
        )
        RETURNING *;
    `, [team_id, pokemon_id, userId]);

    if (result.rowCount === 0) {
        return { error: "Pokémon não encontrado neste time ou você não tem permissão para removê-lo." };
    }

    return { message: "Pokémon removido do time com sucesso." };
};

module.exports = {
    getPokemonsFromTeam,
    addPokemonToTeam,
    removePokemonFromTeam
};