import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "@/styles/videos.module.scss";
import clsx from "classnames";
import Navbar from "@/components/Navbar";
import { getVideoById } from "@/lib/videos";
import HeadPage from "@/components/Head";
import Like from "@/components/icons/likeIcon";
import DisLike from "@/components/icons/DisLikeIcon";

export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const videoArr = await getVideoById(videoId);

  return {
    props: {
      video: videoArr.length ? videoArr[0] : {},
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideoId = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

  const paths = listOfVideoId.map((videoId) => ({
    params: { videoId },
  }));
  return { paths, fallback: "blocking" };
}

Modal.setAppElement("#__next");

const VideoSpecific = ({ video }) => {
  const router = useRouter();
  const videoId = router?.query?.videoId;
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);
  const updateUserHistory = async (favourited = null) => {
    return await fetch("/api/user-history", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const getUserHistory = async () => {
    const response = await fetch(`/api/user-history?videoId=${videoId}`, {
      method: "GET",
    });
    const videoInfo = await response?.json();

    if (videoInfo.length > 0) {
      videoInfo[0]?.favourited === 1 && setToggleLike(true);
      videoInfo[0]?.favourited === 0 && setToggleDisLike(true);
    } else {
      // update watched video
      await updateUserHistory();
    }
  };
  useEffect(() => {
    getUserHistory();
  }, []);

  const handleToggleLike = async () => {
    const val = !toggleLike;
    setToggleLike(!toggleLike);
    toggleDisLike && setToggleDisLike(false);
    const favourited = val ? 1 : toggleDisLike ? 0 : null;
    await updateUserHistory(favourited);
  };

  const handleToggleDisLike = async () => {
    const val = !toggleDisLike;
    setToggleDisLike(val);
    toggleLike && setToggleLike(false);
    const favourited = val ? 0 : toggleLike ? 1 : null;
    await updateUserHistory(favourited);
  };

  const { publishTime, title, description, channelTitle, viewCount } = video;
  return (
    <div className={styles.container}>
      <HeadPage />
      <Navbar />
      <iframe
        id="player"
        type="text/html"
        width="100%"
        height="390"
        src={`http://www.youtube.com/embed/${router?.query?.videoId}?&autoplay=1&enablejsapi=1&origin=http://example.com&controls=0&rel=0`}
        frameborder="0"
        className={styles.videoPlayer}
      ></iframe>
      <div className={styles.likeDislikeBtnWrapper}>
        <div className={styles.likeBtnWrapper}>
          <button className={styles.btnWrapper} onClick={handleToggleLike}>
            <Like selected={toggleLike} />
          </button>
        </div>
        <button className={styles.btnWrapper} onClick={handleToggleDisLike}>
          <DisLike selected={toggleDisLike} />
        </button>
      </div>
      <div className={styles.modalBody}>
        <div className={styles.modalBodyContent}>
          <div className={styles.col1}>
            <p className={styles.publishTime}>{publishTime}</p>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.col2}>
            <p className={clsx(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>Cast: </span>
              <span className={styles.channelTitle}>{channelTitle}</span>
            </p>
            <p className={clsx(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>View Count: </span>
              <span className={styles.channelTitle}>{viewCount}</span>
            </p>
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={isOpenModal}
        contentLabel={"Example Modal"}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        
      </Modal> */}
    </div>
  );
};

VideoSpecific.propTypes = {};

export default VideoSpecific;
