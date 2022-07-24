import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

const Product = ({ data }) => {
  return (
    <>
      <Head>
        <title>section-2</title>
      </Head>

      <main className={styles.main} style={{backgroundColor: "MediumAquamarine"}}>
        <h1>section-2</h1>
        <p>Original layout</p>
        <p>
          you should have a cookie called "ab-section-2" set to
          "test"
        </p>

        <div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div className="card">
              <h3>
                <Link href="/prefetch-static/section-1">Section 1</Link>
              </h3>
            </div>
            <div className="card">
              <h3>
                <Link href="/prefetch-static/section-2">Section 2</Link>
              </h3>
            </div>
            <div className="card">
              <h3>
                <Link href="/prefetch-static/section-3">Section 3</Link>
              </h3>
            </div>
          </div>
        </div>
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
        params: { slug: `section-${i + 1}` },
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
