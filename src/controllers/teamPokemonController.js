const teamPokemonModel = require('../models/teamPokemonModel');

const getPokemonsFromTeam = async (req, res) => {
    try {
        const { team_id } = req.params;
        const userId = req.user.id;
        const pokemons = await teamPokemonModel.getPokemonsFromTeam(team_id, userId);
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Pokémons do time." });
    }
};

const addPokemonToTeam = async (req, res) => {
    try {
        const { team_id } = req.params;
        const { pokemon_id } = req.body;
        const userId = req.user.id;
        const newEntry = await teamPokemonModel.addPokemonToTeam(team_id, pokemon_id, userId);
        res.status(201).json(newEntry);
    } catch (error) {
        if (error.message.includes("Time não encontrado")) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Erro ao adicionar Pokémon ao time." });
    }
};

const removePokemonFromTeam = async (req, res) => {
    try {
        const { team_id, pokemon_id } = req.params;
        const userId = req.user.id;
        const result = await teamPokemonModel.removePokemonFromTeam(team_id, pokemon_id, userId);
        if (result.error) {
            res.status(404).json({ message: result.error });
        } else {
            res.json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover Pokémon do time." });
    }
};

module.exports = { getPokemonsFromTeam, addPokemonToTeam, removePokemonFromTeam };