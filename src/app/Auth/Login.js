"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import styles from "./Login.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        console.log("Giriş başarılı:", response.data);
        localStorage.setItem("token", response.data.token);
        router.push("/admin");
      }
    } catch (error) {
      if (error.response) {
        console.error("Sunucu hatası:", error.response.data);
      } else if (error.request) {
        console.error("Sunucuya ulaşılamadı");
      } else {
        console.error("Hata:", error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.formHeader}>
          <h1>LOGIN</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-posta</label>
            <InputText
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange(e, "email")}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Şifre</label>
            <InputText
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange(e, "password")}
              className={styles.input}
              required
              minLength={6}
            />
          </div>
          <Button type="submit" className={styles.loginButton}>
            Giriş Yap
          </Button>
        </form>
      </div>
    </div>
  );
}
