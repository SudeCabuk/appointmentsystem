"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import styles from "./Register.module.css";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    specialty: null,
  });

  const specialties = [
    { name: "Acil Tıp", code: "ACL" },
    { name: "Adli Tıp", code: "ADL" },
    { name: "Ağız Diş Ve Çene Cerrahisi", code: "ADC" },
    { name: "Aile Hekimliği", code: "AH" },
    { name: "Anesteziyoloji Ve Reanimasyon", code: "ANS" },
    { name: "Beyin Ve Sinir Cerrahisi", code: "BSC" },
    { name: "Çocuk Sağlığı Ve Hastalıkları", code: "CSH" },
    { name: "Dermatoloji", code: "DER" },
    { name: "Endokrinoloji Ve Metabolizma", code: "END" },
    { name: "Enfeksiyon Hastalıkları", code: "ENF" },
    { name: "Fiziksel Tıp Ve Rehabilitasyon", code: "FTR" },
    { name: "Gastroenteroloji", code: "GAS" },
    { name: "Genel Cerrahi", code: "GC" },
    { name: "Göğüs Hastalıkları", code: "GH" },
    { name: "Göz Hastalıkları", code: "GOZ" },
    { name: "İç Hastalıkları", code: "IC" },
    { name: "Kadın Hastalıkları Ve Doğum", code: "KHD" },
    { name: "Kalp Ve Damar Cerrahisi", code: "KDC" },
    { name: "Kardiyoloji", code: "KAR" },
    { name: "Kulak Burun Boğaz", code: "KBB" },
    { name: "Nefroloji", code: "NEF" },
    { name: "Nöroloji", code: "NOR" },
    { name: "Ortopedi Ve Travmatoloji", code: "ORT" },
    { name: "Plastik Rekonstrüktif Ve Estetik Cerrahi", code: "PLS" },
    { name: "Psikiyatri", code: "PSK" },
    { name: "Radyoloji", code: "RAD" },
    { name: "Üroloji", code: "URO" },
  ];

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
          <h1>SIGN UP</h1>
        </div>
        <div className={styles.formGroup}>
          <label>Uzmanlık Alanı</label>
          <Dropdown
            value={formData.specialty}
            onChange={(e) => handleChange(e, "specialty")}
            options={specialties}
            optionLabel="name"
            placeholder="Uzmanlık alanı seçin"
            className={styles.input}
          />
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.nameField}>
            <label>Ad</label>
            <InputText
              value={formData.firstName}
              onChange={(e) => handleChange(e, "firstName")}
              className={styles.input}
            />
          </div>
          <div className={styles.nameField}>
            <label>Soyad</label>
            <InputText
              value={formData.lastName}
              onChange={(e) => handleChange(e, "lastName")}
              className={styles.input}
            />
          </div>
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
        <Button className={styles.loginButton}>Kayıt Ol</Button>
      </div>
    </div>
  );
}
