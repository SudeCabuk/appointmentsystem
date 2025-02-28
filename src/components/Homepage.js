"use client";
import { Menubar } from "primereact/menubar";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Homepage.module.css";
import { useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import BranchServices from "@/Services/BranchServices";
import CityServices from "@/Services/CityServices";

export default function Homepage() {
  let branchService = new BranchServices();
  let cityService = new CityServices();
  const router = useRouter();
  const [formData, setFormData] = useState({
    branchId: null,
    cityId: null,
  });
  const items = [
    {
      label: "Veri Gizliliği",
    },
    {
      label: "Ücretsiz kaydolun",
      command: () => router.push("/register"),
    },
    {
      label: "Giriş Yap",
      command: () => router.push("/login"),
    },
  ];
  const start = (
    <div className={styles.logoContainer}>
      <Image
        src="/transparan.png"
        alt="Logo"
        width={150}
        height={60}
        priority
        className={styles.logo}
      />
    </div>
  );
  const [branches, setBranches] = useState([]);
  const [cities, setCities] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const end = (
    <div className={styles.menuToggle}>
      <Button
        icon="pi pi-bars"
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        className={styles.menuButton}
        aria-label="Menu"
      />
    </div>
  );

  const getBranches = () => {
    branchService.getAll().then((response) => {
      setBranches(response.data.data);
    });
  };

  const getCities = async () => {
    cityService.getAll().then((response) => {
      setCities(response.data.data);
    });
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

  return (
    <div className="card">
      <Menubar
        model={items}
        start={start}
        end={end}
        className={`${styles.menubar} ${
          isMenuVisible ? styles.menuVisible : ""
        }`}
      />
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h1>Doktor randevusu al</h1>
          <form className={styles.form}>
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

            <Button
              icon="pi pi-search"
              rounded
              severity="success"
              aria-label="Search"
              className={styles.btn}
            >
              Ara
            </Button>
          </form>
        </div>
        <div className={styles.rightSection}>
          <Image
            src="/doctors.png"
            alt="Doctors"
            width={650}
            height={400}
            priority
          />
        </div>
      </div>
    </div>
  );
}
