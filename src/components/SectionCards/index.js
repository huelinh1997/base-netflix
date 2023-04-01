import React from "react";
import PropTypes from "prop-types";
import styles from "./section_cards.module.scss";
import Card from "@/components/Card";
import Link from "next/link";
import classNames from "classnames";

const SectionCards = ({
  title = "",
  listMovie = [],
  size = "medium",
  shouldWrap = false,
  shouldScale = true,
}) => {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div
        className={classNames(styles.cardWrapper, {
          [styles.wrap]: shouldWrap,
        })}
      >
        {listMovie.length > 0 &&
          listMovie.map((item, index) => (
            <Link key={index} href={`/video/${item.id}`}>
              <Card
                imgSrc={item.imgUrl}
                size={size}
                shouldScale={shouldScale}
              />
            </Link>
          ))}
      </div>
    </section>
  );
};

SectionCards.propTypes = {};

export default SectionCards;
