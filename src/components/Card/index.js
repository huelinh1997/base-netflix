import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styles from "./card.module.scss";
import { motion } from "framer-motion";
import cls from "classnames";

const Card = ({
  imgSrc = "/static/default.jpg",
  size = "medium",
  shouldScale = true,
}) => {
  const [srcImg, setSrcImg] = useState(imgSrc);
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleErrorImg = () => {
    setSrcImg("/static/default.jpg");
  };

  const shouldScaleHover = shouldScale && {
    whileHover: {
      scale: 1.1,
    },
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(classMap[size], styles.imgMotionWrapper)}
        {...shouldScaleHover}
      >
        <Image
          src={srcImg}
          alt="image"
          layout="fill"
          className={styles.cardImg}
          onError={handleErrorImg}
        />
      </motion.div>
    </div>
  );
};

Card.propTypes = {};

export default Card;
