import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";

const ProjectItem = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="sm:p-4 rounded cursor-pointer  transition-all group">
        <a
          className="flex items-start flex-col md:flex-row gap-4"
          href="https://fashion9.netlify.app"
          target="_blank"
        >
          <div className="w-[120px] h-[80px]">
            <img
              className="w-full h-full rounded object-cover"
              src={assets.organicProject}
              alt=""
              loading="lazy"
            />
          </div>

          <div className="flex-1">
            <h5 className="text-md font-semibold text-priText group-hover:text-green transition-all mb-2">
              Fashion E-Commerce Web App{" "}
              <FontAwesomeIcon icon={faArrowTurnUp} className="text-priText ms-4 text-xs group-hover:text-green group-hover:-translate-y-1 transition-all"/>
            </h5>
            <p className="text-sm leading-normal font-medium text-secText">
              This e-commerce website is built with ReactJS for the frontend,
              Node.js for the backend, and MongoDB for the database, with
              Tailwind CSS for responsive design. It offers a smooth shopping
              experience with product browsing, cart management, and secure
              checkout. The combination of these technologies ensures a fast,
              scalable, and mobile-friendly platform.
            </p>
          </div>
        </a>
      </div>

      <div className="sm:p-4 rounded cursor-pointer  transition-all group">
        <a
          className="flex items-start flex-col md:flex-row gap-4"
          href="https://krantikumar09.github.io/organick/"
          target="_blank"
        >
          <div className="w-[120px] h-[80px]">
            <img
              className="w-full h-full rounded object-cover"
              src={assets.organicProject}
              alt=""
              loading="lazy"
            />
          </div>

          <div className="flex-1">
            <h5 className="text-md font-semibold text-priText group-hover:text-green transition-all mb-2">
              Organic Food Store Web App
              <FontAwesomeIcon icon={faArrowTurnUp} className="text-priText ms-4 text-xs group-hover:text-green group-hover:-translate-y-1 transition-all"/>
            </h5>
            <p className="text-sm leading-normal font-medium text-secText">
              Experience our responsive e-commerce website featuring organic
              fruits and vegetables. With a user-friendly interface, secure
              checkout, and captivating visuals, enjoy a seamless shopping
              experience.
            </p>
          </div>
        </a>
      </div>

      <div className="sm:p-4 rounded cursor-pointer  transition-all group">
        <a
          className="flex items-start flex-col md:flex-row gap-4"
          href="https://krantikumar09.github.io/social-media-dashboard/"
          target="_blank"
        >
          <div className="w-[120px] h-[80px]">
            <img
              className="w-full h-full rounded object-cover"
              src={assets.socialMedia}
              alt=""
              loading="lazy"
            />
          </div>

          <div className="flex-1">
            <h5 className="text-md font-semibold text-priText group-hover:text-green transition-all mb-2">
              Social Media Dashboard
              <FontAwesomeIcon icon={faArrowTurnUp} className="text-priText ms-4 text-xs group-hover:text-green group-hover:-translate-y-1 transition-all"/>  
            </h5>
            <p className="text-base font-normal text-secText">
              social media management with our user-friendly Social Media
              Dashboard Website. Schedule posts, analyze data, engage with
              followers, and collaborate seamlessly. Elevate your social media
              strategy today.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProjectItem;
