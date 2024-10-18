import React from "react";
import SectionTitle from "./SectionTitle";

const Contact = () => {
  return (
    <section id="contact" className="mt-32 h-[72vh]">
      <SectionTitle title={"Contact Me"} />

      <form action="#" className="flex flex-col gap-4">
        <div className="flex items-center flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Name"
            className="input input-bordered w-full text-base text-priText glass font-medium "
            required
          />
          <input
            type="text"
            placeholder="Enter Email"
            className="input input-bordered w-full text-base text-priText glass font-medium"
            required
          />
        </div>

        <textarea
          className="textarea textarea-bordered text-base text-priText glass font-medium"
          placeholder="Enter your message"
          rows={6}
          required
        ></textarea>

        <button className="btn text-white bg-green border-none outline-none hover:bg-greenHover">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
