import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomOverlay from "../../ui/customOverlay/CustomOverlay";
import CustomButton from "../../ui/customButton/CustomButton";
import { openPanel } from "../../../stores/panelStores";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const videoContainer = videoContainerRef.current;
      const video = videoRef.current;
      const overlay = overlayRef.current;
      const text = textRef.current;
      const button = buttonRef.current;

      if (!section || !videoContainer || !video || !overlay || !text || !button)
        return;

      const mm = gsap.matchMedia();

      const showHero = () => {
        gsap.set(section, { autoAlpha: 1 });
      };

      const buildDesktop = () => {
        gsap.set(videoContainer, {
          top: "50%",
          right: "2.5rem",
          bottom: "auto",
          left: "auto",
          width: "56.25rem",
          height: "31.25rem",
          yPercent: -50,
          xPercent: 0,
        });

        gsap.set(text, { opacity: 1 });
        gsap.set(button, { opacity: 1 });
        gsap.set(overlay, { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to([text, button], { opacity: 0, duration: 0.3 }, 0);
        tl.to(overlay, { opacity: 0, duration: 0.3 }, 0);

        tl.to(
          videoContainer,
          {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            yPercent: 0,
            duration: 1,
          },
          0,
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      const buildMobileTablet = () => {
        const isMd = window.innerWidth >= 768;
        const buttonBottomOffset = isMd ? 32 : 24;
        const buttonHeight = button.offsetHeight;
        const gapAboveButton = 0;
        const videoBottom = buttonBottomOffset + buttonHeight + gapAboveButton;

        gsap.set(videoContainer, {
          top: isMd ? "6rem" : "8rem",
          left: isMd ? "10rem" : "5rem",
          right: isMd ? "1.5rem" : "0.75rem",
          bottom: `${videoBottom}px`,
          width: "auto",
          height: "auto",
          yPercent: 0,
          xPercent: 0,
        });

        gsap.set(text, { opacity: 1 });
        gsap.set(button, { opacity: 1 });
        gsap.set(overlay, { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to([text, button], { opacity: 0, duration: 0.25 }, 0);
        tl.to(overlay, { opacity: 0, duration: 0.25 }, 0);

        tl.to(
          videoContainer,
          {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            duration: 1,
          },
          0,
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      const init = () => {
        mm.add(
          {
            isDesktop: "(min-width: 1280px)",
            isMobileTablet: "(max-width: 1279px)",
          },
          (context) => {
            const { isDesktop, isMobileTablet } = context.conditions ?? {};

            gsap.killTweensOf([section, videoContainer, overlay, text, button]);

            if (isDesktop) {
              const cleanup = buildDesktop();

              requestAnimationFrame(() => {
                ScrollTrigger.refresh();
                showHero();
              });

              return cleanup;
            }

            if (isMobileTablet) {
              const cleanup = buildMobileTablet();

              requestAnimationFrame(() => {
                ScrollTrigger.refresh();
                showHero();
              });

              return cleanup;
            }
          },
        );
      };

      const handleVideoReady = () => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      };

      init();

      if (video.readyState >= 2) {
        handleVideoReady();
      } else {
        video.addEventListener("loadeddata", handleVideoReady, { once: true });
      }

      const onResize = () => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        video.removeEventListener("loadeddata", handleVideoReady);
        mm.revert();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === section) st.kill();
        });
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden bg-theme-white opacity-0"
    >
      <div
        ref={textRef}
        className="
          absolute left-2.5 top-40 z-20 space-y-20 pr-2.5 mix-blend-difference
          md:left-6 md:top-40 md:max-w-160 md:space-y-8
          xl:left-25 xl:top-1/2 xl:max-w-225 xl:-translate-y-1/2 xl:space-y-14
        "
      >
        <h1
          className="
            text-4xl font-normal text-font-white
            md:text-5xl
            xl:text-6xl
          "
        >
          Making green hydrogen affordable through advanced materials
        </h1>

        <p
          className="
            max-w-70 text-font-white
            md:max-w-96 md:text-xl
            xl:max-w-none xl:text-2xl
          "
        >
          More than ever we need materials technology and innovation to help us
          tackle some of our pressing challenges, such as climate change, for
          humans and the planet.
        </p>
      </div>

      <div
        ref={videoContainerRef}
        className="
          absolute right-2.5 top-32 bottom-[calc(1.5rem+var(--button-h,56px))] left-20 overflow-hidden
          md:left-40 md:right-6 md:top-24 md:bottom-[calc(2rem+var(--button-h,56px))]
          xl:left-auto xl:top-1/2 xl:right-10 xl:h-125 xl:w-225 xl:-translate-y-1/2 xl:bottom-auto
        "
        style={{ ["--button-h" as string]: "56px" }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          
          <source src="https://4cs0hh1kvklgjnqz.public.blob.vercel-storage.com/matt/hero-vid.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <CustomOverlay />
        </div>
      </div>

      <div
        ref={buttonRef}
        className="
          absolute bottom-3 right-2.5 z-30
          md:bottom-4 md:right-6
          xl:bottom-5 xl:right-10
        "
      >
        <CustomButton
          text="Partner with us"
          onClick={() => {
            openPanel();
          }}
        />
      </div>
    </section>
  );
}
