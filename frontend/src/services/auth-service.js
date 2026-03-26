import apiClient from "./api-client";

/**
 * Login Funktion
 * Sendet Email + Passwort an Backend und speichert Token
 *
 * @param {string} email - User Email
 * @param {string} password - User Passwort
 * @returns {Promise<Object>} User Daten + Token
 */
export const login = async (usernameOrEmail, password) => {
  try {
    console.log("📧 Login-Versuch für:", usernameOrEmail);

    // POST Request an Backend
    const response = await apiClient.post("/auth/login", {
      usernameOrEmail,
      password,
    });

    // Token aus Response extrahieren, 
    const { token, userId, username, email, role } = response.data;

    // Token in localStorage speichern
    localStorage.setItem("authToken", token);

    // User-Daten auch speichern (für schnellen Zugriff)
    const userData = { id: userId, username, email, role };
    localStorage.setItem("userData", JSON.stringify(userData));

    console.log("✅ Login erfolgreich - Token gespeichert");

    // Gesamte Response zurückgeben (enthält User-Daten)
    return response.data;
  } catch (error) {
    console.error("❌ Login fehlgeschlagen:", error);

    // Fehlermeldung vom Backend extrahieren (falls vorhanden)
    const errorMessage =
      error.response?.data?.message || "Login fehlgeschlagen";

    // Error mit besserer Message werfen
    throw new Error(errorMessage);
  }
};

/**
 * Logout Funktion
 * Löscht Token aus localStorage
 */
export const logout = () => {
  console.log("🚪 Logout - Token wird gelöscht");
  localStorage.removeItem("authToken");
};

/**
 * Prüft ob User eingeloggt ist
 * @returns {boolean} true wenn Token existiert
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token; // !! konvertiert zu boolean
};

/**
 * Gibt den aktuellen Token zurück
 * @returns {string|null} Token oder null
 */
export const getToken = () => {
  return localStorage.getItem("authToken");
};

/**
 * Register Funktion (optional - falls dein Backend das unterstützt)
 * @param {Object} userData - User Registrierungsdaten
 * @returns {Promise<Object>} Registrierungsbestätigung
 */
export const register = async (userData) => {
  try {
    console.log("📝 Registrierung für:", userData.email);

    const response = await apiClient.post("/auth/register", userData);

    console.log("✅ Registrierung erfolgreich");
    return response.data;
  } catch (error) {
    console.error("❌ Registrierung fehlgeschlagen:", error);
    const errorMessage =
      error.response?.data?.message || "Registrierung fehlgeschlagen";
    throw new Error(errorMessage);
  }
};