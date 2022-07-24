import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

const Product = ({ data }) => {
  return (
    <>
      <Head>
        <title>section-3</title>
      </Head>

      <main className={styles.main} style={{backgroundColor: "MediumAquamarine"}}>
        <h1>section-3</h1>
        <p>Original layout</p>
        <p>
          you should have a cookie called "ab-section-3" set to
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

