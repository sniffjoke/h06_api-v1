import {User} from "../types/users.interface";
import * as jwt from 'jsonwebtoken';
import {SETTINGS} from "../settings";


export const authService = {

    createToken(user: User) {
         const token = jwt.sign(
            {_id: user._id},
            SETTINGS.VARIABLES.JWT_SECRET_ACCESS_TOKEN as string,
            {expiresIn: 60*60*1000}
        )

        return token
    }

}
