import React from "react";
import "./Blog.css";
import Blog1 from "../../assests/Blog1.jpg";
import Blog2 from "../../assests/Blog2.jpg";
import Blog3 from "../../assests/Blog3.jpg";
import Layout from "../../components/Layout/Layout";
const Blog = () => {
  return (
    <Layout title="Blogs Coffeeto">
      <section className="blog" id="blog">
        <h1 className="heading">
          Our
          <span>Blog</span>
        </h1>
        <div className="box-container">
          <div className="box">
            <div className="image">
              <img src={Blog1} alt="" />
            </div>
            <div className="content">
              <a href="#" className="title">
                tasty and refreshing coffee
              </a>
              <span>by admin / 21st may,2021</span>
              <p>
                Coffee is more than just a beverage; it's a cultural phenomenon,
                a daily ritual, and a source of inspiration for countless
                individuals around the world. The rich aroma, the comforting
                warmth, and that unmistakable caffeine kick make it a beloved
                elixir for many. In this blog, we'll delve into the fascinating
                world of coffee, exploring its history, the science behind its
                flavor, and how to brew the perfect cup.
              </p>
              <a href="#" className="btn">
                read more
              </a>
            </div>
          </div>
          <div className="box">
            <div className="image">
              <img src={Blog2} alt="" />
            </div>
            <div className="content">
              <a href="#" className="title">
                tasty and refreshing coffee
              </a>
              <span>by admin / 21st may,2021</span>
              <p>
                The story of coffee begins in the lush, tropical regions of
                Africa, where coffee beans were first discovered. From there, it
                embarked on a journey that spanned centuries, crossing
                continents and cultures. We'll trace this captivating history
                and see how coffee has evolved into the global beverage we know
                today.Want to take your coffee passion to the next level? Learn how to roast your beans at home for a truly unique coffee experience.
              </p>
              <a href="#" className="btn">
                read more
              </a>
            </div>
          </div>
          <div className="box">
            <div className="image">
              <img src={Blog3} alt="" />
            </div>
            <div className="content">
              <a href="#" className="title">
                tasty and refreshing coffee
              </a>
              <span>by admin / 21st may,2021</span>
              <p>
                Coffee isn't just a drink; it's a cultural cornerstone. We'll
                discuss the role of coffee in art, literature, and music. We'll
                also touch on coffee's significance in social gatherings,
                business meetings, and the rise of coffeehouse culture.
               From the bright, citrusy notes of Ethiopian Yirgacheffe to the full-bodied, earthy flavors of Sumatra, we'll take a global tour of coffee and highlight some of the most renowned coffee
              </p>
              <a href="#" className="btn">
                read more
              </a>
            </div>
          </div>
        </div>
      </section>
      </Layout>
  );
};

export default Blog;
