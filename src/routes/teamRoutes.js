const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/teams", teamController.getAllTeams);
router.get("/teams/:id", teamController.getTeamById);
router.post("/team", teamController.createTeam);
router.put("/team/:id", teamController.updateTeam);
router.delete("/teams/:id", teamController.deleteTeam);

module.exports = router;