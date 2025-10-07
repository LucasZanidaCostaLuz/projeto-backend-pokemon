const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getUser();
        res.json(users);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar usuários." });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuário." });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password_hash } = req.body;
        const hash = await bcrypt.hash(password_hash, 10); 
        const newUser = await userModel.createUser(name, email, hash); 
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") { 
            return res.status(400).json({ message: "E-mail já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar usuário." });
    }
};
const updateUser = async (req, res) => {
    try {
        const { name, email, password_hash } = req.body;
        const updatedUser = await userModel.updateUser(req.params.id, name, email, password_hash);
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
};

const deleteUser = async (req, res) => {
    try {
        const message = await userModel.deleteUser(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar usuário." });
    }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };