import "./globals.css";

export const metadata = {
  title: "Campus Resolve",
  description: "A platform for campus issue resolution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 