import React from "react";
import PropTypes from "prop-types";
import styles from "./section_cards.module.scss";
import Card from "@/components/Card";
import Link from "next/link";

const SectionCards = ({ title = "", listMovie = [], size = "medium" }) => {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.cardWrapper}>
        {listMovie.length > 0 &&
          listMovie.map((item, index) => (
            <Link key={index} href={`/video/${item.id}`}>
              <Card imgSrc={item.imgUrl} size={size} />
            </Link>
          ))}
      </div>
    </section>
  );
};

SectionCards.propTypes = {};

export default SectionCards;
