import { NextFunction } from 'connect';
import jwt from 'jsonwebtoken';

export default class Middleware {


    //Token authentication
    async auth(req: any, res: any, next: NextFunction) {
        try {
            const tokenString = req.headers.authorization

            let token = tokenString.replace('Bearer ', "")
            let secretKey: any = process.env.SECRET_KEY

            const verifyUser: any = jwt.verify(token, secretKey)
            if (!verifyUser) {
                req.userId = verifyUser._id;
                res.status(200).send({ message: "User Authorized" })
            } else {
                next();
            }
        } catch (error) {
            res.status(400).send({ message: "User Unauthorized" })
        }
    }
}