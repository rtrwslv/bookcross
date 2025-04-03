/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./styles.module.css";
import { Header } from "../../Components/Header/Header";
import { useEffect, useState } from "react";

export const Auth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");

    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUserId(savedUserId);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/custom/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "421594068",
          first_name: "Ярослав",
          username: "eckapi",
          photo_url: "https://t.me/i/userpic/320/JAi12Cf32kl01pGaq5mER-cM0HvGg3oy1Ty7ZXE_GDc.jpg",
          auth_date: "1742989442",
          hash: "991e60c27e4a626f9bebb6c9789d9b189ded61701ffd980cff3a880b96a04aff",
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      const data = await response.json();
      const newToken = data.body.token;
      const newUserId = data.body.userId;

      localStorage.setItem("token", newToken);
      localStorage.setItem("userId", newUserId);

      setToken(newToken);
      setUserId(newUserId);

      alert(`Успешный вход: ${newToken} ${newUserId}`);
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  };

  return (
    <>
      <Header disableSearch={true} searchQuery="" onSearch={() => {}} />
      <div className={styles.container}>
        <button onClick={handleLogin}>Press to emulate login</button>
      </div>
    </>
  );
};
