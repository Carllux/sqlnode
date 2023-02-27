import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController';

const router = new Router();

router.post('/', usuarioController.store);

export default router;

/*
index -> lista todos os registros - get
store/create - cria um novo registro - post
delete - apaga um registro - delete
show - mostra um registro - get
update - atualiza um registro - patch/put
*/
