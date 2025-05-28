import { Dimensions } from 'react-native';

// Currency
export const CURRENCY = { name: "AUD", sign: "$" };

// Dish Types
export const DISH_TYPES = [
  { id: 1, title: "Starters", slug: "starters" },
  { id: 2, title: "Main Courses", slug: "main" },
  { id: 3, title: "Drinks", slug: "drinks" },
  { id: 4, title: "Desserts", slug: "dessert" },
];

// windowWidth, windowHeight
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

// Theme
export const THEME = {
  colors: {
    text: "#F05801",
    darkText: "#703e22",
    headerText: "#702900",
    background: "#d3d3d3",
    brightBackground:"#ccc",
    dialogPrimary:"#f28749",
    accent:"#BD4500",
    darkBG:"#333",
    bottomTab: {
      background: "#333",
      inactivebackground:"#222",
      active: "#F05801",
      inactive: "#702900",
    },
    // dishType: {
    //   active: "#000",
    //   inactive: "#FFF",
    // },
    // dish: {
    //   background: "#FFF",
    //   title: "#000",
    //   description: "#454545",
    //   price: "#000",
    // },
    // cart: {
    //   box: "#e85e5e",
    //   count: "#000",
    // },
  },
};

//restaurant Info
export const restaurant = {
  company:"Forks and Chopsticks Asian Restaurant",
  address:"Unit 69/155 Brebner Dr, West Lakes SA 5021",
  logo:"https://studentserver.com.au/daqin/images/restaurant_logo.png"
};

export const blankImage =
  "https://sumanbiswas-website.s3.ap-south-1.amazonaws.com/nutshell-image-temp/blank.png";
