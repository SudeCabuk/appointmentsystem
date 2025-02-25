"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import styles from "./Login.module.css";

export default function Login() {
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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.formHeader}>
          <h1>LOGİN</h1>
        </div>
        <div className={styles.formGroup}>
          <label>E-posta</label>
          <InputText
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Şifre</label>
          <InputText
            type="password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
            className={styles.input}
          />
        </div>
        <Button className={styles.loginButton}>Giriş Yap</Button>
      </div>
    </div>
  );
}
