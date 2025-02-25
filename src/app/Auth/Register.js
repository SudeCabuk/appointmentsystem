"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import styles from "./Register.module.css";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    specialty: null,
    cities: null,
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
  const cities = [
    { name: "İstanbul", code: "IST" },
    { name: "Tekirdağ", code: "TKR" },
    { name: "Ankara", code: "ANK" },
    { name: "İzmir", code: "IZ" },
  ];

  const handleChange = (e, field) => {
    if (field === "specialty" || field === "cities") {
      setFormData({
        ...formData,
        [field]: e.value,
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          specialty: formData.specialty.code,
          city: formData.cities.code,
        }
      );

      if (response.status === 201) {
        console.log("Kayıt başarılı:", response.data);
        // Başarılı kayıt sonrası yönlendirme yapılabilir
        router.push("/login");
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
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Şehir</label>
          <Dropdown
            value={formData.cities}
            onChange={(e) => handleChange(e, "cities")}
            options={cities}
            optionLabel="name"
            placeholder="Şehir seçin"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.nameField}>
            <label>Ad</label>
            <InputText
              value={formData.firstName}
              onChange={(e) => handleChange(e, "firstName")}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.nameField}>
            <label>Soyad</label>
            <InputText
              value={formData.lastName}
              onChange={(e) => handleChange(e, "lastName")}
              className={styles.input}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>E-posta</label>
          <InputText
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Şifre</label>
          <InputText
            type="password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
            className={styles.input}
            required
          />
        </div>
        <Button onClick={handleSignUp} className={styles.loginButton}>
          Kayıt Ol
        </Button>
      </div>
    </div>
  );
}
