import BaseRoutes from "../BaseRoutes";
import { UserService } from "../../services/UserService";
import { UserController } from "../../controllers/UserController";
import { UserRoutes } from "./UserRoutes";
import { UserRepository } from "../../repositories/UserRepository";


//Menu CRM total
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRoutes = new UserRoutes(userController);
userRoutes.routes();
//End menu CRM total

export class ApiV1 extends BaseRoutes {
    constructor() {
        super()
    }
    
    
    public routes(): void {
        const appname = String(process.env.APP_NAME) ?? 'user_managements'
        this.router.use(`/v1/${appname}`, userRoutes.router)
    }
}
