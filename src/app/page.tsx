import BannerSection from '@/components/home/banner-section';
import FeatureSection from '@/components/home/feature-section';
import RecentEvents from '@/components/home/recent-events';
import React from 'react';

const Home = () => {
  return (
    <div>
      <BannerSection/>
      <FeatureSection/>
       <RecentEvents />
    </div>
  );
};

export default Home;