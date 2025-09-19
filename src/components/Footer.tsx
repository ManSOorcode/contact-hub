"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="row-start-3 flex items-center justify-center container mx-auto p-4  font-poppins font-semibold">
      <p className="text-gray-600">
        © {new Date().getFullYear()} Contact HUB. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
