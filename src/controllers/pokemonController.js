const pokemonModel = require("../models/pokemonModel")

const getAllPokemons = async (req, res) => {
    try {
        const pokemon = await pokemonModel.getPokemons();
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pokemons." });
    }
};

const getPokemonAndAbilities = async (req, res) => {
    try {
        const pokemon = await pokemonModel.getPokemonAndAbilities(req.params.id);
        if (!pokemon) {
            return res.status(404).json({ message: "Pokemon não encontrado." });
        }
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pokemon." });
    }
};

const getPokemonByName = async (req, res) => {
    try {
        const pokemon = await pokemonModel.getPokemonByName(req.params.name);
        if (!pokemon) {
            return res.status(404).json({ message: "Pokemon não encontrado." });
        }
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pokemon." });
    }
};

const getPokemonById = async (req, res) => {
    try {
        const pokemon = await pokemonModel.getPokemonById(req.params.id);
        if (!pokemon) {
            return res.status(404).json({ message: "Pokemon não encontrado." });
        }
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pokemon." });
    }
};

const createPokemon = async (req, res) => {
    try {
        const { name, weight, height, evolves_from_species, evolves_to_species } = req.body;
        const newPokemon = await pokemonModel.createPokemon(name, weight, height, evolves_from_species, evolves_to_species);
        res.status(201).json(newPokemon);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao criar pokemon." });
    }
};

const updatePokemon = async (req, res) => {
    try {
        const { name, weight, height, evolves_from_species, evolves_to_species } = req.body;
        const updatedPokemon = await pokemonModel.updatePokemon(name, weight, height, evolves_from_species, evolves_to_species, req.params.id);
        if (!updatedPokemon) {
            return res.status(404).json({ message: "Pokemon não encontrado." });
        }
        res.json(updatedPokemon);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar pokemon." });
    }
};

const deletePokemon= async (req, res) => {
    try {
        const message = await pokemonModel.deletePokemon(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar pokemon." });
    }
};

module.exports = {getAllPokemons, getPokemonById, createPokemon, updatePokemon, deletePokemon, getPokemonAndAbilities, getPokemonByName};