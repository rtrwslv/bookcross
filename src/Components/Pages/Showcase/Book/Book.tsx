import styles from "./styles.module.css";

import { Header } from "../../../Header/Header";

export const Book = () => {
    const book = {
        name: "Книжечка книженция",
        tag: "образовательные",
        author: "Какой-то мужик",
        pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
        availible: true,
        description:
            "Трудовой кодекс Российской Федерации — кодифицированный законодательный акт о труде, Федеральный закон № 197-ФЗ от 30 декабря 2001 года. Введён в действие с 1 февраля 2002 года вместо действующего до него Кодекса законов о труде РСФСР от 1971 года.",
    };

    return (
        <>
            <Header />
            <div className={styles.mainContainer}>
                <div>
                    <img src={book.pic} alt={book.name} className={styles.picSection} />
                </div>
                <div className={styles.descContainer}>
                    <div className={styles.bookTag}>#{book.tag}</div>
                    <div className={styles.bookAuthor}>{book.author}</div>
                    <div className={styles.bookName}>{book.name}</div>
                    <div className={styles.bookDesc}>{book.description}</div>
                </div>
            </div>
        </>
    );
};
