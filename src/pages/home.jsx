import React from "react";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto my-8">
        <Stats />
        <Pricing />
        <div className="bg-gray-50 px-6 py-12 sm:py-16 lg:px-8" id="contact">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base font-semibold leading-7 text-theme-primary">
              Get the help you need
            </p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Support center
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              For more information, and for booking a room, please contact us on
              our support center.
              <br />
              You can contact us on: <strong>+92 300 1234567</strong>
            </p>
          </div>
        </div>
        <Team />
      </div>
      <footer className="bg-gray-50 pt-12 pb-6 text-center">
        {/* copyright */}
        <p className="text-base text-gray-500">
          © 2024 Ali Hostels. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
