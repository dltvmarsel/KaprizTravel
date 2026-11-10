function TourCard({ tour, index, onBook }) {
  return (
    <article className="tour-card">
      <button className="tour-image-link" type="button" onClick={onBook} aria-label={`Оформить тур ${tour.title}`}>
        <img src={tour.image} alt={tour.alt} loading="lazy" />
        <span className="tour-number">0{index + 1}</span>
        <span className="tour-duration">{tour.duration}</span>
        <span className="tour-arrow" aria-hidden="true">↗</span>
      </button>
      <div className="tour-info">
        <p className="tour-location">{tour.location}</p>
        <h3>{tour.title}</h3>
        <p className="tour-description">{tour.description}</p>
        <div className="tour-bottom">
          <span className="tour-price">{tour.price}</span>
          <button type="button" onClick={onBook} aria-label={`Оформить тур ${tour.title}`}>
            Оформить тур <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default TourCard;