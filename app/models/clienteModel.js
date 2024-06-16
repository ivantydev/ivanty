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
    const { nome_cliente, email_cliente, cpf_cliente, senha_cliente, datanasc_cliente, Enderecos_id_endereco, Contatos_id_contato, perfil_cliente } = cliente;
    const [result] = await pool.query('INSERT INTO Clientes SET ?', {
      nome_cliente,
      cpf_cliente,
      senha_cliente,
      datanasc_cliente,
      Enderecos_id_endereco,
      Contatos_id_contato,
      perfil_cliente
    });
    return result.insertId;
  },

  updateCliente: async (id, cliente) => {
    const { nome_cliente, email_cliente, cpf_cliente, senha_cliente, datanasc_cliente, Enderecos_id_endereco, Contatos_id_contato, perfil_cliente } = cliente;
    const [result] = await pool.query('UPDATE Clientes SET ? WHERE id_cliente = ?', [{
      nome_cliente,
      cpf_cliente,
      senha_cliente,
      datanasc_cliente,
      Enderecos_id_endereco,
      Contatos_id_contato,
      perfil_cliente
    }, id]);
    return result.affectedRows;
  },

  deleteCliente: async (id) => {
    const [result] = await pool.query('DELETE FROM Clientes WHERE id_cliente = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = ClienteModel;
