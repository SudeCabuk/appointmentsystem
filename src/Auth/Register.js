"use client";
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import styles from "./Register.module.css";
import { useRouter } from "next/navigation";
import AuthServices from "@/Services/AuthServices";
import BranchServices from "@/Services/BranchServices";
import CityServices from "@/Services/CityServices";

export default function Register() {
  let authService = new AuthServices;
  let branchService = new BranchServices;
  let cityService = new CityServices;
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    branchId: null,
    cityId: null,
  });

  const [branches, setBranches] = useState([]);
  const [cities, setCities] = useState([]);

  const getBranches = () => {
    branchService.getAll().then((response) => {
      setBranches(response.data.data)
    })
  };

  const getCities = async () => {
    cityService.getAll().then((response) => {
      setCities(response.data.data)
    })
  };

  useEffect(() => {
    getCities();
    getBranches();
  }, []);

  const handleChange = (e, field) => {
    if (field === "branchId" || field === "cityId") {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      companyName: formData.companyName,
      email: formData.email,
      password: formData.password,
      branchId: formData.branchId.id,
      cityId: formData.cityId.id,
    };
    authService.register(data).then((response) => {
      console.log("Kayıt başarılı:", response.data);
      router.push("/login");
    }).catch((err) => {
      console.log(err.response.data.message)
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.formHeader}>
          <h1>SIGN UP</h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="branchId">Uzmanlık Alanı</label>
            <Dropdown
              id="branchId"
              value={formData.branchId}
              onChange={(e) => handleChange(e, "branchId")}
              options={branches}
              optionLabel="name"
              placeholder="Uzmanlık alanı seçin"
              editable
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cityId">Şehir</label>
            <Dropdown
              id="cityId"
              value={formData.cityId}
              onChange={(e) => handleChange(e, "cityId")}
              options={cities}
              optionLabel="name"
              placeholder="Şehir seçin"
              editable
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="companyName">Ad Soyad ya da Şirket Adı</label>
            <InputText
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange(e, "companyName")}
              className={styles.input}
              required
            />
          </div>
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
            Kayıt Ol
          </Button>
        </form>
      </div>
    </div>
  );
}
