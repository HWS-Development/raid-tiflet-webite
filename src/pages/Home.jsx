import { Hero, Intro, RoomsTeaser, ServicesTeaser, MapEmbed, Reviews } from "../components/home";

export default function Home() {
  return (
    <main id="home">
      <Hero />
      <Intro />
      <RoomsTeaser />
      <ServicesTeaser />
      <Reviews />
      <MapEmbed />
    </main>
  );
}
