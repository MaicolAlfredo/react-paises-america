import montaña from "../assets/img/montaña_slide.jpg";
import panama from "../assets//img/panama_ciudad.jpg";
import rio from "../assets//img/rio_slide.jpg";
import "../style/RandomImageRotator.css";

export default function RandomImageRotator() {
  return (
    <section className="container-fluid p-0">
      <div className="image-slider">
        <img src={montaña} className="slider-img w-100" alt="Montaña" />
        <img src={panama} className="slider-img w-100" alt="Panamá" />
        <img src={rio} className="slider-img w-100" alt="Río" />
      </div>
    </section>
  );
}