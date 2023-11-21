// server/src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/user';

// Función para registrar un nuevo usuario
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(400).json({ message: 'User already exists' });
       return;
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generar token JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string);

    // Enviar el token y la información del usuario
    res.json({ token, user: { id: newUser._id, username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Función para iniciar sesión
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
       res.status(401).json({ message: 'Invalid credentials' });
       
return;
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
       res.status(401).json({ message: 'Invalid credentials' });
       return;
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    // Enviar el token y la información del usuario
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Función para obtener información del usuario autenticado
export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    // El usuario se adjunta al objeto de solicitud durante la verificación del token
    const user = (req as any).user;

    // Enviar la información del usuario
    res.json({ user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error getting user info:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
