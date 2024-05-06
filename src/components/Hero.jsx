import React from "react";
import Pattern from "@/components/Pattern";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gray-50">
      <div
        className="hidden sm:absolute sm:inset-y-0 sm:block sm:h-full sm:w-full"
        aria-hidden="true"
      >
        <div className="relative mx-auto h-full max-w-7xl">
          <Pattern />
        </div>
      </div>
      <div className="relative pb-16 pt-6 sm:pb-24">
        <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">
                Find comfort in every corner.
              </span>{" "}
              <br />
              <span className="text-4xl font-bold tracking-tight text-theme-primary sm:text-5xl">
                Welcome to your home away from home at Ali Hostels.
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Ali Hostels is one of the best hostels in Pakistan that provides
              quality and comfort. We offer a variety of services to make your
              stay as comfortable as possible.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-theme-primary px-8 py-3 text-base font-medium text-white hover:bg-theme-primary md:px-10 md:py-4 md:text-lg"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;
