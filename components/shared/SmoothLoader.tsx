"use client";
import { useEffect } from "react";

//loader for locomotive-scroll async
export default function SmoothLoader() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  return <></>;
}
