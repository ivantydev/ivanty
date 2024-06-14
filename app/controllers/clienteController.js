const ClienteModel = require('../models/clienteModel');

const clienteController = {
  getAllClientes: async (req, res) => {
    try {
      const clientes = await ClienteModel.getAllClientes();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClienteById: async (req, res) => {
    try {
      const cliente = await ClienteModel.getClienteById(req.params.id);
      if (cliente) {
        res.status(200).json(cliente);
      } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCliente: async (req, res) => {
    try {
      if (!req.body.nome_cliente) {
        return res.status(400).json({ error: 'Nome do cliente é obrigatório' });
      }

      const newClienteId = await ClienteModel.createCliente(req.body);
      res.status(201).json({ id: newClienteId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCliente: async (req, res) => {
    try {
      const updatedRows = await ClienteModel.updateCliente(req.params.id, req.body);
      if (updatedRows > 0) {
        res.status(200).json({ message: 'Cliente atualizado com sucesso' });
      } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCliente: async (req, res) => {
    try {
      const deletedRows = await ClienteModel.deleteCliente(req.params.id);
      if (deletedRows > 0) {
        res.status(200).json({ message: 'Cliente excluído com sucesso' });
      } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = clienteController;
