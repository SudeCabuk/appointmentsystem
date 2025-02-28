"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import styles from "./Login.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthServices from "@/Services/AuthServices";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const authService = new AuthServices;
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
  const handleSubmit = (e) => {
    e.preventDefault();
    authService.login(formData).then((response) => {
      localStorage.setItem("user",JSON.stringify(response.data))
      Cookies.set("user", JSON.stringify(response.data), { expires: 1, path: "/" });
      router.push("/admin");
    }).catch((err) => {
      console.log("errrrrr",err)
      console.log(err.response.data.message)
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.formHeader}>
          <h1>LOGİN</h1>
        </div>
        <form onSubmit={handleSubmit}>
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
        <Button type="submit" className={styles.loginButton}>
          Giriş Yap
        </Button>
        </form>
      </div>
    </div>
  );
}
