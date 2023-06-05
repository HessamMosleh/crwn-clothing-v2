import {useState} from 'react'

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss'
import Button from "../button/button.component";
const SignupForm = () => {
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, confirmPassword, password} = formFields;
    const onChangeHandler = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const resetTheForm = () => {
        setFormFields(defaultFormFields);
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword)
            return alert('Password not equal')

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, {displayName});
            resetTheForm()
        } catch (e) {
            if (e.code === 'auth/email-already-in-use')
                alert('cannot create user, email is already')

            console.log('user creation encounter an error', e)
        }
    }
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput label='Display Name'
                           type='text'
                           required
                           onChange={onChangeHandler}
                           name='displayName'
                           value={displayName}
                />
                <FormInput
                    label='Email'
                    type='email'
                    required
                    name='email'
                    onChange={onChangeHandler}
                    value={email}/>
                <FormInput
                    label='Password'
                    type='password'
                    required
                    name='password'
                    onChange={onChangeHandler}
                    value={password}/>
                <FormInput
                    label='Confirm Password'
                    type='password'
                    required
                    name='confirmPassword'
                    onChange={onChangeHandler}
                    value={confirmPassword}/>
                <Button>Sign up</Button>
            </form>
        </div>
    )
}

export default SignupForm