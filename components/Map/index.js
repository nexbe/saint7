import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const HomeMap = dynamic(() => import("./homeMap"), {
  ssr: false,
});

const HomeMap2 = dynamic(() => import("./homeMap2"), {
  ssr: false,
});

export { Map, HomeMap, HomeMap2 };
