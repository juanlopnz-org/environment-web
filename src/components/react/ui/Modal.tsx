import { useEffect } from "react";

export default function Modal({ open, onClose, children }: any) {

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:w-[500px] max-h-[90vh] overflow-auto p-6 mt-auto sm:mt-0 animate-[fadeIn_.2s_ease-out]"
      >
        {children}
      </div>
    </div>
  );
}
