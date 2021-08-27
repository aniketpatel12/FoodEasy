import { checkSpecial, notEmpty, ValidateEmail, ValidatePassword, ValidatePhone } from "../../../utils/functions";

export const LoginValidation = User => {

    if(ValidateEmail(User.username) && notEmpty(User.password,"Password"))
            return true
    return false
}

export const RegiterValidation = User => {

    if(checkSpecial(User.username) 
        && ValidateEmail(User.email) 
        && ValidatePhone(User.phone) 
        && ValidatePassword(User.password))
            return true
    return false
}