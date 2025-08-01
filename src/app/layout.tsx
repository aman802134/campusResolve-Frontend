import NProgressLoader from "@/utils/loader";
import "./globals.css";
import Providers from "./provider";

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
        <NProgressLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
