import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Header } from "../../Components/Header/Header";
import { BookCard } from "../../Components/BookCard/BookCard";
import { useNavigate } from "react-router-dom";
import { Category } from "../../Interfaces/Category";
import { Book } from "../../Interfaces/Book";

export const Storage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loadingBooks, setLoadingBooks] = useState<boolean>(true);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);

    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/custom/api/v1/category/all");
                if (!response.ok) {
                    throw new Error("Ошибка при загрузке категорий");
                }
                const data = await response.json();
                if (data.success) {
                    setCategories(data.body);
                } else {
                    throw new Error("Ошибка в ответе сервера");
                }
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Произошла неизвестная ошибка");
            } finally {
                setLoadingCategories(false);
            }
        };

        const fetchUserBookings = async () => {
            if (!userId) return;
            try {
                const response = await fetch(`http://localhost:8080/custom/api/v1/bookings/user/${userId}/active`);
                if (!response.ok) {
                    throw new Error("Ошибка при загрузке броней");
                }
                const data = await response.json();
                if (data.success) {
                    const bookIds = data.body.map((booking: { bookId: string }) => booking.bookId);
                    if (bookIds.length === 0) {
                        setLoading(false);
                    }
                    const bookPromises = bookIds.map((bookId: string) =>
                        fetch(`http://localhost:8080/custom/api/v1/books/${bookId}`).then((res) => res.json())
                    );
                    const bookData = await Promise.all(bookPromises);
                    const books = bookData.map((book: { success: boolean; body: Book }) => book.body);
                    setBooks(books);
                    setFilteredBooks(books);
                } else {
                    throw new Error("Ошибка в ответе сервера");
                }
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Произошла неизвестная ошибка");
            } finally {
                setLoadingBooks(false);
            }
        };

        fetchCategories();
        fetchUserBookings();
    }, [userId]);

    useEffect(() => {
        if (!loadingBooks && !loadingCategories) {
            setLoading(false);
        }
    }, [loadingBooks, loadingCategories]);

    const handleCategoryClick = (categoryId: string) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
            setFilteredBooks(books); // Показываем все книги
        } else {
            setSelectedCategory(categoryId);
            setFilteredBooks(books.filter((book) => book.category.id === categoryId)); // Фильтруем книги по категории
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = books.filter((book) =>
            book.name.toLowerCase().includes(query)
        );
        setFilteredBooks(filtered);
    };

    if (error) {
        return <div>Произошла ошибка: {error}</div>;
    }

    if (loading) {
        return (
            <div>
                <Header disableSearch={false} onSearch={handleSearch} searchQuery={searchQuery} />
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                </div>
            </div>
        );
    }

    if (!userId) {
        return <div>Вы не авторизованы</div>;
    }

    if (books.length === 0) {
        return <div>У вас нет забронированных книг</div>;
    }

    return (
        <div>
            <Header disableSearch={false} onSearch={handleSearch} searchQuery={searchQuery} />
            <div className={styles.mainContainer}>
                <div className={styles.filterContainer}>
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className={styles.filter}
                            onClick={() => handleCategoryClick(cat.id)}
                            style={{
                                backgroundColor: selectedCategory === cat.id ? "#121945" : "transparent",
                                color: selectedCategory === cat.id ? "#fff" : "#000",
                                cursor: "pointer",
                                padding: "8px 12px",
                                borderRadius: "5px"
                            }}
                        >
                            {cat.name}
                        </div>
                    ))}
                </div>
                <div className={styles.bookSection}>
                    {filteredBooks.map((book) => (
                        <div key={book.id} onClick={() => navigate(`/book/${book.id}`)} className={styles.book}>
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
