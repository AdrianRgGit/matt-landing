import { useEffect, useRef } from "react";
import { useStore } from "@nanostores/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { closePanel, isPanelOpen } from "../../../stores/panelStores";
import ContactForm from "./ContactForm";
import XIcon from "../../../assets/XIcon";

export default function SlidePanel() {
  const isOpen = useStore(isPanelOpen);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useGSAP(
    () => {
      if (!panelRef.current || !overlayRef.current) return;

      if (isOpen) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(panelRef.current, {
          x: "0%",
          duration: 0.45,
          ease: "power3.out",
        });
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.25,
          ease: "power2.in",
        });

        gsap.to(panelRef.current, {
          x: "100%",
          duration: 0.35,
          ease: "power3.in",
        });
      }
    },
    { dependencies: [isOpen] },
  );

  return (
    <>
      <div
        ref={overlayRef}
        onClick={closePanel}
        className="fixed inset-0 z-50 bg-theme-black/40 opacity-0 pointer-events-none"
      />

      <aside
        ref={panelRef}
        className="fixed top-0 right-0 z-100 h-screen w-full translate-x-full overflow-hidden bg-theme-white md:w-[70%]"
      >
        <div className="relative h-full overflow-y-auto p-10">
          <button
            onClick={closePanel}
            className="absolute top-10 right-10 z-10 rounded-lg bg-theme-blue p-2 cursor-pointer"
          >
            <XIcon color="white" />
          </button>

          <div className="relative w-full min-h-full">
            <div className="space-y-4 pr-16">
              <h2 className="text-6xl">Partner with us</h2>
              <p className="ml-50 max-w-sm font-spacegrotesk-light">
                Share your plans and we'll follow up with a detailed proposal.
              </p>
            </div>

            <div className="mt-12 w-1/2 ml-auto">
              <ContactForm />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
