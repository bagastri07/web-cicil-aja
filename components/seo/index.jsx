import React from "react";
import Head from "next/head";

function Seo({ page }) {
  let newPage;
  page ? (newPage = `${page} - Cicil`) : page;

  return (
    <Head>
      <title>{newPage}</title>
      <meta name="description" content="Cicil Aja" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default Seo;
