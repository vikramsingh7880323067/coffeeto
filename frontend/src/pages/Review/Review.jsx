import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { MdOutlineStarHalf } from "react-icons/md";
import customer1 from "../../assests/customer1.jpg";
import customer2 from "../../assests/customer2.jpg";
import customer3 from "../../assests/customer3.jpg";
import quote from "../../assests/quote.png";
import "./Review.css";
const Review = () => {
  return (
    <section className="review" id="review">
      
      <h1 className="heading" id="heading">
        customer's
        <span>review</span>
      </h1>
      <div className="box-container">
        <div className="box">
          <img src={quote} alt="" className="quote" />
          <p>
            "I'm a coffee enthusiast, and I recently tried the new single-origin
            coffee from [Coffee Brand]. The flavor was outstanding; it had a
            delightful balance of fruity and nutty notes. I
            could truly appreciate the quality of the beans. This coffee has now
            become a part of my daily routine, and I couldn't be happier."
          </p>
          <img src={customer1} alt="" className="user" />
          <h3>Lin Dan</h3>
          <div className="stars">
            <AiOutlineStar size={30} className="i" />
            <AiOutlineStar size={30} className="i" />
            <AiOutlineStar size={30} className="i" />
            <AiOutlineStar size={30} className="i" />
            <MdOutlineStarHalf size={30} className="i" />
          </div>
        </div>
        <div className="box">
          <img src={quote} alt="" className="quote" />
          <p>
            "As a parent of a newborn, I can't thank [Coffee Brand] enough for
            their strong and robust dark roast. This coffee is my lifeline every
            morning. It wakes me up, keeps me going, and it's incredibly smooth.
            I love the convenience of ordering online, and the freshness of the
            beans is always top-notch."
          </p>
          <img src={customer2} alt="" className="user" />
          <h3>Alyx star</h3>
          <div className="stars">
            <AiOutlineStar size={30} className="i" />
            <AiOutlineStar size={30} className="i" />
            <AiOutlineStar size={30} className="i" />
            <AiOutlineStar size={30} className="i" />
            <MdOutlineStarHalf size={30} className="i" />
          </div>
        </div>
        <div className="box">
          <img src={quote} alt="" className="quote" />
          <p>
            "I ordered the coffee sampler from [Coffee Brand] and was blown away
            by the diversity of flavors. Each bag was like a journey to a
            different coffee-growing region. I could taste the unique
            characteristics of every bean. It's a coffee lover's dream. I now
            know my favorites for different moods and occasions!"
          </p>
          <img src={customer3} alt="" className="user" />
          <h3>Jeson smith</h3>
          <div className="stars">
            <AiOutlineStar size={30} className="i" />
            <AiOutlineStar size={30} className="i" />
            <AiOutlineStar size={30} className="i" />
            <AiOutlineStar size={30} className="i" />
            <MdOutlineStarHalf size={30} className="i" />
          </div>
        </div>
      </div>
    </section>

  );
};

export default Review;
