import { useState, useCallback } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Services from '@/components/Services';
import Masters from '@/components/Masters';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Calculator from '@/components/Calculator';
import Prices from '@/components/Prices';
import Certificate from '@/components/Certificate';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import SoundToggle from '@/components/SoundToggle';
import { services, masters } from '@/data';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectService, setPreselectService] = useState<string | undefined>();
  const [preselectMaster, setPreselectMaster] = useState<string | undefined>();

  const openBooking = useCallback((serviceOrMasterId?: string) => {
    if (serviceOrMasterId) {
      const service = services.find((s) => s.id === serviceOrMasterId);
      if (service) {
        setPreselectService(service.title);
        return;
      }
      const master = masters.find((m) => m.id === serviceOrMasterId);
      if (master) {
        setPreselectMaster(master.name);
        return;
      }
      const masterByName = masters.find((m) => m.name === serviceOrMasterId);
      if (masterByName) {
        setPreselectMaster(masterByName.name);
      }
    }
  }, []);

  const handleBook = useCallback(
    (id?: string) => {
      if (id) openBooking(id);
      setBookingOpen(true);
    },
    [openBooking],
  );

  const handleClose = () => {
    setBookingOpen(false);
    setPreselectService(undefined);
    setPreselectMaster(undefined);
  };

  return (
    <>
      <CustomCursor />
      <SoundToggle />
      <Navbar onBook={() => setBookingOpen(true)} />
      <main>
        <Hero onBook={() => setBookingOpen(true)} />
        <Philosophy />
        <Services onBook={handleBook} />
        <Masters onBook={handleBook} />
        <Process />
        <Gallery />
        <Reviews />
        <Calculator onBook={handleBook} />
        <Prices onBook={() => setBookingOpen(true)} />
        <Certificate onBook={() => setBookingOpen(true)} />
      </main>
      <Footer />
      <BookingModal
        open={bookingOpen}
        onClose={handleClose}
        preselectService={preselectService}
        preselectMaster={preselectMaster}
      />
    </>
  );
}
