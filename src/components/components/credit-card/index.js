import chipImage  from "../../../assets/transparent-chip.webp";
import { CREDIT_CARD_NUMBER_MAX_LENGTH } from "../../../utils/helpers";
import "./creditCard.css";
import dayjs from "dayjs";

const Focus = {
  Front: 'Front',
  Back: 'Back'
};


function formatCreditCardNumber(number) {
  if (!number) return "";
  if (number.length > CREDIT_CARD_NUMBER_MAX_LENGTH) return;

  const formattedNumber = number.replace(/\D/g, ""); // Remove non-digit characters
  const segments = formattedNumber.match(/.{1,4}/g); // Split into 4-character segments
  return segments ? segments.join("-") : formattedNumber;
}


export const CreditCard = ({number, name, date, cvc, focus}) => {
  const isFlipped = focus === Focus.Back;

  return (
    <div className="credit-card-container">
      <div className={`card-wrapper ${isFlipped ? 'flipped' : ''}`}>

      </div>

    </div>
  )

}

// {!isFlipped && (
//   <div className="card-front">
//     <p>front</p>
//     {/* <div className="chip">
//       <img src={chipImage} alt="" />
//     </div>

//     <div className="card-number-input">
//       <p>{formatCreditCardNumber(number) || 'xxxx-xxxx-xxxx-xxxx'}</p>
//     </div>

//     <div className="details">
//       <div className="name">{name || 'should-fill'}</div>
//       <div className="expire">{date ? dayjs(date).format('YYYY-MM') : 'should-fill'}</div>
//     </div> */}
//   </div>
// )}
// {isFlipped && (
//   <div className="card-back">
//     <p>back</p>
//   </div>
//   // <div className="back">
//   //   <div className="cvc-number">
//   //     <p>{cvc || '000'}</p>
//   //   </div>
//   // </div>
// )}
