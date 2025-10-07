const pool = require("../config/database");

const getAllPokemons = async () => {
  const result = await pool.query(
    "SELECT p.id, p.name, p.height, p.weight, p.image, (SELECT JSON_AGG(pt.type) FROM pokemon_types pt WHERE pt.pokemon_id = p.id) as types FROM pokemon p ORDER BY p.id ASC;"
  );
  return result.rows;
};

const getPokemonById = async (id) => {
  const result = await pool.query(
    "SELECT p.id, p.name, p.height, p.weight, p.image, p.evolves_from_species, p.evolves_to_species, p.description, (SELECT JSON_AGG(pt.type) FROM pokemon_types pt WHERE pt.pokemon_id = p.id) as types, (SELECT JSON_AGG(pa.ability) FROM pokemon_abilities pa WHERE pa.pokemon_id = p.id) as abilities, JSON_BUILD_OBJECT('hp', ps.hp, 'attack', ps.attack, 'defense', ps.defense, 'speed', ps.speed) as stats FROM pokemon p LEFT JOIN pokemon_stats ps ON p.id = ps.pokemon_id WHERE p.id = $1",
    [id]
  );
  return result.rows[0];
};

const getPokemonByName = async (name) => {
  const result = await pool.query(
    `SELECT p.id, p.name, p.height, p.weight, p.image, p.evolves_from_species, p.evolves_to_species, p.description,
      (SELECT JSON_AGG(pt.type) FROM pokemon_types pt WHERE pt.pokemon_id = p.id) as types,
      (SELECT JSON_AGG(pa.ability) FROM pokemon_abilities pa WHERE pa.pokemon_id = p.id) as abilities,
      JSON_BUILD_OBJECT('hp', ps.hp, 'attack', ps.attack, 'defense', ps.defense, 'speed', ps.speed) as stats
    FROM pokemon p
    LEFT JOIN pokemon_stats ps ON p.id = ps.pokemon_id
    WHERE p.name ILIKE $1
    ORDER BY p.id ASC`,
    [`%${name}%`]
  );
  return result.rows;
};

const createPokemon = async (pokemonData) => {
  const { name, weight, height, image, evolves_from_species, evolves_to_species } = pokemonData;
  const result = await pool.query(
    "INSERT INTO pokemon (name, weight, height, image, evolves_from_species, evolves_to_species) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, weight, height, image, evolves_from_species, evolves_to_species]
  );
  return result.rows[0];
};

const updatePokemon = async (id, pokemonData) => {
  const { name, weight, height, image, evolves_from_species, evolves_to_species } = pokemonData;
  const result = await pool.query(
    "UPDATE pokemon SET name = $1, weight = $2, height = $3, image = $4, evolves_from_species = $5, evolves_to_species = $6 WHERE id = $7 RETURNING *",
    [name, weight, height, image, evolves_from_species, evolves_to_species, id]
  );
  return result.rows[0];
};

const deletePokemon = async (id) => {
  const result = await pool.query("DELETE FROM pokemon WHERE id = $1 RETURNING *", [id]);
  if (result.rowCount === 0) {
    return null; 
  }
  return result.rows[0]; 
};

module.exports = {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  createPokemon,
  updatePokemon,
  deletePokemon,
};