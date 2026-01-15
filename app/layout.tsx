import "./globals.css";

export const metadata = {
  title: "Ralph Carbo | AI Engineer",
  description: "AI Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem("theme");
                  if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
