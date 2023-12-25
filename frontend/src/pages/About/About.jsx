import React from "react";
import "./About.css";
import about from "../../assests/about.jpg"
import Layout from "../../components/Layout/Layout";
const About = () => {
  return (
    <Layout title="About-us Coffeeto">
      <section className="about" id="about">
        <h1 className="heading">
          <span>about</span>
          us
        </h1>
        <div className="row">
          <div className="image">
            <img src={about} alt="about" />
          </div>
          <div className="content">
            <h3>What makes our coffee special</h3>
            <p>
              Our coffee is special because of its exceptional sourcing. We
              carefully select high-quality beans from renowned regions,
              ensuring rich, distinct flavors. The meticulous roasting process
              enhances the beans' potential, providing a unique taste profile.
              Additionally, our commitment to sustainable and ethical practices
              reflects our dedication to both flavor and responsibility, making
              each cup truly special.
            </p>
            <p>
              In the brewing process, we prioritize freshness and
              personalization. We offer a variety of brewing methods and
              encourage experimentation, empowering you to tailor your coffee to
              your unique taste preferences. Whether you prefer the bright notes
              of an Ethiopian Yirgacheffe or the deep, chocolatey tones of a
              Colombian bean, our coffee allows you to explore the world's
              coffee regions one cup at a time.
            </p>
            <div className="btn">learn more</div>
          </div>
        </div>
      </section>
      
      </Layout>
  );
};

export default About;
