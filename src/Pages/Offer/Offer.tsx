import styles from "./styles.module.css";

import { Header } from "../../Components/Header/Header";

export const Offer = () => {
    return(
        <>
        <Header disableSearch={true} searchQuery="" onSearch={() => {}} />
        <div className={styles.container}>
            <div>
            <p className={styles.text}>
                Заполните поля, чтобы <br /> предложить книгу для буккроссинга
            </p>
            <div className={styles.inputContainer}>
                <input className={styles.inputLow} placeholder="Введите название..." />
                <input className={styles.inputLow} placeholder="Введите автора..." />
                <textarea className={styles.inputHigh} placeholder="Введите описание..."></textarea>
                <input className={styles.inputLow} placeholder="Сфотографируйте книгу" />
            </div>
            </div>
        </div>
        </>
    )
}