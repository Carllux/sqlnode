import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController';

const router = new Router();

router.post('/', usuarioController.store);
router.get('/', usuarioController.index);
router.get('/:id', usuarioController.show);
router.put('/:id', usuarioController.update);
// router.put('/:id', usuarioController.update);

export default router;
