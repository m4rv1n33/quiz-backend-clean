import React from "react";
import AuthTest from "../components/auth-test.jsx"; // ← NEU!

const Home = () => {
  return (
    <div>
      <p>Teste hier den AuthContext:</p>
      {/* Test Component */}
      <AuthTest /> {/* ← NEU! */}
    </div>
  );
};

export default Home;
