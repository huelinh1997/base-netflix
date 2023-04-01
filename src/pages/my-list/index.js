import React from "react";
import styles from "@/styles/myList.module.css";
import Navbar from "@/components/Navbar";
import SectionCards from "@/components/SectionCards";
import { getMyList } from "@/lib/videos";
import { getUserIdFromToken } from "@/lib/util";
import HeadPage from "@/components/Head";
import PropTypes from "prop-types";

export async function getServerSideProps(context) {
  const token = context?.req ? context.req?.cookies?.token : null;
  const userId = await getUserIdFromToken(token);
  if (!userId) {
    return {
      props: {},
    };
    // return {
    //   props: {},
    //   redirect: {
    //     destination: "/login",
    //     permanent: false,
    //   },
    // };
  }
  const myList = await getMyList(userId, token);

  return {
    props: {
      myList,
    },
  };
}

const MyList = ({ myList }) => {
  return (
    <>
      <HeadPage />
      <main className={styles.main}>
        <Navbar />

        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My list"
            listMovie={myList}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </>
  );
};

export default MyList;
