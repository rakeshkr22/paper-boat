import Head from "next/head";
import Header from "../../components/Header";
import Start from "../../components/Start";
import Footer from "../../components/Footer";
import { NextSeo } from "next-seo";

export default function StartHome() {
  return (
    <div className="text-black">
      <NextSeo
        title="Start: PaperBoat"
        description="Welcome to PaperBoat homepage."
        canonical="https://nine4-2.vercel.app/"
        openGraph={{
          url: "https://nine4-2.vercel.app/",
        }}
      />
      <Head>
        <title>Paper Boat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Start />
      <Footer />
    </div>
  );
}
