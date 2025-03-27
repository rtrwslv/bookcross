import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { Header } from "../../Components/Header/Header";
import { Calendar } from "../../Components/Calendar/Calendar";
import { Book as BookData } from "../../Interfaces/Book";

export const Book = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:8080/custom/api/v1/books/${id}`);
        if (!response.ok) {
          throw new Error("Ошибка загрузки книги");
        }
        const data = await response.json();
        if (data.success) {
          setBook(data.body);
        } else {
          throw new Error("Ошибка в ответе сервера");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);

    if (date && book?.maxReservationPeriod) {
      const maxReservationDate = new Date(date);
      maxReservationDate.setDate(date.getDate() + book.maxReservationPeriod);

      if (endDate && endDate > maxReservationDate) {
        alert(`Вы можете забрать книгу не более чем на ${book.maxReservationPeriod} дней.`);
        setEndDate(null);
      }
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);

    if (startDate && date && book?.maxReservationPeriod) {
      const maxReservationDate = new Date(startDate);
      maxReservationDate.setDate(startDate.getDate() + book.maxReservationPeriod);

      if (date > maxReservationDate) {
        alert(`Вы можете забрать книгу не более чем на ${book.maxReservationPeriod} дней.`);
        setEndDate(null);
      }
    }
  };

  const isSubmitDisabled = !(startDate && endDate && endDate > startDate && endDate <= new Date(startDate.getTime() + (book?.maxReservationPeriod || 0) * 24 * 60 * 60 * 1000));

  const handleReservation = async () => {
    if (isSubmitDisabled) return;

    const bookRequest = {
      bookId: book?.id,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:8080/custom/api/v1/books/${id}/reserveBook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Добавляем токен из localStorage
        },
        body: JSON.stringify(bookRequest),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert("Вы взяли книгу");
      } else {
        throw new Error(data.message || "Не удалось зарезервировать книгу");
      }
    } catch (err) {
      alert("Произошла ошибка: " + (err instanceof Error ? err.message : "Неизвестная ошибка"));
    }
  };

  if (loading) {
    return (
      <>
        <Header disableSearch={true} searchQuery="" onSearch={() => {}} />
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      </>
    );
  }

  if (error) return <div>Ошибка: {error}</div>;
  if (!book) return <div>Книга не найдена</div>;

  return (
    <>
      <Header disableSearch={true} searchQuery="" onSearch={() => {}} />
      <section className={styles.mainContainer}>
        <img
          src={book.cover}
          alt={book.name}
          className={styles.picSection}
        />
        <article className={styles.descContainer}>
          <div className={styles.bookTag}>#{book.category.name}</div>
          <h2 className={styles.bookName}>{book.name}</h2>
          <p className={styles.bookAuthor}>{book.author}</p>
          <p className={styles.bookDesc}>{book.description}</p>

          <div className={styles.dateSelectionContainer}>
            <div className={styles.datePickerContainer}>
              <label className={styles.dateText}>Дата взятия</label>
              <Calendar
                selectedDate={startDate}
                onDateChange={handleStartDateChange}
                minDate={new Date()} // не допускаем выбора дат раньше текущей
              />
            </div>
            <div className={styles.datePickerContainer}>
              <label className={styles.dateText}>Дата возврата</label>
              <Calendar
                selectedDate={endDate}
                onDateChange={handleEndDateChange}
                minDate={startDate ? startDate : new Date()} // дата возврата должна быть не раньше даты взятия
              />
            </div>
          </div>

          <div
            className={isSubmitDisabled ? styles.buttonDisabled : styles.button}
            onClick={handleReservation} // Вызовем функцию для отправки запроса
          >
            Взять книгу
          </div>

          <div className={styles.bottomContainer}>
            <div className={styles.grid}>
              <span className={styles.pageNums}>{book.year}</span>
              <span className={styles.explanation}>год издания</span>
            </div>
            <div className={styles.vl}></div>
            <div className={styles.grid}>
              <span className={styles.pageNums}>{book.pageSize}</span>
              <span className={styles.explanation}>кол-во страниц</span>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};
