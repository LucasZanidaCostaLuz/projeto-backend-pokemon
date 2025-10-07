const teamPokemonController = require('../controllers/teamPokemonController');
const express = require('express');
const router = express.Router();

router.get('/teams/:team_id/pokemons', teamPokemonController.getPokemonsFromTeam);
router.post('/teams/:team_id/pokemons', teamPokemonController.addPokemonToTeam);
router.delete('/teams/:team_id/pokemons/:pokemon_id', teamPokemonController.removePokemonFromTeam);

module.exports = router;