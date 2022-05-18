import joi from 'joi';
import jwt from 'jsonwebtoken'
import e, { Request, Response } from 'express';
import userModel from '../model/user.model';
import bcrypt, { hash } from 'bcrypt';
import services from '../services/user.services';
const userServices = new services();



export default class UserController {

    // create new users
    async newUser(req: Request, res: Response) {
        try {

            //joi validation
            const schema = joi.object({
                name: joi.string().required(),
                age: joi.number().required(),
                tech: joi.string().required(),
                email: joi.string().required(),
                password: joi.string().required(),
            });

            const params = schema.validate(req.body, { abortEarly: false });

            if (params.error) {
                res.status(400).send({ error: params.error.message })
            }
              //email exist validation
        let emailExist = await userModel.find({ email: params.value.email })
        if (emailExist?.length != 0) {
            return res.status(400).send({ message: 'email already exists' })
        }

            let userInput = {
                name: params.value.name,
                age: params.value.age,
                tech: params.value.tech,
                email: params.value.email,
                password: params.value.password,
            }

            //password hash
            userInput.password = await bcrypt.hash(userInput.password, 10)

            //create user
            let user = await userServices.createUser(userInput);
            user.save();
            res.status(200).send({ message: 'user created', id: user._id })
        } catch (error) {
            res.status(400).send({ message: 'Service failed' })
        }
    }

    //get all user data
    async allUser(req: Request, res: Response) {
        let user
        try {
            user = await userServices.getAllUser()
            return res.status(200).send({ user: user })
        } catch (error) {
            return res.status(400).send({ message: 'Details not found' })
        }
    }

    // // //get by id
    async getById(req: Request, res: Response) {
        let id = req.params.id
        try {
            const userById = await userServices.userById(id)
            if (!userById) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.status(200).send(userById);
        } catch (error) {
            return res.status(500).send({ message: 'User not found' });
        }
    }

    // //update by id
    async updateById(req: Request, res: Response) {
        try {
            let id = req.params.id;
            let data: any = req.body;
            const byId = await userServices.updateData(id, data);
            if (byId) {
                res.status(200).send({ message: 'User updated' });
            } else {
                res.status(404).send({ meassge: 'User not found' });
            }
        } catch (error) {
            console.log(error)
        }
    }

    // //delete user by id
    async deleteUser(req: Request, res: Response) {
        try {
            let id = req.params.id;
            const deleteData = await userServices.deleteData(id)
            if (!req.params.id) {
                return res.status(404).send({ message: 'user not found' });
            }
            res.status(200).send({ message: 'user deleted' });
        } catch (error) {
            res.status(500).send(error)
        }
    }

    //login
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            let user = await userServices.getUserByEmail(email)
            if (user) {
                const isValidPassword = await bcrypt.compare(password, user.password)
                if (isValidPassword) {
                    //generate token
                    let secretKey: any = process.env.SECRET_KEY;
                    var token = jwt.sign({ _id: '6283352e5ff73c01fbf87932' }, secretKey,{
                        expiresIn: "1h",
                      });
                    return res.status(200).send({ token: token, message: 'Login Successful' })
                } else {
                    return res.status(400).send({ message: 'invalid credential' })
                }
            } else {
                return res.status(400).send({ message: 'invalid credential' })
            }
        } catch (error) {
            return res.status(400).send({ message: 'invalid credential' })
        }
    }
}

