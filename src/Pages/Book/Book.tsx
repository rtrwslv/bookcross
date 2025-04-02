import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { Header } from "../../Components/Header/Header";
import { Calendar } from "../../Components/Calendar/Calendar";
import { Book as BookData } from "../../Interfaces/Book";
import ReturnBookModal from "../../Components/ReturnBookModal/ReturnBookModal";

interface Reservation {
  id: string;
  userId: string;
  bookId: string;
  startTime: string;
  endTime: string;
  status: string;
  photo: string | null;
  comment?: string;
}

export const Book = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userHasBook, setUserHasBook] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    if (book?.isReserved && userId) {
      const checkUserReservation = async () => {
        try {
          const response = await fetch(`http://localhost:8080/custom/api/v1/bookings/user/${userId}/active`);
          const data = await response.json();
          if (response.ok && data.success) {
            setUserHasBook(data.body.some((reservation: Reservation) => reservation.bookId === id));
          }
        } catch (error) {
          console.error("Ошибка проверки бронирования пользователя", error);
        }
      };
      checkUserReservation();
    }
  }, [book, userId, id]);

  const handleReservation = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookRequest),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert("Вы взяли книгу");
        setBook((prevBook) => (prevBook ? { ...prevBook, isReserved: true } : null));
        setUserHasBook(true);
      } else {
        throw new Error(data.message || "Не удалось зарезервировать книгу");
      }
    } catch (err) {
      alert("Произошла ошибка: " + (err instanceof Error ? err.message : "Неизвестная ошибка"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnBook = async (fileRef: string, comment?: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const returnRequest = {
      bookId: book?.id,
      endDate: new Date().toISOString(),
      photoPath: fileRef,
      comment: comment || null
    };

    try {
      const response = await fetch(`http://localhost:8080/custom/api/v1/books/${id}/returnBook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(returnRequest),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert("Книга возвращена");
        setBook((prevBook) => (prevBook ? { ...prevBook, isReserved: false } : null));
        setUserHasBook(false);
      } else {
        throw new Error(data.message || "Не удалось вернуть книгу");
      }
    } catch (err) {
      alert("Произошла ошибка: " + (err instanceof Error ? err.message : "Неизвестная ошибка"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = !startDate || !endDate || isSubmitting;

  if (loading) {
    return (
      <>
        <Header disableSearch searchQuery="" onSearch={() => {}} />
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
      <Header disableSearch searchQuery="" onSearch={() => {}} />
      <section className={styles.mainContainer}>
        <img src={book.cover} alt={book.name} className={styles.picSection} />
        <article className={styles.descContainer}>
          <div className={styles.tagContainer}>
            <div className={styles.bookTag}>#{book.category.name}</div>
            {book.isReserved && <div className={styles.bookBooked}>На руках</div>}
          </div>
          <h2 className={styles.bookName}>{book.name}</h2>
          <p className={styles.bookAuthor}>{book.author}</p>
          <p className={styles.bookDesc}>{book.description}</p>
          {!book.isReserved ? (
            <>
              <div className={styles.dateSelectionContainer}>
                <div className={styles.datePickerContainer}>
                  <label className={styles.dateText}>Дата взятия</label>
                  <Calendar 
                    selectedDate={startDate} 
                    onDateChange={setStartDate} 
                    minDate={new Date()} 
                    maxDate={endDate || undefined} 
                  />
                </div>
                <div className={styles.datePickerContainer}>
                  <label className={styles.dateText}>Дата возврата</label>
                  <Calendar 
                    selectedDate={endDate} 
                    onDateChange={setEndDate} 
                    minDate={startDate || new Date()} 
                    maxDate={startDate ? new Date(startDate.getTime() + book.maxReservationPeriod * 24 * 60 * 60 * 1000) : undefined} 
                  />
                </div>
              </div>
              <div 
                className={isButtonDisabled ? styles.buttonDisabled : styles.button} 
                onClick={handleReservation}
              >
                Взять книгу
              </div>
            </>
          ) : userHasBook ? (
            <div 
              className={isSubmitting ? styles.buttonDisabled : styles.button} 
              onClick={() => setIsModalOpen(true)}
            >
              Вернуть книгу
            </div>
          ) : null}
        </article>
      </section>

      {isModalOpen && (
        <ReturnBookModal
          onClose={() => setIsModalOpen(false)}
          onReturnBook={handleReturnBook}
        />
      )}
    </>
  );
};