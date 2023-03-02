import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router = new Router();

router.post('/', tokenController.store);
// router.get('/', tokenController.index);
// router.get('/:id', tokenController.show);
// router.put('/:id', tokenController.update);
// router.delete('/:id', tokenController.delete);
// router.put('/:id', tokenController.update);

export default router;
