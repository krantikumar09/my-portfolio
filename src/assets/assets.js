import avatar from "./avatar.jpg";
import vscode from "./vscode.png";
import firebase from "./firebase.png";
import mongodb from "./mongodb.png";
import figma from "./figma.png";
import git from "./git.png";
import organicProject from "./organick.jpg";
import socialMedia from "./social.jpg";
export const assets = {
  avatar,
  vscode,
  mongodb,
  firebase,
  figma,
  git,
  organicProject,
  socialMedia,
};

export const projects = [
  {
    _id: "01",
    name: "Fashion E-Commercer Web App",
    description:
      "This e-commerce website is built with ReactJS for the frontend, Node.js for the backend, and MongoDB for the database, with Tailwind CSS for responsive design. It offers a smooth shopping experience with product browsing, cart management, and secure checkout. The combination of these technologies ensures a fast, scalable, and mobile-friendly platform.",
    image: organicProject,
    url: "https://fashion9.netlify.app"
  },

  {
    _id: "02",
    name: "Organic Food Store Web App",
    description:
      "Experience our responsive e-commerce website featuring organic fruits and vegetables. With a user-friendly interface, secure checkout, and captivating visuals, enjoy a seamless shopping experience.",
    image: organicProject,
    url: ""
  },
  {
    _id: "03",
    name: "Social Media Dashboard",
    description:
      "social media management with our user-friendly Social Media Dashboard Website. Schedule posts, analyze data, engage with followers, and collaborate seamlessly. Elevate your social media strategy today.",
    image: socialMedia,
    url: "https://krantikumar09.github.io/social-media-dashboard/"
  },
];
