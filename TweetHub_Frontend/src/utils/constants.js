export const TWEET_MAX_LENGTH = 280;
export const BIO_MAX_LENGTH = 160;
export const NAME_MAX_LENGTH = 50;

export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  PROFILE: "/profile/:id",
  EXPLORE: "/explore",
  BOOKMARKS: "/bookmarks",
  NOTIFICATIONS: "/notifications",
  MESSAGES: "/messages",
  SETTINGS: "/settings",
};

export const NOTIFICATION_TYPES = {
  LIKE: "like",
  REPLY: "reply",
  RETWEET: "retweet",
  FOLLOW: "follow",
  MENTION: "mention",
};

export const TWEET_SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "trending", label: "Trending" },
];

export const USER_ROLES = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
  PREMIUM: "premium",
};

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
