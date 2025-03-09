import styles from "./styles.module.css";

import logo from "../../Assets/logo.png";
import { Link } from "react-router";

export const Header = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.titleContainer}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <p className={styles.title}>БУККРОССИНГ</p>
            </div>

            <div className={styles.navContainer}>
                <Link className={styles.navP} to="/showcase">КАТАЛОГ</Link>
                <Link className={styles.navP} to="/catalogue">КНИГИ НА РУКАХ</Link>
                <Link className={styles.navP} to="/catalogue">ПРЕДЛОЖИТЬ КНИГУ</Link>
            </div>

            <div className={styles.inputContainer}>
                <label className={styles.searchLabel}>
                    <input type="text" placeholder="Поиск" className={styles.search} />
                </label>
            </div>
        </div>
    );
};
