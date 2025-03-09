import styles from "./styles.module.css";

import { Header } from "../../Header/Header";
import { BookCard } from "../../BookCard/BookCard";
import { useNavigate } from "react-router-dom";

export const Showcase = () => {
    const categories = ["Художественная литература", "Образовательная литература"];
    const books = [
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
        {
            name: "Книжечка книженция",
            tag: "образовательные",
            author: "Какой-то мужик",
            pic: "https://ir.ozone.ru/s3/multimedia-1-9/c1000/7133532381.jpg",
            availible: true,
        },
    ];

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/book");
    };

    return (
        <div>
            <Header />
            <div className={styles.mainContainer}>
                <div className={styles.filterContainer}>
                    {categories.map((cat, index) => (
                        <div key={index} className={styles.filter}>
                            {cat}
                        </div>
                    ))}
                </div>
                <div className={styles.bookSection}>
                    {books.map((book) => (
                        <div key={book.name} onClick={handleClick} className={styles.book}>
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
