import router from 'express';
import { register, login } from '../controllers/authController';
const authRoutes = router();


authRoutes.post('/register', register);
authRoutes.post('/login', login);




export {authRoutes};
