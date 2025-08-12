import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function SuperAdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="w-full h-full flex gap-1">
        <div
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex-1`}
        >
          {children}
        </div>
      </main>
    </>
  );
}
