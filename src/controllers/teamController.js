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

const createTeam = async (req, res) => {
    try {
        const { team_name } = req.body
        const userId = req.user.id
        const team = await teamModel.createTeam(team_name, userId)
        res.json(team)
    } catch (error) {
        res.status(500).json({ message: "erro ao criar time"})
    } {

    }
}

const updateTeam = async (req, res) => {
    try {
        const { team_name } = req.body
        const team = await teamModel.updateTeam(team_name)
    } catch (error) {
        
    }
}

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

module.exports = { getAllTeams, getTeamById, createTeam, updateTeam ,deleteTeam };