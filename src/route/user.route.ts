import Controller from '../controller/user.controller';
import middleware from '../middleware/user.middleware';
import express from 'express';
export const route = express.Router();
const userController: any = new Controller();
const usermiddleware = new middleware();


// //create user
route.post("/user/create",usermiddleware.auth, userController.newUser);

// // //get all data
route.get('/user', userController.allUser);

// //get by id
route.get("/user/:id", userController.getById);

// //delete
route.delete('/delete/:id',userController.deleteUser);

// //update
route.patch('/user/update/:id', userController.updateById);

//login
route.post('/user/login', userController.login);

