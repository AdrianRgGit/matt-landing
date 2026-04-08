import { useRef } from "react";
import { useStore } from "@nanostores/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { closePanel, isPanelOpen } from "../../../stores/panelStores";

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
      <div
        ref={overlayRef}
        onClick={closePanel}
        className="fixed inset-0 bg-black/40 z-40 opacity-0 pointer-events-none"
      />
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-[420px]
                   bg-white z-50 translate-x-full shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-medium">Panel</h2>
          <button onClick={closePanel}>✕</button>
        </div>
        <div className="p-6">{/* formulario aquí */}</div>
      </div>
    </>
  );
}
