import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "contexts/JWTAuth";
import SettingsProvider from "contexts/settingsContext";
import App from "./App";
import "nprogress/nprogress.css";
import "simplebar-react/dist/simplebar.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
      <SettingsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SettingsProvider>
  </React.StrictMode>);