import "@/styles/globals.css";
import { Roboto_Slab } from "next/font/google";
import { magic } from "@/lib/magic-link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

const roboto = Roboto_Slab({
  weight: ["400", "700"],
  // style: ["normal", "italic"],
  subsets: ["latin"],
});

// If use local font:
// import localFont from '@next/font/local';
// const myFont = localFont({src: './my-font.woff2'})

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     setIsLoading(true);
  //     const isLoggedIn = await magic.user.isLoggedIn();
  //     if (isLoggedIn) {
  //       return router.push("/");
  //     }
  //     router.push("/login");
  //   };
  //   checkLoggedIn();
  // }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <main className={roboto.className}>
      {isLoading ? <Loading /> : <Component {...pageProps} />}
    </main>
  );
}
