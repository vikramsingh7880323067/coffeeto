
import React from "react";
import Footer from "./Footer/Footer";
import {Helmet} from "react-helmet";
import Headers from "./Headers/Headers";

const Layout = ({  children,title,description,keywords,author  }) => {
  return (
     <div>
      <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <title>{title}</title>
  </Helmet>
      <Headers/>
      <main style={{ minHeight: "125vh" }}>{children}</main>
      <Footer/>
    </div>
  );
};
Layout.defaultProps={
  title:"Ecommerce app",
  description:"mern stack application",
  keywords:"mern ,react,mongodb,node,express",
  author:"vikram",
};

export default Layout;




// import React from "react";
// import Headers from "../Headers/Headers";
// import Footer from "../Footer/Footer";
// import {Helmet} from "react-helmet";
// const Layout = ({ children,title,description,keywords,author }) => {
//   return (
    
//     <div>
//        <Helmet>
//       <meta charSet="utf-8" />
//       <meta name="description" content={description} />
//       <meta name="keywords" content={keywords} />
//       <meta name="author" content={author} />
//       <title>{title}</title>
//   </Helmet>
//       <Headers />
//       <main style={{ minHeight: "70vh" }}>{children}
//       </main>
    
//       <Footer/>
//     </div>
//   );
// };
// Layout.defaultProps={
//   title:"Ecommerce app",
//   description:"mern stack application",
//   keywords:"mern ,react,mongodb,node,express",
//   author:"vikram",
// };

// export default Layout;