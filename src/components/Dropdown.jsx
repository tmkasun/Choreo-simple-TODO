import { useEffect, useState } from 'react';
import '../styles/Dropdown.css';

export default function Dropdown(props) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const windowClicker = function (event) {
            if (!event.target.matches(".dropbtn")) {
                setShow(false);
            }
        };
        window.addEventListener('click', windowClicker, false);
        return () => {
            window.removeEventListener('click', windowClicker, false);
        }
    }, [])
    return (
        <>
            <div class="dropdown">
                <ul class="dropbtn icons btn-right" onClick={() => setShow(true)}>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                {true && (<div class="dropdown-content">
                    <a href="#home">Done</a>
                    <a href="#about">Start</a>
                </div>)}
            </div>
        </>
    )
}