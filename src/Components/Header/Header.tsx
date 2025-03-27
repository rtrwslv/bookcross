import styles from "./styles.module.css";
import logo from "../../Assets/logo.png";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  disableSearch: boolean;  // Добавляем новый проп
}

export const Header = ({ onSearch, searchQuery, disableSearch }: HeaderProps) => {
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

      {/* Условие для блокировки поиска */}
      <div className={styles.inputContainer}>
        <label className={styles.searchLabel}>
          <input
            type="text"
            placeholder="Поиск"
            className={styles.search}
            value={searchQuery}
            onChange={disableSearch ? undefined : onSearch} // Если disableSearch = true, обработчик не срабатывает
            disabled={disableSearch} // Если disableSearch = true, поле поиска не активно
          />
        </label>
      </div>
    </div>
  );
};
