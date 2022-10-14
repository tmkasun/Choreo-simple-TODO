import { useEffect, useRef, useState } from 'react';
import '../styles/Dropdown.css';

/**
 * Ref: https://codepen.io/danimerida2000/pen/wVXegX
 * @param {*} props 
 * @returns 
 */
export default function Dropdown(props) {
    const { onOpen, values, onChange } = props;
    const [show, setShow] = useState(false);
    const dropdownRef = useRef();
    useEffect(() => {
        if (onOpen) {
            onOpen(show);
        }
    }, [show, onOpen]);
    useEffect(() => {
        const windowClicker = function (event) {
            if (event.target !== dropdownRef.current) {
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
                <ul ref={dropdownRef} className="dropbtn icons btn-right" onClick={() => setShow(true)}>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                {show && (<div className="dropdown-content">
                    {values.map((value) => (<a onClick={() => onChange(value)} href="#">{value}</a>))}
                </div>)}
            </div>
        </>
    )
}