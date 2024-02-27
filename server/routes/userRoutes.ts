import router from 'express';
import { deleteImage, getAllImages, uploadImage } from '../controllers';
import { uploadHandler} from '../utils/multer'
import { Authenticate } from '../middlewares/authMiddlewares';
const userRoutes = router.Router();

userRoutes.post('/upload',Authenticate ,uploadHandler, uploadImage);
userRoutes.get('/all',Authenticate, getAllImages);
userRoutes.delete('/delete/:id',Authenticate, deleteImage);

export { userRoutes};