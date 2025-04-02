import React, { useState } from "react";
import { Upload, Input } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

interface ReturnBookModalProps {
  onClose: () => void;
  onReturnBook: (fileRef: string, comment?: string) => void;
}

const ReturnBookModal: React.FC<ReturnBookModalProps> = ({ onClose, onReturnBook }) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [comment, setComment] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (info: any) => {
    if (info.file.status === "uploading") {
      setUploadStatus("uploading");
      return;
    }
    
    if (info.file.status === "done") {
      setPhoto(info.file.originFileObj);
      setUploadStatus("done");
      return;
    }
    
    if (info.file.status === "error") {
      setUploadStatus("error");
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8080/rest/files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      
      const data = await response.json();
      return data.fileRef;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleReturn = async () => {
    if (!photo) return;

    setIsSubmitting(true);
    try {
      const fileRef = await uploadFile(photo);
      onReturnBook(fileRef, comment.trim() || undefined);
      onClose();
    } catch (error) {
      setUploadStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseOutlined />
        </button>
        
        <h2 className={styles.modalTitle}>Подтверждение возврата книги</h2>
        <p className={styles.modalSubtitle}>Загрузите фото книги для подтверждения возврата</p>
        
        <div className={styles.uploadArea}>
          <Upload
            name="file"
            accept="image/*"
            showUploadList={false}
            onChange={handleFileChange}
            customRequest={({ onSuccess }) => onSuccess?.("ok")}
            disabled={uploadStatus === "uploading"}
          >
            <div className={styles.uploadContent}>
              <UploadOutlined className={styles.uploadIcon} />
              <p className={styles.uploadText}>
                {uploadStatus === "done" 
                  ? "Файл успешно загружен" 
                  : "Нажмите или перетащите файл в эту область"}
              </p>
              {uploadStatus === "uploading" && (
                <p className={styles.uploadStatus}>Загрузка...</p>
              )}
            </div>
          </Upload>
          
          {uploadStatus === "error" && (
            <p className={styles.errorMessage}>Ошибка загрузки файла</p>
          )}
        </div>

        <div className={styles.commentSection}>
          <Input.TextArea
            rows={3}
            placeholder="Добавьте комментарий (необязательно)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
            showCount
          />
        </div>

        <div className={styles.modalActions}>
          <button 
            className={`${styles.modalButton} ${styles.cancelButton}`} 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Отмена
          </button>
          <button 
            className={`${styles.modalButton} ${styles.submitButton}`} 
            onClick={handleReturn}
            disabled={!photo || isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Подтвердить возврат"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnBookModal;