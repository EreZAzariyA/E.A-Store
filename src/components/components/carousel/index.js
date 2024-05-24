import "./Carousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const CustomCarousel = ({ items = [], selectedItems = [], onItemSelect, isVertical }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 500 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1
    }
  };

  return (
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={false}
        infinite={false}
        keyBoardControl={isVertical ? false : true}
        centerMode={isVertical ? true : false}
        containerClass={`carousel-container ${isVertical ? 'vertical' : ''}`}
        itemClass={`carousel-item ${isVertical ? 'vertical' : ''}`}
        arrows={isVertical ? false : true}
      >
        {items.map((item) => {
          const isActive = selectedItems.includes(item._id);

          return (
            <div className={isActive ? 'active' : ''} key={item._id} onClick={() => onItemSelect(item)}>
              {isVertical && (
                <div className="brand-name">{item.name}</div>
              )}
              <img src={item.image_url} alt="img" />
            </div>
          )
        })}
      </Carousel>
  );
};