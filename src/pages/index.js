import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import SectionCards from "@/components/SectionCards";
import {
  getVideos,
  getPopularVideos,
  getWatchedAgainVideo,
} from "@/lib/videos";
import { getUserIdFromToken } from "@/lib/util";
import HeadPage from "@/components/Head";

export async function getServerSideProps(context) {
  const token = context?.req ? context.req?.cookies?.token : null;
  const userId = await getUserIdFromToken(token);

  const favoriteVideo = await getVideos("disney trailer");
  const travelVideo = await getVideos("travel");
  const productivityVideo = await getVideos("productivity");
  const popularVideo = await getPopularVideos();
  const technologyVideo = await getVideos("information technology");
  const watchedAgainVideo = await getWatchedAgainVideo(userId, token);

  return {
    props: {
      favoriteVideo,
      travelVideo,
      productivityVideo,
      popularVideo,
      technologyVideo,
      watchedAgainVideo,
    },
  };
}

export default function Home({
  favoriteVideo,
  travelVideo,
  productivityVideo,
  popularVideo,
  technologyVideo,
  watchedAgainVideo,
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
          <SectionCards
            title="Watch again"
            listMovie={watchedAgainVideo}
            size="small"
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
