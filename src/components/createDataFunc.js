import { checkForm, checkUserCreateForm } from "./Forms/Validation";

export const createContactFunc = (id, userId, setNameError, setIsNameError, setPhoneError,
    setIsPhoneError) => {

    const name = document.querySelector('#name').value
    const phone = document.querySelector('#phone').value
    /**
    * validation part start
    */
    const [name_error, phone_error] = checkForm(name, phone)
    if (name_error || phone_error) {
        if (name_error) {
            setNameError(name_error);
            setIsNameError(true);
        } else {
            setNameError(name_error);
            setIsNameError(false);
        }
        if (phone_error) {
            setPhoneError(phone_error);
            setIsPhoneError(true);
        } else {
            setPhoneError(phone_error);
            setIsPhoneError(false);
        }
        return
    }
    setNameError(name_error);
    setIsNameError(false);
    setPhoneError(phone_error);
    setIsPhoneError(false);
    /**
    * validation part end
    */
    const contactObj = {
        "id": id,
        "user_id": userId,
        "name": name,
        "phone": phone
    }
    return contactObj
}


export const createUserFunc = (id, setEmailError, setIsEmailError, setPasswordError,
    setIsPasswordError) => {

    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    /**
    * validation part start
    */
    const [email_error, password_error] = checkUserCreateForm(email, password)
    if (email_error || password_error) {
        if (email_error) {
            setEmailError(email_error);
            setIsEmailError(true);
        } else {
            setEmailError(email_error);
            setIsEmailError(false);
        }
        if (password_error) {
            setPasswordError(password_error);
            setIsPasswordError(true);
        } else {
            setPasswordError(password_error);
            setIsPasswordError(false);
        }
        return
    }
    setEmailError(email_error);
    setIsEmailError(false);
    setPasswordError(password_error);
    setIsPasswordError(false);
    /**
    * validation part end
    */
    const newUser = {
        "id": id,
        "email": email,
        "password": password
    }
    return newUser
}


