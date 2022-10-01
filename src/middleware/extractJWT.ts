import {Request,Response,NextFunction} from "express"
import config from '../config/config'

import jwt from 'jsonwebtoken';

const extractJWT = (__req:Request,__res:Response,__next:NextFunction)=>{
    console.log("extract jwt function")

    let token = __req.headers.authorization?.split(" ")[1];
 
    if (token) {
        jwt.verify(token, config.token.secret, (error:any, decoded:any) => {
            if (error) {
                return __res.status(404).json({
                    message: error,
                    error
                });
            } else {
                __res.locals.jwt = decoded;
                __next();
            }
        });
    } else {
        return __res.status(401).json({
            message: 'Unauthorized'
        });
    }
}

export default extractJWT