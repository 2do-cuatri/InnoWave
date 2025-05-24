import express from 'express';

import * as authController from '../controllers/auth.controller.js';
import { authenticate } from '../auth/authenticate.js';

const router = express.Router();

router.post('/signin', authController.signIn)
router.post('/signout', authController.signOut)
router.post('/signup', authController.signUp)
// Usado para validar si el usuario se encuentra logeado. Se pasa por el middleware y si esta todo OK se devuelve 200.
router.post('/validate', authenticate, (req, res) => res.sendStatus(200))

export default router;