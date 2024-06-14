const pool = require(`./../../config/pool_conexoes`);

const ClienteModel = {
  getAllClientes: async () => {
    const [rows] = await pool.query('SELECT * FROM Clientes');
    return rows;
  },

  getClienteById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [id]);
    return rows[0];
  },

  createCliente: async (cliente) => {
    const { nome_cliente, email_cliente, cpf_cliente, senha_cliente, datanasc_cliente, Enderecos_id_endereco, Contatos_id_contato } = cliente;
    const result = await pool.query('INSERT INTO Clientes SET ?', {
      nome_cliente,
      email_cliente,
      cpf_cliente,
      senha_cliente,
      datanasc_cliente,
      Enderecos_id_endereco,
      Contatos_id_contato
    });
    return result.insertId;
  },

  updateCliente: async (id, cliente) => {
    const { nome_cliente, email_cliente, cpf_cliente, senha_cliente, datanasc_cliente, Enderecos_id_endereco, Contatos_id_contato } = cliente;
    const result = await pool.query('UPDATE Clientes SET ? WHERE id_cliente = ?', [{
      nome_cliente,
      email_cliente,
      cpf_cliente,
      senha_cliente,
      datanasc_cliente,
      Enderecos_id_endereco,
      Contatos_id_contato
    }, id]);
    return result.affectedRows;
  },

  deleteCliente: async (id) => {
    const result = await pool.query('DELETE FROM Clientes WHERE id_cliente = ?', [id]);
    return result.affectedRows;
  },

  cadastrarCliente: async (nome, email, cpf, senha) => {
    const result = await pool.query('INSERT INTO Clientes SET ?', {
      nome_cliente: nome,
      email_cliente: email,
      cpf_cliente: cpf,
      senha_cliente: senha
    });
    return result.insertId;
  }
};

module.exports = ClienteModel;
