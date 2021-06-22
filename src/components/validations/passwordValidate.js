import * as yup from 'yup';

export const PasswordSchema = yup.object().shape({
    password:yup
        .string()
        .required("Intruduce Nueva contraseña")
        .matches(
            /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
        )
})