В Validators в user створила student.credentials.validator.js, який задає структуру імейлу і паролю по Joi. 
В middleware в user створила areCredentialsTrue.middleware.js, який перевіряє логінацію юзера - чи відповідає імейл і пароль значенням з бази даних.
В middleware/user/validation створила метод areCredentialsCorrect, який використовує student.credentials.validator.js,
На всі ендпоінти users/:id поставила validationUserMiddleware.areCredentialsCorrect для перевірки чи залогований юзер щоб зробити get, put або delete
