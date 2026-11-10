import { useEffect, useState } from "react";

const agencyWhatsApp = "996500220039";

function getToday() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60 * 1000).toISOString().slice(0, 10);
}

function BookingModal({ tours, initialTour, onClose }) {
  const [step, setStep] = useState(1);
  const [tourId, setTourId] = useState(initialTour?.id ? String(initialTour.id) : "");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [whatsAppOpened, setWhatsAppOpened] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const selectedTour = tours.find((tour) => String(tour.id) === tourId);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleContinue(event) {
    event.preventDefault();
    setStep((currentStep) => currentStep + 1);
  }

  function handleSendRequest() {
    if (!selectedTour) return;

    const message = [
      "Здравствуйте! Хочу оформить заявку на тур Kapriz Travel.",
      "",
      `Тур: ${selectedTour.title}`,
      `Стоимость: ${selectedTour.price}`,
      `Дата: ${new Date(`${date}T12:00:00`).toLocaleDateString("ru-RU")}`,
      `Количество участников: ${guests}`,
      `Имя: ${name}`,
      `Телефон для связи: ${phone}`,
      comment.trim() ? `Пожелания: ${comment.trim()}` : "",
      "",
      "Подскажите, пожалуйста, доступность мест и дальнейшие условия бронирования."
    ].filter(Boolean).join("\n");

    const whatsappUrl = `https://wa.me/${agencyWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setWhatsAppUrl(whatsappUrl);
    setWhatsAppOpened(true);
  }

  return (
    <div
      className="booking-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <button className="booking-close" type="button" onClick={onClose} aria-label="Закрыть оформление">×</button>
        <div className="booking-modal-heading">
          <span className="eyebrow">Kapriz Travel · оформление</span>
          <h2 id="booking-title">
            {whatsAppOpened ? "Заявка подготовлена" : ["Выберите путешествие", "Как с вами связаться?", "Проверьте детали"][step - 1]}
          </h2>
          {!whatsAppOpened && (
            <div className="booking-progress" aria-label={`Шаг ${step} из 3`}>
              {[1, 2, 3].map((number) => (
                <span key={number} className={number <= step ? "active" : ""} />
              ))}
              <small>Шаг {step} из 3</small>
            </div>
          )}
        </div>

        {whatsAppOpened ? (
          <div className="booking-success">
            <span className="booking-success-icon" aria-hidden="true">✓</span>
            <p>Проверьте заполненную заявку в WhatsApp и нажмите «Отправить», чтобы передать её агентству. Если новая вкладка не открылась, воспользуйтесь ссылкой ниже.</p>
            <a className="text-link" href={whatsAppUrl} target="_blank" rel="noreferrer">
              Открыть WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <p className="booking-disclaimer">Бронирование подтвердится после ответа менеджера.</p>
            <button className="button button-dark booking-submit" type="button" onClick={onClose}>Готово</button>
          </div>
        ) : (
          <form onSubmit={handleContinue}>
            {step === 1 && (
              <div className="booking-fields">
                <label>
                  Направление
                  <select value={tourId} onChange={(event) => setTourId(event.target.value)} required>
                    <option value="" disabled>Выберите тур</option>
                    {tours.map((tour) => (
                      <option key={tour.id} value={tour.id}>{tour.title} · {tour.price}</option>
                    ))}
                  </select>
                </label>
                <div className="booking-field-row">
                  <label>
                    Желаемая дата
                    <input type="date" value={date} min={getToday()} onChange={(event) => setDate(event.target.value)} required />
                  </label>
                  <label>
                    Участники
                    <select value={guests} onChange={(event) => setGuests(event.target.value)}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                        <option key={count} value={count}>{count} {count === 1 ? "человек" : "человека"}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <p className="booking-hint">Дата и наличие мест будут подтверждены менеджером.</p>
              </div>
            )}

            {step === 2 && (
              <div className="booking-fields">
                <label>
                  Ваше имя
                  <input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Как к вам обращаться" required />
                </label>
                <label>
                  Телефон для связи
                  <input type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+996 ___ ___ ___" required />
                </label>
                <label>
                  Пожелания <span className="booking-optional">(необязательно)</span>
                  <textarea value={comment} onChange={(event) => setComment(event.target.value)} rows="3" placeholder="Например, вопросы по маршруту или особые пожелания" />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="booking-review">
                <div><span>Направление</span><strong>{selectedTour?.title}</strong></div>
                <div><span>Стоимость</span><strong>{selectedTour?.price}</strong></div>
                <div><span>Дата</span><strong>{new Date(`${date}T12:00:00`).toLocaleDateString("ru-RU")}</strong></div>
                <div><span>Участники</span><strong>{guests}</strong></div>
                <div><span>Имя</span><strong>{name}</strong></div>
                <div><span>Телефон</span><strong>{phone}</strong></div>
                {comment.trim() && <div><span>Пожелания</span><strong>{comment.trim()}</strong></div>}
                <p className="booking-hint">Нажатие откроет WhatsApp с готовой заявкой. Отправьте сообщение в чате, чтобы связаться с агентством.</p>
              </div>
            )}

            <div className="booking-actions">
              {step > 1 && (
                <button className="booking-back" type="button" onClick={() => setStep((currentStep) => currentStep - 1)}>
                  ← Назад
                </button>
              )}
              {step < 3 ? (
                <button className="button button-dark booking-submit" type="submit">
                  Продолжить <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button className="button button-dark booking-submit" type="button" onClick={handleSendRequest}>
                  Перейти в WhatsApp <span aria-hidden="true">↗</span>
                </button>
              )}
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default BookingModal;
