import {useState} from 'react'

import {
    createUserDocumentFromAuth,
    signAuthUserWithEmailAndPass,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

const SignInForm = () => {
    //LOGIN BY REDIRECT WAY
    // useEffect( () => {
    //     (async function getRedirectResponse(){
    //         const result =  await getRedirectResult(auth)
    //         console.log(result)
    //         if(result)
    //             await createUserDocumentFromAuth(result.user)
    //     })()
    //
    // }, [])

    // const logGoogleRedirectUser = async () => {
    //    await signInWithGoogleRedirect();
    // }

    const logGoogleUser = async () => {
       await signInWithGooglePopup();
    }
    const defaultFormFields = {
        email: '',
        password: '',
    }
    const [formFields, setFormFields] = useState(defaultFormFields);

    const {email, password} = formFields;
    const onChangeHandler = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const resetTheForm = () => {
        setFormFields(defaultFormFields);
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            const {user} = await signAuthUserWithEmailAndPass(email, password);
            resetTheForm()
        } catch (e) {
            switch (e.code) {
                case 'auth/wrong-password':
                    alert('username or password is incorrect')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                default:
                    console.log('user creation encounter an error', e)
            }
        }
    }
    return (
        <div className='sign-in-container'>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitHandler}>
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

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>

                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm