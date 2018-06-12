import * as express from 'express'
import UserService from '../services/UserService';

/**
 * User Routes
 * -------------------------
 * Handle requests from /users
 */
export default class UserRouter {
    private userService: UserService;

    constructor(userService:UserService) {
        this.userService = this.userService;
    }

    getRouter() {
        let router = express.Router();
        router.get("/", this.get.bind(this));//binds call to current class
        // router.post()
        return router;//passes data back to front
    }

    get(req:express.Request, res:express.Response) {//checks if user's access token matches with the one in 
        return this.userService.list()//responds with user's data
            .then((data) => {//passes data back to getRouter
                res.json(data)
            })
            .catch((err:express.Errback) => {
                res.status(500).json(err)
            });
    }
}