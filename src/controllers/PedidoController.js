import Usuario from '../models/Usuario';
import Pedido from '../models/Pedido';
import Status from '../models/Status';

class PedidoController {
  async index(_req, res) {
    try {
      const pedidos = await Pedido.findAll();
      console.log(res);
      return res.json(pedidos);
    } catch (error) {
      return res.status(400).json(
        {
          errors: error.errors?.map((err) => err.message),
        },
      );
    }
  }

  async show(req, res) {
    console.log(req.params, 'Método show');

    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id, { include: Usuario });

      if (!pedido) throw Error;

      return res.json(pedido);
    } catch (error) {
      return res.status(404).json({
        message: 'ID não encontrado',
        errors: [error.message],
      });
    }
  }

  async store(req, res) {
    try {
      const novoPedido = await
      Pedido.create({
        descr: req.body.descr,
        quantidade: req.body.quantidade,
        comentario: req.body.comentario,
        ref: req.body.ref,
        usuario_id: req.userId,
        ativo: 1,
        status_id: 1,
      });
      res.json(novoPedido);
    } catch (error) {
      res.status(400).json(
        {
          errors: error.errors?.map((err) => (err.message === err.message.includes('must be unique') ? 'Usuário inválido' : `Usuário "${req.body.usuario}" já cadastrado`)),
        },
      );
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id * 1;
      if (!id) {
        return res.status(400).json({
          errors: ['Id não enviado ou não existe'],
        });
      }
      const order = await Pedido.findByPk(id);
      if (!order) {
        return res.status(400).json({
          errors: ['Pedido não existe'],
        });
      }

      const updatedData = await order.update(req.body, { where: { id: order.id } });

      return res.json(updatedData);
    } catch (error) {
      console.log(error.errors);
      return res.status(400).json(
        {
          errors: [error?.errors],
        },
      );
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id * 1) {
        return res.status(400).json({
          errors: ['Id não enviado ou não existe'],
        });
      }
      const order = await Pedido.findByPk(req.params.id * 1);
      if (!order) {
        return res.status(400).json({
          errors: ['Pedido não existe'],
        });
      }

      if (order) await order.destroy();
      return res.json(order);
    } catch (error) {
      console.log(error.errors);
      return res.status(400).json(
        {
          errors: [error.message],
        },
      );
    }
  }
}

/*
index -> lista todos os registros - get
store/create - cria um novo registro - post
delete - apaga um registro - delete
show - mostra um registro - get
update - atualiza um registro - patch/put
*/
export default new PedidoController();
