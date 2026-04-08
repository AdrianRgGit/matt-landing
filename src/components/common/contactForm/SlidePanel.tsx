import { useRef } from "react";
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
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closePanel}
        className="fixed inset-0 z-50 bg-theme-black/40 opacity-0 pointer-events-none"
      />

      <aside
        ref={panelRef}
        className="fixed p-2.5 top-0 right-0 h-full w-[70%] bg-theme-white z-100 translate-x-full"
      >
        <div className="relative w-full h-full">
          <h2 className="">Panel</h2>
          <button
            onClick={closePanel}
            className="fixed top-5 right-5 bg-theme-blue p-2 rounded-lg cursor-pointer"
          >
            <XIcon color="white" />
          </button>

          <div className="p-6">
            <ContactForm />
          </div>
        </div>
      </aside>
    </>
  );
}
