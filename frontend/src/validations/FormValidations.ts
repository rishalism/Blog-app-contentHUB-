import * as yup from 'yup'

export const signupSchema = yup.object().shape({
    name: yup.string()
        .min(5, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
        .required('Name is required'),
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),

})



export const LoginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
        .required('Password is required')
})

export const NewPostSchema = yup.object().shape({
    title: yup.string()
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title cannot be longer than 100 characters')
        .required('Title is required'),

    description: yup.string()
        .min(20, 'Description must be at least 20 characters')
        .max(1000, 'Description cannot be longer than 500 characters')
        .required('Description is required'),

});
