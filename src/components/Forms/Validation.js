export const checkForm = (name, phone) => {

    const re_phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/

    let phone_error = "";
    let name_error = "";

    if (!name.length) {
        name_error = "*введите имя"
    }
    if (phone === "") {
        phone_error = "*введите телефон"
    } else if (phone.length > 0) {

        if (!re_phone.test(String(phone))) {
            phone_error = "*введите корректный номер телефона"
        }
    }

    return [name_error, phone_error]
}

export const checkUserCreateForm = (email, password) => {
    let email_error = "";
    let password_error = "";

    const re_mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "") {
        email_error = "*введите email"
    } else if (email.length > 0) {
        if (!re_mail.test(String(email).toLowerCase())) {
            email_error = "*введите корректный email"
        }
    }
    if (password === "") {
        password_error = "*введите пароль"
    } else if (password.length < 4) {
        password_error = "*пароль должен содержать больше 4 символов"
    }

    return [email_error, password_error]
}