import express from 'express';

// Controllers.
import * as usersController from '../controllers/users.controller.js';

// Constants.
import { HTTP_RESPONSE } from '../constants/common.constants.js';

// Initialise Express router.
const userRouter = express.Router();

// Create new User.
userRouter.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersController.createUser(email, password);
    res.status(HTTP_RESPONSE.CREATED).send(user);
});

// Read specific User by ID.
userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await usersController.getUser(id);
    res.send(user);
});


// Update User.
userRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await usersController.updateUser(id, email, password);
    res.status(HTTP_RESPONSE.OK).send(user);
});

// Delete User.
userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const note = await usersController.deleteUser(id);
    res.status(HTTP_RESPONSE.OK).send(note);
});

export default userRouter;