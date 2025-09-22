"use client";

import Retro404 from "@/components/Retro404";

export default function NotFound() {
  return (
    <html>
      <body
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          backgroundColor: "rgb(185 185 185)",
        }}
      >
        <Retro404 />
      </body>
    </html>
  );
}
