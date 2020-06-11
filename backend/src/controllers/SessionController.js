const connection = require("../database/connection");

module.exports = {
  //rota de login de uma ONG
  async create(request, response) {
    const { id } = request.body;
    //checa se o id da ONG tentando logar está na tabela de ongs
    const ong = await connection("ongs")
      .where("id", id)
      .select("name")
      .first();

    //retorn um erro caso não esteja
    if (!ong) {
      return response.status(400).json({ error: "No ONG found with this ID " });
    }
    //retorna o nome da ONG caso esteja
    return response.json(ong);
  },
};
