import { Inter, Lato, Poppins } from "next/font/google";
import "../globals.css";
import "animate.css";
import ToasterProvider from "@/utils/ToasterProvider";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppProvider } from "@/utils/AppContext";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Solar Hub NG",
  description: "We sell, install and maintain solar equipments",
  icons: {
    icon: '/assets/solarhub-icon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppProvider>
          <ToasterProvider />
          <Header />
          <Navbar />
          <div>{children}</div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
