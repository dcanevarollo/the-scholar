import { User } from "src/app/core/shared/user.model";

export class Auth {

  constructor(public token: string, public user: User) { }

}
