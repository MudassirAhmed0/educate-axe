import React, { useEffect, useState } from "react";
import Hero from "../components/hero/Hero";
import Layout from "../components/layout/Layout";
import Video from "../components/video/Video";
import ImgTextHeading from "../components/img-text-heading/ImgTextHeading";
import ImgTextRL from "../components/img-text-RL/ImgTextRL";
import ImgTextLR from "../components/img-text-LR/ImgTextLR";
import AppsSlider from "../components/apps-slider/AppsSlider";
import TrustedBrands from "../components/trusted-brands/TrustedBrands";
import GetApp from "../components/get-app/GetApp";
import ContactTeam from "../components/contact-team/ContactTeam";

const Home = () => {

  useEffect(() => {
    let scrollValue = document
      .getElementById("contact-team-section")
      .getBoundingClientRect().top;
    if (window.location.hash) {
      setTimeout(() => {
        window.scroll(0, scrollValue + 570);
      }, 1000);
    }
  }, []);

  return (
    <Layout>
      <Hero />
      <AppsSlider bgGray />
      <Video />
      <ImgTextHeading />
      <ImgTextRL bgGray />
      <ImgTextLR bgwhite />
      <TrustedBrands bgGray />
      <GetApp bgwhite />
      <ContactTeam bgwhite />
    </Layout>
  );
};

export default Home;
