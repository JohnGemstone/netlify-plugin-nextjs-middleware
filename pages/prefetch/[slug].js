import Head from "next/head";
import styles from "../../styles/Home.module.css";

const Product = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.params.slug}</title>
      </Head>

      <main className={styles.main}>
        <h1>{data.params.slug}</h1>
        <p>Original layout</p>
        <p>you should have a cookie called "ab-{data.params.slug}" set to "original"</p>
      </main>
    </>
  );
};

export default Product;

export async function getStaticPaths() {
  const paths = Array(3)
    .fill("")
    .map((p, i) => {
      return {
        params: { slug: `section-${i+1}` },
      };
    });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      data: { params },
    },
  };
}
