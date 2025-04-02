import styles from "./styles.module.css";
import { useState, ChangeEvent } from "react";
import { Header } from "../../Components/Header/Header";
import { UploadOutlined } from "@ant-design/icons";

export const Offer = () => {
    const [form, setForm] = useState<{ name: string; author: string; description: string; cover: File | null }>({
        name: "",
        author: "",
        description: "",
        cover: null,
    });
    const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem("token");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setForm({ ...form, cover: e.target.files[0] });
            setUploadStatus("done");
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setForm({ ...form, cover: e.dataTransfer.files[0] });
            setUploadStatus("done");
        }
    };

    const handleOffer = async () => {
        if (!form.name || !form.author || !form.description || !form.cover) {
            alert("Все поля должны быть заполнены!");
            return;
        }

        setIsSubmitting(true);
        setUploadStatus("uploading");

        try {
            const fileRef = await uploadFile(form.cover);
            if (!fileRef) throw new Error("Ошибка загрузки файла");
            await offerBook({ ...form, cover: fileRef });
            alert("Книга успешно предложена!");
        } catch (error) {
            console.error("Ошибка:", error);
            setUploadStatus("error");
            alert("Произошла ошибка");
        } finally {
            setIsSubmitting(false);
        }
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8080/rest/files", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Ошибка загрузки файла");
        }
        const data = await response.json();
        return data.fileRef;
    };

    const offerBook = async (bookData: { name: string; author: string; description: string; cover: string }) => {
        const response = await fetch("http://localhost:8080/custom/api/v1/books/offerBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bookData),
        });

        if (!response.ok) {
            throw new Error("Ошибка при предложении книги");
        }
    };

    return (
        <>
            <Header disableSearch={true} searchQuery="" onSearch={() => {}} />
            <div className={styles.container}>
                <div>
                    <p className={styles.text}>
                        Заполните поля, чтобы <br /> предложить книгу для буккроссинга
                    </p>
                    <div className={styles.inputContainer}>
                        <input className={styles.inputLow} name="name" placeholder="Введите название..." onChange={handleChange} />
                        <input className={styles.inputLow} name="author" placeholder="Введите автора..." onChange={handleChange} />
                        <textarea className={styles.inputHigh} name="description" placeholder="Введите описание..." onChange={handleChange}></textarea>
                        
                        <div 
                            className={styles.uploadArea}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <label htmlFor="file-upload" className={styles.uploadContent}>
                                <UploadOutlined className={styles.uploadIcon} />
                                <p className={styles.uploadText}>
                                    {uploadStatus === "done" 
                                        ? form.cover?.name || "Файл загружен" 
                                        : "Нажмите или перетащите обложку книги сюда"}
                                </p>
                                {uploadStatus === "uploading" && (
                                    <p className={styles.uploadStatus}>Загрузка...</p>
                                )}
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className={styles.fileInput}
                            />
                            
                            {uploadStatus === "error" && (
                                <p className={styles.errorMessage}>Ошибка загрузки файла</p>
                            )}
                        </div>
                    </div>
                    <div className={isSubmitting ? styles.buttonDisabled : styles.button} onClick={!isSubmitting ? handleOffer : undefined}>
                        {isSubmitting ? "Загрузка..." : "Предложить книгу"}
                    </div>
                </div>
            </div>
        </>
    );
};