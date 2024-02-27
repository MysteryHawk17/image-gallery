import { User } from '../models';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserRegister } from '../dto/user.dto';
export const register = async (req: Request, res: Response) => {
    const { username, email, password } = <UserRegister>req.body;
    try {

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            salt
        });
        await newUser.save();
        if (JWT_SECRET == undefined) {
            throw new Error('JWT_SECRET is not defined');
        }
        const payload = { _id: newUser._id };
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ message: 'User created', token: token });
            }
        );


    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

}

export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const hashedPassword = await bcrypt.hash(password, user.salt);
        if (hashedPassword !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (JWT_SECRET == undefined) {
            throw new Error('JWT_SECRET is not defined');
        }
        const payload = { _id: user._id }; 
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ message: 'Login', token: token });
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

