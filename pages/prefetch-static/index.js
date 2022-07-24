import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const Prefetch = () => {
  return (
    <main className={styles.main}>
      <p>Hovering over links should prefetch "ab-section" cookies</p>
      <div className="grid">
        <div className="card">
          <h3>
            <Link href="/prefetch/section-1">
              Section 1
            </Link>
          </h3>
        </div>
        <div className="card">
          <h3>
            <Link href="/prefetch/section-2">
              Section 2
            </Link>
          </h3>
        </div>
        <div className="card">
          <h3>
            <Link href="/prefetch/section-3">
              Section 3
            </Link>
          </h3>
        </div>
      </div>
    </main>
  );
}
 
export default Prefetch;