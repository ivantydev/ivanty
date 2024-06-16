const ClienteModel = require('../models/clienteModel');
const pool = require('../../config/pool_conexoes');

// Valores padrão para contatos e endereços
const DEFAULT_CONTACT_ID = 1; // ID de contato padrão
const DEFAULT_ADDRESS_ID = 1; // ID de endereço padrão

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
      const {
        nome_cliente,
        email_cliente,
        cpf_cliente,
        senha_cliente,
        datanasc_cliente,
        Enderecos_id_endereco = DEFAULT_ADDRESS_ID,
        Contatos_id_contato = DEFAULT_CONTACT_ID,
        perfil_cliente = 'user'
      } = req.body;

      if (!nome_cliente || !email_cliente || !cpf_cliente || !senha_cliente || !datanasc_cliente) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const newClienteId = await ClienteModel.createCliente({
        nome_cliente,
        email_cliente,
        cpf_cliente,
        senha_cliente,
        datanasc_cliente,
        Enderecos_id_endereco,
        Contatos_id_contato,
        perfil_cliente
      });

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
