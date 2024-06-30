import BaseRoutes from "../BaseRoutes";
import validate from "../../middlewares/ValidatorMiddleware";
import { createUserValidator, getUserValidator, updateUserValidator } from "../../validations/UserValidator";
import { UserController } from "../../controllers/UserController";

export class UserRoutes extends BaseRoutes {
  private _UserController: UserController;

  constructor(UserController: UserController) {
    super();
    this._UserController = UserController;
  }


  public routes(): void {
    // this.router.post('/login', this._UserController.login);
    // this.router.post('/logout', this._UserController.logout);
    // this.router.get('/refresh-token', this._UserController.refreshToken);


    this.router.get('/', this._UserController.findAll);
    this.router.get('/:user_id', validate(getUserValidator), this._UserController.findById);
    this.router.put('/:user_id', validate(updateUserValidator), this._UserController.update);
    this.router.delete('delete', validate(getUserValidator),this._UserController.delete);
    this.router.post('/create',validate(createUserValidator), this._UserController.create);
  }
}
