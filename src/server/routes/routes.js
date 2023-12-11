const express = require("express");
const { validateAuth } = require("@middleware/authMiddleware");
const { validateRamal } = require("@middleware/ramalMiddleware");
const { verificaToken } = require("@middleware/jwtMiddleware");
const { validateFuncionario } = require("@middleware/funcionarioMiddleware");
const errorHandler = require("@middleware/errorsMiddleware");

const ramalController = require("@controllers/ramalController");
const loginController = require("@controllers/loginController");
const funcionarioController = require("@controllers/funcionarioController");

const routes = express.Router();

// ROTAS DE AUTH e REGISTER
routes.get(
  "/api/v1/auth",
  validateAuth("verificaUser"),
  loginController.verificaLogin,
);
routes.post(
  "/api/v1/auth",
  validateAuth("verificaRegistro"),
  loginController.verificaRegistro,
);

/////////////////////////////////////////////////////////////////// ROTAS DE RAMAL ////////////////////////////////////////////////////

// ADICIONAR RAMAL
routes.post(
  "/api/v1/ramal",
  verificaToken,
  validateRamal("verificaRamal"),
  ramalController.adicionaRamal,
);

// LISTA RAMAL
routes.get("/api/v1/ramal", verificaToken, ramalController.listaRamais);

// SELECIONA RAMAL

routes.get("/api/v1/ramal/:id", verificaToken, ramalController.selecionaRamal);

// UPDATE RAMAL
routes.put("/api/v1/ramal/:id", verificaToken, ramalController.atualizaRamal);

// DELETE RAMAL
routes.delete("/api/v1/ramal/:id", verificaToken, ramalController.deleteRamal);

//////////////////////////////////////////////////////////////////// ROTAS FUNCIONÁRIO //////////////////////////////////////////////////

// ADICIONAR FUNCIONÁRIO
routes.post(
  "/api/v1/funcionario",
  verificaToken,
  validateFuncionario("verificaFuncionario"),
  funcionarioController.adicionarFuncionario,
);

// LISTAR FUNCIONÁRIOS
routes.get(
  "/api/v1/funcionario",
  verificaToken,
  funcionarioController.listarFuncionarios,
);

// UPDATE FUNCIONÁRIO
routes.put(
  "/api/v1/funcionario/:id",
  verificaToken,
  funcionarioController.atualizaFuncionario,
);

// SELECIONA FUNCIONÁRIO
routes.get(
  "/api/v1/funcionario/:id",
  verificaToken,
  funcionarioController.selecionaFuncionario,
);
// DELETE RAMAL
routes.delete(
  "/api/v1/funcionario/:id",
  verificaToken,
  funcionarioController.deleteFuncionario,
);

routes.use(errorHandler);

module.exports = routes;
