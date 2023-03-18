import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import SectionCards from "@/components/SectionCards";
import { getVideos, getPopularVideos } from "@/lib/videos";
import HeadPage from "@/components/Head";

export async function getServerSideProps() {
  const favoriteVideo = await getVideos("disney trailer");
  const travelVideo = await getVideos("travel");
  const productivityVideo = await getVideos("productivity");
  const popularVideo = await getPopularVideos();
  const technologyVideo = await getVideos("information technology");
  return {
    props: {
      favoriteVideo,
      travelVideo,
      productivityVideo,
      popularVideo,
      technologyVideo,
    },
  };
}

export default function Home({
  favoriteVideo,
  travelVideo,
  productivityVideo,
  popularVideo,
  technologyVideo,
}) {
  return (
    <>
      <HeadPage />
      <main className={styles.main}>
        <Navbar />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
          videoId="4zH5iYM4wJo"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="Disney series"
            listMovie={favoriteVideo}
            size="large"
          />
          <SectionCards title="Travel" listMovie={travelVideo} size="small" />
          <SectionCards
            title="Productivity"
            listMovie={productivityVideo}
            size="medium"
          />
          <SectionCards title="Popular" listMovie={popularVideo} size="small" />
          <SectionCards
            title="Technology"
            listMovie={technologyVideo}
            size="medium"
          />
        </div>
      </main>
    </>
  );
}
