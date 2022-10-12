import { useEffect, useState } from 'react';
import '../styles/Dropdown.css';

/**
 * Ref: https://codepen.io/danimerida2000/pen/wVXegX
 * @param {*} props 
 * @returns 
 */
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
            <div className="dropdown">
                <ul className="dropbtn icons btn-right" onClick={() => setShow(true)}>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                {show && (<div className="dropdown-content">
                    <a href="#home">Done</a>
                    <a href="#about">Start</a>
                </div>)}
            </div>
        </>
    )
}