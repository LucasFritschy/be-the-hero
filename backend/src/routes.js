const express = require("express");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();
//rota de login de uma ONG
routes.post('/sessions', SessionController.create);
//rota de listagem das ONGS
routes.get("/ongs", OngController.index);
//rota de criação da ONG
routes.post("/ongs", OngController.create);
//rota de listagem dos casos
routes.get("/incidents", IncidentController.index);
//rota de criação dos casos
routes.post("/incidents", IncidentController.create);
//rota para deletar um caso específico
routes.delete("/incidents/:id", IncidentController.delete);
//rota para listar casos de uma ong específica
routes.get("/profile/", ProfileController.index);

module.exports = routes;
