# Contact List APP
#### Тестовое задание
[Текст задания](https://talantix.ru/ats/testTasks/6702815e227945caad189582446e2d91 "Текст задания")

## Установка
Для начала работы необходимо проинициализировать пакеты, необходимые для работы приложения:  
```npm install ```  
Далее запустить сервер с react-приложением:  
```npm start ```  
Запустить json-server с данными для работы приложения:  
```json-server --no-cors --port 3004 database.json```  

## Использование
#### Регистрация (создание) нового аккаунта:
На странице Login перейти по ссылке Registrate и создать нового пользователя, 
введя корректный email и пароль, содержащий не менее 4 символов.
После успешной регистрации появится сообщение, что пользователь создан. Нужно перейти на страницу входа Login и войти под данным пользователем, выполнив login.

#### Вход:
На странице Login войти под раннее созданным пользователем или использовать данные тестового пользователя для входа:
```
email: test@test.com
password: 12345678
```

#### Список контактов:
После успешного входа на странице отобразится список контактов пользователя ( или запись о том, что у данного пользователя еще нет контактов)

#### Создание нового контакта:
Для создания нового контакта необходимо нажать на кнопку Create contact и заполнить поля валидными данными, затем нажать на кнопку Save contact.
После этого произойдет автоматическое обновление списка контактов

#### Редактирование контакта:
Для редактирование контакта перейтите по кнопке с иконкой карандаша и отредактируйте поля контакта, они должны быть валидными после редактирования,
после чего список контактов будет обновлен

#### Удаление контакта:
Для удаления контакта необходимо нажать на кнопку с иконкой корзины и контакт будет удален, а список контактов обновлен

