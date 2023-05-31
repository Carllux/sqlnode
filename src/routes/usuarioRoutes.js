import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', usuarioController.store);
router.get('/', loginRequired, usuarioController.index);
router.get('/:id', loginRequired, usuarioController.show);
router.patch('/:id', loginRequired, usuarioController.update);
router.delete('/:id', loginRequired, usuarioController.delete);

export default router;
