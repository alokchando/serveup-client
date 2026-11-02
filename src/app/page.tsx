import BannerSection from "@/components/home/banner-section";
import PastEventGallery from "@/components/home/event-gallery";
import FeatureSection from "@/components/home/feature-section";
import RecentEvents from "@/components/home/recent-events";
import NewsletterSection from "@/components/home/newsletter-section";
import React from "react";

const Home = () => {
  return (
    <div>
      <BannerSection />
      <FeatureSection />
      <RecentEvents />
      <PastEventGallery />
      <NewsletterSection />
    </div>
  );
};

export default Home;
