import dynamic from "next/dynamic";

const HomeMap2 = dynamic(() => import("./homeMap2"), {
  ssr: false,
});

export default HomeMap2;
