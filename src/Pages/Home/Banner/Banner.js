import React from "react";
import chair from "../../../assets/images/chair.png"
import bgchair from "../../../assets/images/bg.png"
const Banner = () => {
  return (
    <div>
      <div className="hero rounded-xl" style={{backgroundImage: `url(${bgchair})`}}>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={chair} className="rounded-lg shadow-2xl md:w-1/2 sm:w-full" alt=""/>
    <div>
      <h1 className="text-5xl font-bold">YOUR NEW SMILE STARTS HERE</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default Banner;
