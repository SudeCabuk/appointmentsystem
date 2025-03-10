"use client";
import React from "react";
import styles from "./privacy.module.css";
import Image from "next/image";

export default function page() {
  const handleLogoClick = () => {
    window.location.href = "http://localhost:3000";
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <Image
            src="/transparan.png"
            alt="Logo"
            width={160}
            height={70}
            priority
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className={styles.header}>
        <h1>Hem verileriniz hem de hastalarınız bizimle güvendedir</h1>
      </div>

      {/* Üst Bölüm */}
      <div className={styles.section}>
        <div className={styles.leftContent}>
          <div className={styles.checkList}>
            <div className={styles.checkItem}>
              <i className="pi pi-check"></i>
              <p>Eklediğiniz tüm veriler yalnızca size aittir</p>
            </div>
            <div className={styles.checkItem}>
              <i className="pi pi-check"></i>
              <p>Bilgileriniz şifrelenir ve korunur</p>
            </div>
            <div className={styles.checkItem}>
              <i className="pi pi-check"></i>
              <p>
                DoktorTime kişisel verilerinizi ticari amaçlarla saklamayacak,
                işlemeyecek ve satmayacaktır
              </p>
            </div>
          </div>
        </div>
        <div className={styles.rightContent}>
          <Image
            src="/security.jpg"
            alt="Güvenlik İllüstrasyonu"
            width={400}
            height={350}
            priority
          />
        </div>
      </div>

      {/* Alt Bölüm */}
      <div className={styles.section}>
        <div className={styles.leftContent}>
          <Image
            src="/security.webp"
            alt="Veri Koruma"
            width={500}
            height={400}
            priority
          />
        </div>
        <div className={styles.rightContent}>
          <h2>Verilerinizin tek sahibi sizsiniz</h2>
          <p>
            İçiniz rahat olsun diye, DoktorTime'ın ajandanızda yer alan verileri
            nasıl yönettiğini size bildirmek istiyoruz. Çok basit:
          </p>

          <div className={styles.infoList}>
            <p>• Eklediğiniz tüm veriler sadece size aittir</p>
            <p>
              • Kişisel verilerinizi ticari amaçlarla saklamayacak, işlemeyecek
              ve satmayacağız
            </p>
            <p className={styles.note}>
              Bu durum, verilerinizi asla üçüncü taraflarla, kliniklerle veya
              diğer uzmanlarla paylaşmayacağımız veya onlara satmayacağımız
              anlamına gelir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
