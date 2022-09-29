import '../styles/Landing.css'
import LoginButton from './LoginButton';

export default function Landing() {
    return (
        <div className="landing-wrapper">
            <div className="card divider"><LoginButton /></div>
            <div className="card">Anonymous</div>
        </div>
    );
}