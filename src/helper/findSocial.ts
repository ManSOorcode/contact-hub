function getPlatformFromUrl(url: string): { name: string; icon?: string } {
  const platformMap: Record<string, { name: string; icon?: string }> = {
    linkedin: { name: "LinkedIn", icon: "/icons/linkedln.svg" },
    github: { name: "GitHub", icon: "/icons/github.svg" },
    twitter: { name: "Twitter", icon: "/icons/twitter.svg" },
    facebook: { name: "Facebook", icon: "/icons/facebook.svg" },
    instagram: { name: "Instagram", icon: "/icons/instagram.svg" },
    youtube: { name: "YouTube", icon: "/icons/youtube.svg" },
    x: { name: "Twitter", icon: "/icons/twitter.svg" },
    website: { name: "Website", icon: "/icons/website.svg" },
    whatsapp: { name: "WhatsApp", icon: "/icons/whatsapp.svg" },
  };

  let detected: { name: string; icon?: string } = { name: "Other", icon: "" };
  for (const key in platformMap) {
    if (url.toLowerCase().includes(key)) {
      detected = platformMap[key];
      break;
    }
  }
  return detected;
}

export default getPlatformFromUrl;
