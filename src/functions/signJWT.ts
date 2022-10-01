import jwt from 'jsonwebtoken';
import config from '../config/config';
import { IUserData } from '../models/user';

const signJWT = (
  user: IUserData,
  callback: (error: Error | null, token: string | null) => void
) => {
  var timeSinchEpoch = new Date().getTime();
  var expireTime = timeSinchEpoch + Number(config.token.expireTime) * 100000;
  var expirationTimeInSeconds = Math.floor(expireTime / 1000);

  console.log('Attemp to signin token fro ' + user.email);

  try {
    jwt.sign(
      {
        email: user.email
      },
      config.token.secret,
      {
        issuer: config.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (err) {
    console.log("sign jwt failed "+err)
    callback(Error(`${err}`),null)
  }
};


export default signJWT;