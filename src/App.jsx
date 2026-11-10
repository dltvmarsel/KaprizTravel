import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BookingModal from "./components/BookingModal.jsx";
import TourCard from "./components/TourCard.jsx";
import tours from "./data/tours";
import "./App.css";

function App() {
  const [bookingTour, setBookingTour] = useState(null);

  function openBooking(tour = null) {
    setBookingTour({ tour });
  }

  function closeBooking() {
    setBookingTour(null);
  }

  return (
    <>
      <Header onBook={() => openBooking()} />

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow">Путешествия по Кыргызстану</span>
          <h1>Ближе к природе.<br />Ближе к себе.</h1>
          <p>Откройте горы, озёра и кочевую культуру Кыргызстана — в своём ритме и с заботой о каждой детали.</p>
          <div className="hero-actions">
            <a href="#tours" className="button button-light">Выбрать путешествие <span aria-hidden="true">↗</span></a>
            <a href="#about" className="hero-link">Познакомиться с нами <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-note">
          <span className="hero-note-icon" aria-hidden="true">✳</span>
          <span>Маленькие группы<br />Большие впечатления</span>
        </div>
        <a className="scroll-cue" href="#tours" aria-label="Прокрутить к турам"><span /></a>
      </section>

      <section className="intro" aria-label="О наших путешествиях">
        <p>Места, которые вдохновляют.</p>
        <p>Люди, которые остаются в памяти.</p>
        <p>Кыргызстан, который хочется узнать.</p>
      </section>

      <section className="tours" id="tours">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Ваш следующий маршрут</span>
            <h2>Путешествия с характером</h2>
          </div>
          <p>От бирюзовых озёр до высокогорных долин — выберите место, которое отзовётся именно вам.</p>
        </div>
        <div className="tour-list">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} onBook={() => openBooking(tour)} />
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-image" role="img" aria-label="Горный пейзаж Кыргызстана">
          <span className="image-caption">Кыргызстан — это чувство</span>
        </div>
        <div className="about-content">
          <span className="eyebrow">Знакомьтесь, Kapriz Travel</span>
          <h2>Не просто показать.<br /><em>Помочь почувствовать.</em></h2>
          <p>Мы создаём путешествия по Кыргызстану для тех, кто хочет увидеть больше, чем открытки. Продумываем маршрут, делимся любовью к родным местам и оставляем пространство для настоящих открытий.</p>
          <div className="about-points">
            <div><span>01</span><p>Маршруты с душой<br /><small>Знаем места за пределами путеводителей</small></p></div>
            <div><span>02</span><p>Забота в деталях<br /><small>Комфорт и внимание на каждом этапе</small></p></div>
          </div>
          <a className="text-link" href="#contacts">Давайте знакомиться <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="contact" id="contacts">
        <span className="eyebrow">Пора в путь</span>
        <h2>Ваша история<br />начинается здесь.</h2>
        <p>Выберите направление — а мы поможем продумать детали вашего путешествия.</p>
        <button className="button button-dark" type="button" onClick={() => openBooking()}>
          Оформить заявку <span aria-hidden="true">↗</span>
        </button>
        <span className="contact-decoration" aria-hidden="true">✳</span>
      </section>

      <Footer onBook={() => openBooking()} />
      {bookingTour !== null && (
        <BookingModal tours={tours} initialTour={bookingTour.tour} onClose={closeBooking} />
      )}
    </>
  );
}

export default App;