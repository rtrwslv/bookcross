import styles from "./styles.module.css";

import logo from "../../Assets/logo.png";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
    const location = useLocation();
    return (
        <div className={styles.wrap}>
            <div className={styles.titleContainer}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <p className={styles.title}>БУККРОССИНГ</p>
            </div>

            <div className={styles.navContainer}>
                <Link 
                    className={`${styles.navP} ${location.pathname === "/showcase" ? styles.active : ""}`} 
                    to="/showcase"
                >
                    КАТАЛОГ
                </Link>
                <Link 
                    className={`${styles.navP} ${location.pathname === "/storage" ? styles.active : ""}`} 
                    to="/storage"
                >
                    КНИГИ НА РУКАХ
                </Link>
                <Link 
                    className={`${styles.navP} ${location.pathname === "/offer" ? styles.active : ""}`} 
                    to="/offer"
                >
                    ПРЕДЛОЖИТЬ КНИГУ
                </Link>
            </div>

            <div className={styles.inputContainer}>
                <label className={styles.searchLabel}>
                    <input type="text" placeholder="Поиск" className={styles.search} />
                </label>
            </div>
        </div>
    );
};
