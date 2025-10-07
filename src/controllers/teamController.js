const teamModel = require('../models/teamModel');

const getAllTeams = async (req, res) => {
    try {
        const { team_name } = req.query;
        const userId = req.user.id;
        const teams = await teamModel.getAllTeams( team_name, userId);
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar times." });
    }
};

const getTeamById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const team = await teamModel.getTeamById(id, userId);
        if (team) {
            res.json(team);
        } else {
            res.status(404).json({ message: "Time não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar time." });
    }
};

const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const result = await teamModel.deleteTeam(id, userId);
        if (result.error) {
            res.status(404).json({ message: result.error });
        } else {
            res.json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar time." });
    }
};

module.exports = { getAllTeams, getTeamById, deleteTeam };