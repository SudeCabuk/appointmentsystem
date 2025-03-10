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
      command: () => router.push("/privacy"),
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
              iconPos="left"
              rounded
              severity="success"
              aria-label="Search"
              className={styles.btn}
            >
              <span className={styles.btntext}>Ara</span>
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
      <div className={styles.featureSection}>
        <div className={styles.feature}>
          <i className="pi pi-search"></i>
          <h3>Doktor veya uzman bulun</h3>
          <p>
            181 000'den fazla doktor ve uzman arasından seçim yapın. Diğer
            hastaların görüşlerini inceleyin.
          </p>
        </div>
        <div className={styles.feature}>
          <i className="pi pi-calendar"></i>
          <h3>Kolaylıkla randevu alın</h3>
          <p>
            Size uygun tarih ve saati seçin, bilgilerinizi girin ve onaylayın.
            Psikolog veya Diyetisyenlerle online görüşün.
          </p>
        </div>
        <div className={styles.feature}>
          <i className="pi pi-bell"></i>
          <h3>Randevuları unutmayın</h3>
          <p>Randevularınızı otomatik sms ve e-mail ile hatırlatıyoruz.</p>
        </div>
        <div className={styles.feature}>
          <i className="pi pi-thumbs-up"></i>
          <h3>Randevu oluşturmak ücretsizdir</h3>
          <p>
            Doktortakvimi'nde randevu oluşturmak tamamen ücretsizdir. (Muayene
            ücretlerini öğrenmek için doktorunuza başvurun)
          </p>
        </div>
      </div>
      <div className={styles.reviewsSection}>
        <h2>En yeni değerlendirmeler</h2>
        <div className={styles.review}>
          <img src="/path/to/user1.jpg" alt="Mehmet Güzeloglu" />
          <div>
            <h3>Mehmet Güzeloglu</h3>
            <p>
              Bacağımda ağrı, sızı şikayeti ile geldim. Hemen teşhis edip
              operasyon yaptılar...
            </p>
          </div>
        </div>
        <div className={styles.review}>
          <img src="/path/to/user2.jpg" alt="Taha Takmaz" />
          <div>
            <h3>Taha Takmaz</h3>
            <p>
              Kasıklardaki yoğun ağrı nedeniyle araştırmalarım sonucunda Taha
              Bey'e ulaştım...
            </p>
          </div>
        </div>
        <div className={styles.review}>
          <img src="/path/to/user3.jpg" alt="Ömer Bulut" />
          <div>
            <h3>Ömer Bulut</h3>
            <p>
              Slm benim dogumsal dudak yarigi(tek taraf) oldugu icin her zaman
              hayalimdi...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
