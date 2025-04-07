import express from 'express';
import { signUp, logIn } from '../controllers/authController';

// dotenv.config();

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const user = await Profile.findOne({
//     where: { email },
//   });

//   if (!user) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }

//   const passwordIsValid = await bcrypt.compare(password, user.password);
//   if (!passwordIsValid) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }

//   const secretKey = process.env.JWT_SECRET_KEY || '';

//   const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

//   return res.json({ token });

// }

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);

export default router;
