import Icon from '@ant-design/icons';

export const CREDIT_CARD_NUMBER_MAX_LENGTH = 16;
export const MAX_FILE_SIZE = 2 * 1024 * 1024;  // 2 MB in bytes
export const acceptedImageFile = '.png, .jpeg, .jpg, .webp';
export const ALLOWED_TYPES = {
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  JPG: 'image/jpg',
  WEBP: 'image/webp'
};

export const OrdersStatus = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};


export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const ComponentsTypes = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  SUB_CATEGORIES: 'sub_categories',
}

export const Brands = [
  {
    name: "Apple",
    image_url: "https://afi4nnu0d31evx7v.public.blob.vercel-storage.com/brands/Apple-xo4vJctgqKqEutE4QNtD7rA4NqaXRJ.png"
  },
  {
    name: "JBL",
    image_url: "https://afi4nnu0d31evx7v.public.blob.vercel-storage.com/brands/JBL-6DJhJ5ajBIceNjvHuHtHBBG1OsER1J.png"
  },
]

export const numberWithCommas = (x, number = 2) => {
  const formattedNumber = parseFloat(x).toFixed(number);
  return formattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const validateDetails = (details) => {
  if (details) {
    Object.entries(details).forEach(([key, value]) => {
      if (!value || value === 0 || value === undefined) {
        throw new Error(`${key} is missing`);
      }
    });
  }
};

export const calculateTotals = (products) => {
  let total = 0;
  [...products || []].forEach((product) => {
    total += product.totalPrice;
  });
  return total || 0;
};

export const isAdmin = (user) => {
  return user?.admin || false;
};

export const MessagesTypes = {
  REGISTER_SUCCESSFULLY: 'User register successfully',
  LOGGED_IN_SUCCESSFULLY: 'User logged-in success',
};

export const NotificationConfig = {
  placement: 'topLeft',
  duration: 3
}
export const NotificationMessages = {
  PRODUCT_ADDED_TO_CART_SUCCESS: 'Product Added To Your Cart',
  PRODUCT_REMOVED_FROM_CART_SUCCESS: 'Product Removed From Your Cart',
}

export const getError = (err) => {
  if(typeof err === "string") return err;
  if(typeof err.response?.data === "string") return err.response.data; // axios: 401, 403, 500
  if(Array.isArray(err.response?.data)) return err.response.data[0]; // axios: 400 - array of errors
  if(typeof err.message === "string") return err.message;
  return "Some error, please try again.";
};

export const getFullName = (user) => {
  return user.profile?.first_name + ' ' + user.profile?.last_name;
};

export const getEmail = (user) => {
  return user.emails[0].email;
};

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="transparent" stroke="currentColor" strokeWidth="100" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
export const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;

const RedHeartSvg = () => (
  <svg width="1em" height="1em" fill="red" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
export const RedHeartIcon = (props) => <Icon component={RedHeartSvg} {...props} />;

export function toCapitalize(text) {
  const words = text.split(' ');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  const result = capitalizedWords.join(' ');
  return result;
};

export const getShortID = (id) => {
  return id.slice(0, id.length / 2)
}