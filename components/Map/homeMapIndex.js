import dynamic from "next/dynamic";

const HomeMap = dynamic(() => import("./homeMap"), {
  ssr: false,
});

export default HomeMap;
