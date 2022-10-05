import '../styles/Landing.css'
import AnonymousLogin from './Buttons/AnonymousLogin';
import GoogleLogin from './Buttons/GoogleLogin';

export default function Landing() {
    return (
        <div className="landing-wrapper">
            <div className='login-card'>
                <div className="card divider"><GoogleLogin /></div>
                <div className="card"><AnonymousLogin /></div>
            </div>
        </div>
    );
}