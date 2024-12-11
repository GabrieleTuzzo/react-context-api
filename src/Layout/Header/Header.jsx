import { NavLink } from 'react-router-dom';
import style from './Header.module.css';

export default function Header() {
    return (
        <header>
            <nav>
                <ul className={style.MainHeader}>
                    <li>
                        <NavLink to="/">Homepage</NavLink>
                    </li>
                    <li>
                        <NavLink to="/chisiamo">Chi Siamo</NavLink>
                    </li>
                    <li>
                        <NavLink to="/posts">Post List</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
