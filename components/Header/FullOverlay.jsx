import gsap from "gsap";
import { useEffect } from "react";

const style = {
  overlay: `h-full w-screen fixed top-0 bg-black opacity-0 z-[-2] hidden`,
};

const FullOverlay = ({
  showFullOverlay,
  setShowSidebar,
  setShowFullOverlay,
  contRef,
}) => {
  useEffect(() => {
    const context = contRef?.current;

    if (!showFullOverlay) return;

    const ctx = gsap.context(() => {
      const overlay = gsap.fromTo(
        ".full-overlay",
        { opacity: 0, zIndex: -2 },
        { opacity: 0.5, zIndex: 30, display: "block" }
      );
      if (showFullOverlay) {
        overlay.play();
      } else {
        overlay.reverse();
      }
    }, context);

    return () => ctx.revert();
  }, [showFullOverlay]);

  return (
    <div
      className={`${style.overlay} ${
        showFullOverlay && style.overlayVisible
      } full-overlay`}
      onClick={() => {
        setShowSidebar(false);
        setShowFullOverlay(false);
      }}
    ></div>
  );
};

export default FullOverlay;
