const connection = require("../database/connection");

module.exports = {
  //rota de listagem de casos com paginação
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf",
      ]);

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(incidents);
  },
  //rota de criação dos casos
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id,
    });
    return response.json({ id });
  },
  //rota para deletar um caso específico
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    //validação simples que verifica se o ong_id do caso é o mesmo da ong logada
    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    //caso não seja, retornar mensagem de erro
    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: "Operation not permitted" });
    }

    //caso seja, deletar o caso selecionado e retornar mensagem de sucesso
    await connection("incidents").where("id", id).delete();

    return response.status(204).send();
  },
};