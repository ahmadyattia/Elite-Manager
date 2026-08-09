import { jwtDecode } from "jwt-decode";

const verifyTokenExpiry = (token: string | null) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp) {
      return decoded.exp < currentTime;
    }
  } catch (error) {
    return true;
  }
};

export default verifyTokenExpiry;
