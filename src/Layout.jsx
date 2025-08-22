import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/ui/WhatsAppFab";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div> 
      
      <WhatsAppFab
        phone="212663434144"
        message="Hi Dar Tiflet! I'd like to ask about availability 😊"
        bottom={24}
        right={20}
      />
    </>
  );
}
