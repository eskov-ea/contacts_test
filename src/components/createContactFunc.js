import React from "react";
import { checkForm } from "./Forms/Validation";

export const createContactFunc = (id, setNameError, setIsNameError, setPhoneError,
    setIsPhoneError, setState, setCreateContact) => {

    const name = document.querySelector('#name').value
    const phone = document.querySelector('#phone').value
    // const id = props.state[props.state.length - 1].id + 1
    // const id = props.data.contacts[props.data.contacts.length - 1].id + 1

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
        "name": name,
        "phone": phone
    }
    return contactObj
    // props.data.push(contactObj)

    // setState(newContact)
    // setCreateContact(false)
}


