import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init({
      usuario: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Campo usuário deve conter entre 3 e 50 caracteres',
          },
        },
      },
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 254],
            msg: 'Campo nome deve conter entre 3 e 50 caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        // validate: {
        //   len: {
        //     args: [3, 50],
        //     msg: 'Campo sobrenome deve conter entre 3 e 50 caracteres',
        //   },
        // },
      },
      setor: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 50],
            msg: 'Campo setor deve conter entre 2 e 50 caracteres',
          },
        },
      },
      senha: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Campo setor deve conter entre 3 e 50 caracteres',
          },
        },
      },
      senha_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (usuario) => {
      // eslint-disable-next-line no-param-reassign
      usuario.senha_hash = await bcryptjs.hash(usuario.senha, 8);
    });
    return this;
  }
}