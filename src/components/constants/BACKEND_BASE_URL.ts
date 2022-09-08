const BACKEND_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://bhawick-melissa-pastebin.onrender.com"
    : "http://localhost:4000";

export default BACKEND_BASE_URL;
