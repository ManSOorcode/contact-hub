"use client";

import {
  User,
  Globe,
  MapPin,
  Phone,
  Mail,
  Plus,
  X,
  Backpack,
  Home,
  // Link,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CardDataTypes } from "../card/CardContainer";
import Link from "next/link";

type ContactFormProps = {
  initialData?: CardDataTypes; // for editing
  contactId?: string; // ID for editing
  mode?: "add" | "edit"; // controls labels
};

interface ContactFormData {
  name: string;
  title: string;
  location: string;
  phone: number;
  email: string;
  urls: string[];
}

interface FormErrors {
  name?: string;
  title?: string;
  location?: string;
  phone?: string;
  email?: string;
  urls?: string[];
}

const ContactForm = ({
  initialData,
  contactId,
  mode = "add",
}: ContactFormProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState<ContactFormData | CardDataTypes>(
    initialData || {
      name: "",
      title: "",
      location: "",
      phone: 0,
      email: "",
      urls: [""],
    }
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: number): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(("" + phone).replace(/\s/g, ""));
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      const urlRegex =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return urlRegex.test(url);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // URLs validation
    const urlErrors: string[] = [];
    formData.urls.forEach((url, index) => {
      if (url.trim() && !validateUrl(url)) {
        urlErrors[index] = "Please enter a valid URL";
      }
    });
    if (urlErrors.length > 0) {
      newErrors.urls = urlErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle input
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // handle URL inputs
  const handleUrlChange = (index: number, value: string) => {
    const updatedUrls = [...formData.urls];
    updatedUrls[index] = value;
    setFormData({ ...formData, urls: updatedUrls });

    // Clear URL errors when user starts typing
    if (errors.urls && errors.urls[index]) {
      const newUrlErrors = [...(errors.urls || [])];
      newUrlErrors[index] = "";
      setErrors((prev) => ({
        ...prev,
        urls: newUrlErrors,
      }));
    }
  };

  const addUrlField = () => {
    setFormData({ ...formData, urls: [...formData.urls, ""] });
  };

  const removeUrlField = (index: number) => {
    const updatedUrls = formData.urls.filter(
      (_: string, i: number) => i !== index
    );
    setFormData({ ...formData, urls: updatedUrls });

    // Remove corresponding error
    if (errors.urls) {
      const newUrlErrors = errors.urls.filter((_, i) => i !== index);
      setErrors((prev) => ({
        ...prev,
        urls: newUrlErrors.length > 0 ? newUrlErrors : undefined,
      }));
    }
  };

  // submit handler
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setErrors({});

    try {
      const method = contactId ? "PUT" : "POST";
      const url = contactId ? `/api/server/${contactId}` : "/api/server";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save contact");
      }

      router.push("/"); // redirect to home
      router.refresh(); // refresh the contact list

      setFormData({
        name: "",
        title: "",
        location: "",
        phone: 0,
        email: "",
        urls: [""],
      });
      alert("Contact saved successfully!");
    } catch (error) {
      console.error(error);
      alert(`Something went wrong. Please try again.${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl px-4 mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6" />
            {mode === "edit" ? "Edit Contact" : "Add New Contact"}
            <Link href="/" className="ml-auto cursor-pointer ">
              <Home className="w-6 h-6 hover:text-violet-800" />
            </Link>
          </h1>
          <p className="text-blue-100 mt-1">
            {mode === "edit"
              ? "Update the details for this contact"
              : "Fill in the details to create a new contact card"}
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <User className="w-4 h-4" />
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                errors.name
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Title Field */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Globe className="w-4 h-4" />
              Title/Position
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="e.g., Software Engineer, Designer"
            />
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="City, State, Country"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Phone className="w-4 h-4" />
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                errors.phone
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="+1 234 567 8910"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Mail className="w-4 h-4" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                errors.email
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* URLs Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Globe className="w-4 h-4" />
                Social Media / Website URLs
              </label>
              <span className="text-xs text-gray-500">
                {formData?.urls?.length}/10 max
              </span>
            </div>

            <div className="space-y-3">
              {formData?.urls?.map((url: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleUrlChange(index, e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                        errors.urls && errors.urls[index]
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      placeholder="https://example.com or https://twitter.com/username"
                    />
                    {errors.urls && errors.urls[index] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.urls[index]}
                      </p>
                    )}
                  </div>

                  {formData?.urls?.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUrlField(index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {formData?.urls?.length < 10 && (
              <button
                type="button"
                onClick={addUrlField}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Another URL
              </button>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? mode === "edit"
                  ? "Updating Contact..."
                  : "Saving Contact..."
                : mode === "edit"
                ? "Update Contact"
                : "Save Contact"}
            </button>
            {errors.email ||
              errors.location ||
              errors.name ||
              errors.phone ||
              errors.title ||
              (errors.urls && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email ||
                    errors.location ||
                    errors.name ||
                    errors.phone ||
                    errors.title ||
                    errors.urls}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
