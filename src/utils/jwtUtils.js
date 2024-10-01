// src/utils/jwtUtils.js

export const decodeJWT = (token) => {
    if (!token) return null;
  
    const payload = token.split('.')[1];
    if (!payload) return null;
  
    const decodedPayload = JSON.parse(atob(payload)); // Decode base64 URL-encoded payload
    return decodedPayload; // Return the decoded payload
  };
  