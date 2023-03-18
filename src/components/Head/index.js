import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

const HeadPage = (props) => {
  return (
    <Head>
      <title>Netflix</title>
      <meta name="description" content="netflix" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/static/netflix_icon.png" />
    </Head>
  );
};

HeadPage.propTypes = {};

export default HeadPage;
