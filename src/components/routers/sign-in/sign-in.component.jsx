import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../../utils/firebase/firebase.utils";
import SignupForm from '../../sign-up-form/sign-up-form.component'
import './sign-in.styles.scss'

const SignIn = () => {
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

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    // const logGoogleRedirectUser = async () => {
    //    await signInWithGoogleRedirect();
    // }
    return (<div className='sign-in-container'>
        <div className='sign-in-section'>
            <h1>
                I already have an account
            </h1>
            <h2>
                Sign in with your email and password
            </h2>
            <div className="input-container">
                <input type="email" key="email" required/>
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-container">
                <input type="password" key="password" required/>
                <label htmlFor="password">Password</label>
            </div>
            <button onClick={logGoogleUser}>
                Sign in with Google
            </button>
            <SignupForm/>
        </div>
    </div>)
}

export default SignIn;