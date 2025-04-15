import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "@/app/App";
import { Providers } from "@/app/Providers";

// eslint-disable-next-line import-x/no-named-as-default-member
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
