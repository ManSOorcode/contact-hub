"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  User,
  MessageCircleIcon,
  PhoneIcon,
  Edit,
  Delete,
  Trash2,
} from "lucide-react";
import getPlatformFromUrl from "@/helper/findSocial";
import { CardDataTypes } from "./CardContainer";

const Card = ({
  cardData,
  handleEdit,
  handleDelete,
}: {
  cardData: CardDataTypes;
  handleEdit: () => void;
  handleDelete: () => void;
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  if (!cardData) return null;

  // Sample social icons data
  // const socialLinks = [
  //   {
  //     name: "Instagram",
  //     icon: "/icons/instagram.svg",
  //     url: "https://instagram.com/dummy",
  //   },
  //   { name: "Twitter", icon: "/icons/x.svg", url: "https://twitter.com/dummy" },
  //   {
  //     name: "Facebook",
  //     icon: "/icons/facebook.svg",
  //     url: "https://facebook.com/dummy",
  //   },
  //   {
  //     name: "GitHub",
  //     icon: "/icons/github.svg",
  //     url: "https://github.com/dummy",
  //   },
  //   {
  //     name: "WhatsApp",
  //     icon: "/icons/whatsapp.svg",
  //     url: "https://wa.me/918828674110",
  //   },
  // ];

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50/30 shadow-xl rounded-3xl w-full max-w-4xl hover:shadow-2xl transition-transform duration-300 border border-gray-100/50 backdrop-blur-sm">
      <div className="flex relative flex-col md:flex-row md:p-8 md:gap-8 p-4 transition-all ease-out duration-300 group">
        {/* Action Buttons - Top Right */}
        <div className="absolute top-4 right-4 z-30 flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 rounded-lg bg-white/90 hover:bg-white border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md group/edit"
            title="Edit Profile"
          >
            <Edit className="w-4 h-4 text-gray-600 group-hover/edit:text-blue-500" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-white/90 hover:bg-white border border-gray-200 hover:border-red-300 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md group/delete"
            title="Delete Profile"
          >
            <Trash2 className="w-4 h-4 text-gray-600 group-hover/delete:text-red-500" />
          </button>
        </div>

        {/* Left Section - Image */}
        <div className="flex-shrink-0 mb-6 md:mb-0 flex flex-col justify-center ">
          <div className="relative ">
            <div className=" h-64 md:w-48 md:h-48 rounded-2xl md:rounded-full overflow-hidden md:shadow-2xl ring-4 ring-white/50">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-60  md:bg-gradient-to-br md:from-amber-400 md:via-orange-500 md:to-yellow-600 flex items-center justify-center">
                <User className="w-20 h-20 text-white/90" />
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full animate-pulse md:hidden"></div>
                <div
                  className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full animate-pulse md:hidden"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
            {/* Online indicator */}
            <div className="absolute hidden  bottom-4 right-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg md:flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-4 left-4 z-20 md:hidden ">
              <div className="flex items-center gap-2 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Online
              </div>
            </div>
          </div>
          <div className="md:flex gap-3 mt-6 justify-between hidden">
            <button className=" bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
              <MessageCircleIcon />
            </button>
            <button className=" bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
              <PhoneIcon />
            </button>
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="md:flex-1 flex flex-col justify-center space-y-6 ">
          {/* Name and Title */}
          <div className="">
            <div className="flex justify-center md:justify-start items-center gap-3 mb-2">
              <h2 className="text-2xl   md:text-3xl font-bold text-gray-900">
                {cardData?.name}
              </h2>
              {/* <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                {`${cardData?.name[0]}  ${
                  cardData?.name[cardData?.name?.length - 1]
                }`}
              </span> */}
            </div>
            <p className="text-lg text-gray-600 font-medium mb-2 text-center md:text-left">
              {cardData?.title || "Frontend Developer"}
            </p>
            <div className="flex justify-center md:justify-start items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm">{cardData?.location}</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className=" md:flex inline-block gap-3 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center md:hidden">
              Connect With Me
            </h3>
            <div className="flex justify-center gap-3">
              {cardData?.urls?.map((social, index) => (
                <button
                  key={index}
                  onClick={() => window.open(social, "_blank")}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group/link relative"
                  title={getPlatformFromUrl(social).name}
                >
                  {getPlatformFromUrl(social)?.icon?.length !== 0 ? (
                    <Image
                      src={getPlatformFromUrl(social)?.icon || ""}
                      alt="social icon"
                      width={20}
                      height={20}
                      className="inline-block"
                    />
                  ) : (
                    <span className="text-lg">🔗</span>
                  )}

                  <ExternalLink className="w-2 h-2 text-gray-400 hidden group-hover/link:block absolute top-1 right-1  opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 mb-6 md:mb-0">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Phone</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {cardData?.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard("+91 8828674110", "phone")}
                className="p-2 rounded-lg bg-white/50 hover:bg-white border border-blue-200 hover:border-blue-300 transition-all duration-200 hover:scale-105"
              >
                {copiedField === "phone" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-blue-500" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {cardData?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard("dummy@gmail.com", "email")}
                className="p-2 rounded-lg bg-white/50 hover:bg-white border border-purple-200 hover:border-purple-300 transition-all duration-200 hover:scale-105"
              >
                {copiedField === "email" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-purple-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-3 md:hidden">
            <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Message
            </button>
            <button className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Call Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
