export function processCommand(command: string): {
  action: string;
  url?: string;
  isBrowserAction: boolean;
} {
  const lowerCmd = command.toLowerCase().trim();

  // Phone/Dialer: "Open phone" or "Open dialer"
  if (lowerCmd.includes("open phone") || lowerCmd.includes("open dialer") || lowerCmd.includes("open keypad") || lowerCmd.includes("opening phone")) {
    return {
      action: "Opening the phone dialer. Don't start prank calling people.",
      url: "tel:",
      isBrowserAction: true,
    };
  }

  // Call specific number: "Call [number]"
  const callMatch = lowerCmd.match(/^call\s+([\d\+\s]+)$/);
  if (callMatch) {
    const number = callMatch[1].replace(/\s+/g, "");
    return {
      action: `Dialing ${callMatch[1]}. Make it quick.`,
      url: `tel:${number}`,
      isBrowserAction: true,
    };
  }

  // Common Apps mapping
  const apps: Record<string, string> = {
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
    twitter: "https://www.twitter.com",
    x: "https://www.x.com",
    gmail: "https://mail.google.com",
    maps: "https://maps.google.com",
    calendar: "https://calendar.google.com",
    linkedin: "https://www.linkedin.com",
    pinterest: "https://www.pinterest.com",
    snapchat: "https://www.snapchat.com",
    youtube: "https://www.youtube.com",
    spotify: "https://www.spotify.com",
    whatsapp: "https://web.whatsapp.com",
  };

  for (const [appName, url] of Object.entries(apps)) {
    if (lowerCmd === `open ${appName}`) {
      return {
        action: `Opening ${appName.charAt(0).toUpperCase() + appName.slice(1)}. Try not to get scrolled to death.`,
        url,
        isBrowserAction: true,
      };
    }
  }

  // General Browsing: "Open [website name]"
  const openMatch = lowerCmd.match(/^open\s+(.+)$/);
  if (
    openMatch &&
    !lowerCmd.includes("youtube") &&
    !lowerCmd.includes("spotify")
  ) {
    let website = openMatch[1].trim().replace(/\s+/g, "");
    if (!website.includes(".")) {
      website += ".com";
    }
    return {
      action: `Opening ${openMatch[1]} for you, ugh.`,
      url: `https://www.${website}`,
      isBrowserAction: true,
    };
  }

  // Media Search: "Play [song/video] on YouTube"
  const ytMatch = lowerCmd.match(/^play\s+(.+?)\s+on\s+youtube$/);
  if (ytMatch) {
    const query = encodeURIComponent(ytMatch[1].trim());
    return {
      action: `Playing ${ytMatch[1]} on YouTube. Don't judge my music taste.`,
      url: `https://www.youtube.com/results?search_query=${query}`,
      isBrowserAction: true,
    };
  }

  // Media Search: "Search [query] on Spotify"
  const spotifyMatch = lowerCmd.match(/^search\s+(.+?)\s+on\s+spotify$/);
  if (spotifyMatch) {
    const query = encodeURIComponent(spotifyMatch[1].trim());
    return {
      action: `Searching ${spotifyMatch[1]} on Spotify. Hope it's a banger.`,
      url: `https://open.spotify.com/search/${query}`,
      isBrowserAction: true,
    };
  }

  // WhatsApp Web: "Send a WhatsApp message to [number] saying [message]"
  const waMatch = lowerCmd.match(
    /^send\s+a\s+whatsapp\s+message\s+to\s+([\d\+\s]+)\s+saying\s+(.+)$/,
  );
  if (waMatch) {
    const number = waMatch[1].replace(/\s+/g, "");
    const message = encodeURIComponent(waMatch[2].trim());
    return {
      action: `Sending your message. Let's hope they reply, Satyam Kashyap.`,
      url: `https://web.whatsapp.com/send?phone=${number}&text=${message}`,
      isBrowserAction: true,
    };
  }

  return { action: "", isBrowserAction: false };
}
