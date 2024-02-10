import "./Carousel.css";
import { GrNext, GrPrevious } from "react-icons/gr";

export const Carousel = ({items = [], selectedItems = [], onItemSelect}) => {
  let counter = 0;

  const images = document.querySelectorAll('.image-carousel')
  // images.forEach((slide, index) => {
  //   slide.style.left = `${index * 100}%`
  // });

  const slideImage = () => {
    images.forEach(
      (e) => {
        e.style.transform = `translateX(-${counter * 100}px)`
      }
    )
  };

  const prev = () => {
    if (counter > 0){
      counter --;
      slideImage();
      console.log(counter);
    }
  };
  const next = () => {
    if (counter <= (images.length / 2)){
      counter ++;
      slideImage();
      console.log(counter);
    };
  };

  return (
    <div className="carousel-container">
      <div className="carousel-btn prev-btn">
        <button onClick={() => prev()}>
          <GrPrevious />
        </button>
      </div>

      <div className="images-container">
        {[...items, ...items, ...items || []].map((item, index) => {
          const isSelected = selectedItems.filter((i) => i === item.name)[0];
          console.log(isSelected);

          return (
            <div className={`image-carousel ${isSelected ? 'active' : ''}`} key={index} onClick={() => onItemSelect(item.name)}>
              <div className="image">
                <img src={item.image_url} alt="img" />
              </div>
              <div className="name">{item.name}</div>
            </div>
          )
        })}
      </div>

      <div className="carousel-btn next-btn">
        <button onClick={() => next()}>
          <GrNext />
        </button>
      </div>
    </div>
  );
};