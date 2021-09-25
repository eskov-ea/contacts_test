export const checkForm = (name, phone) => {

    const re_phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/

    let phone_error = "";
    let name_error = "";

    if (!name.length) {
        name_error = "*введите имя"
    }
    if (phone == "") {
        phone_error = "*введите телефон"
    } else if (phone.length > 0) {

        if (!re_phone.test(String(phone))) {
            phone_error = "*введите корректный номер телефона"
        }
    }

    return [name_error, phone_error]
}