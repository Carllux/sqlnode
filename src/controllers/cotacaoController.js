import from '../models/';

class nomeController {
  async store(req, res) {
    try {

      res.status().json();
    } catch (error) {
      res.status(400).json(
        {
          errors: error.errors.map((err) => (err.message)),
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

export default new nomeController();
