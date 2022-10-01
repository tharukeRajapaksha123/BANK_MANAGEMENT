import express,{ NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/user';
import signJWT from '../functions/signJWT';
import extractJWT from "../middleware/extractJWT";
const NAMESPACE = 'User';

const validateToken = (
  __req: Request,
  __res: Response,
  __next: NextFunction
) => {
  return __res.status(200).json({
    message: 'User Authorized'
  });
};
const register = (__req: Request, __res: Response, __next: NextFunction) => {
  let { email, password } = __req.body;

  bcryptjs.hash(password, 10, (hasError, hash) => {
    if (hasError)
      return __res.status(500).json({
        message: hasError.message,
        error: hasError
      });

    let _user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hash
    });

    return _user
      .save()
      .then((user) => {
        return __res.status(201).json({ user });
      })
      .catch((err) => {
        return __res.send(500).json({ message: `error ${err.message}` });
      });
  });
};
const login = (__req: Request, __res: Response, __next: NextFunction) => {
  let { email, password } = __req.body;

  User.find({ email }).exec((error, users) => {
    if (error)
      return __res
        .status(500)
        .json({ message: `login error ${error.message}` });
    if (users == null) return __res.status(400).json({ message: 'not found' });
    if (users.length !== 1) {
      return __res.status(401).json({ message: 'Unauthorized' });
    }

    bcryptjs.compare(password, users[0].password, (error, result) => {
      if (error)
        return __res
          .status(402)
          .json({ message: `Unauthorized ${error.message}` });
      else if (result) {
        signJWT(users[0], (_error, token) => {
          if (_error) {
            return __res
              .status(401)
              .json({ message: `Unauthorized ${_error}` });
          } else if (token) {
            return __res.status(200).json({
              message: 'Auth succesfull',
              token,
            });
          }
        });
      }
    });
  });
};

const getAllUsers = (__req: Request, __res: Response, __next: NextFunction) => {
  User.find()
    .select('-password')
    .exec()
    .then((users) => {
      return __res.status(200).json({
        users,
        count: users.length
      });
    })
    .catch((error) => {
      return __res.status(500).json(error);
    });
};

const test = (__req: Request, __res: Response) => {
  return __res.status(200).json({ message: 'worked' });
};



const router = express.Router();

router.get("/",test)
router.get("/validate", extractJWT,validateToken);
router.post("/register",register);
router.post("/login",login);
router.get("/get-all-users",extractJWT, getAllUsers);

export = router