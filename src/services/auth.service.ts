import bcrypt from 'bcrypt';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

import constants from '../constants';
import { UserModel } from '../models/user.model';
import { SignInPayload, SignUpPayload } from '../types/service/auth.service.d';

export const authService = {
  signUp: async (payload: SignUpPayload, res: Response) => {
    const { email, role, password } = payload;

    // Assume 1 user can register a same email with different roles
    let user = await UserModel.findOne({ email, role });
    if (user) {
      return res.status(400).json({
        message: constants.ERROR_MESSAGE.DUPLICATE_EMAIL_ADDRESS,
        fields: ['email'],
      });
    } else {
      user = new UserModel();
      user.email = email;
      user.role = role;

      // Hashing password before saving
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const token = jwt.sign(
        { objectId: user.id, email, role },
        constants.TOKEN_SETTING.SECRET,
        {
          expiresIn: constants.TOKEN_SETTING.EXPIRES_IN,
        }
      );

      return res.status(201).json({ email, role, token });
    }
  },

  signIn: async (payload: SignInPayload, res: Response) => {
    const { email, role, password } = payload;

    const user = await UserModel.findOne({ email, role }).lean();
    if (!user) {
      return res.status(400).json({
        message: constants.ERROR_MESSAGE.INVALID_EMAIL_PASSWORD,
      });
    } else {
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return res.status(400).json({
          message: constants.ERROR_MESSAGE.INVALID_EMAIL_PASSWORD,
        });
      }

      const token = jwt.sign(
        { objectId: user._id.toString(), email, role },
        constants.TOKEN_SETTING.SECRET,
        {
          expiresIn: constants.TOKEN_SETTING.EXPIRES_IN,
        }
      );

      return res.status(200).json({ email, role, token });
    }
  },
};
