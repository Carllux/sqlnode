import  from '../models/';

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

export default new nomeController();
