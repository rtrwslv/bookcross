import { IBook } from "../../Interfaces/Book"
import styles from "./styles.module.css";

interface BookProps {
    book: IBook;
}

export const BookCard = ({ book }: BookProps) => {
    return (
        <div className={styles.bookCard}>
            <div className={styles.bookTag}>#{book.tag}</div>
            <img src={book.pic} alt={book.name} className={styles.cover}/>
            <p className={styles.bookAuthor}>{book.author}</p>
            <p className={styles.bookName}>{book.name}</p>
            <p className={styles.bookAvailible}>{book.availible ? "Доступно для брони" : "На руках с ... по ..."}</p>
        </div>
    )
}
