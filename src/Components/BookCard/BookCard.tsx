import { Book } from "../../Interfaces/Book"
import styles from "./styles.module.css";

interface BookProps {
    book: Book;
}

export const BookCard = ({ book }: BookProps) => {
    return (
        <div className={styles.bookCard}>
            <div className={styles.bookTag}>#{book.category.name}</div>
            <img src={book.cover} alt={book.name} className={styles.cover}/>
            <p className={styles.bookAuthor}>{book.author}</p>
            <p className={styles.bookName}>{book.name}</p>
            <p className={styles.bookAvailible}>{book.isReserved ? "Недоступно для брони" : "Доступно для брони"}</p>
        </div>
    )
}
