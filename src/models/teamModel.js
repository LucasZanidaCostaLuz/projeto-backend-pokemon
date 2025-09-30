const e = require("express");
const pool = require("../config/database");

const getAllTeams = async (team_name ,userId) => {
    if(team_name){
        const result = await pool.query("SELECT * FROM teams WHERE team_name ILIKE $1 AND user_id = $2", [`%${team_name}%`, userId]);
        return result.rows;
    } else{
        const result = await pool.query("SELECT * FROM teams WHERE user_id = $1", [userId]);
        return result.rows;
    }
}

const getTeamById = async (id, userId) => {
    const result = await pool.query("SELECT * FROM teams WHERE id=$1 AND user_id = $2", [id, userId]);
    return result.rows[0];
}

const createTeam = async (team_name, userId) => {
    const result = await pool.query("INSERT INTO teams (team_name, user_id) VALUES($1, $2) RETURNING *", [team_name, userId]);
    return result.rows[0];
}