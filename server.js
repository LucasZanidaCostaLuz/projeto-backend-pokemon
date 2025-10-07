require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const pokemonRoutes = require("./src/routes/pokemonRoutes");
const teamRoutes = require("./src/routes/teamRoutes");
const teamPokemonRoutes = require("./src/routes/teamPokemonRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", pokemonRoutes);
app.use("/api", teamRoutes);
app.use("/api", teamPokemonRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
