import SignupForm from '../../sign-up-form/sign-up-form.component'
import './authentication.styles.scss'
import SignInForm from "../../sign-in-form/sign-in-form.component";

const Authentication = () => {
    return (<div className='authentication-container'>
        <SignInForm/>
        <SignupForm/>
    </div>)
}

export default Authentication;