import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init({
      usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: true,
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
            args: [3, 50],
            msg: 'Campo nome deve conter entre 3 e 50 caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Campo sobrenome deve conter entre 3 e 50 caracteres',
          },
        },
      },
      setor_id: {
        // fk
        type: Sequelize.STRING,
        defaultValue: null,
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
            args: [0, 50],
            msg: 'Campo senha deve conter entre 3 e 50 caracteres',
          },
        },
      },
      senha_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      grupo: {
        // fk
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    }, {
      timestamps: true,
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
      underscored: true,
      sequelize,
    });

    // this.associations({});

    this.addHook('beforeSave', async (usuario) => {
      if (usuario.senha) {
        // eslint-disable-next-line no-param-reassign
        usuario.senha_hash = await bcryptjs.hash(usuario.senha, 8);
      }
    });
    return this;
  }

  validaSenha(senha) {
    return bcryptjs.compare(senha, this.senha_hash);
  }
}
