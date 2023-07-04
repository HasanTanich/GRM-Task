import { useRef, type ReactNode } from "react";
import ReactDOM from "react-dom";
import { VscClose } from "react-icons/vsc";
import { useOnClickOutside } from "../hooks/use-on-click-outside";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Dialog = ({ open, onClose, children }: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dialogRef, () => {
    onClose();
  });

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10 bg-zinc-900/50">
      <div className="container flex items-center justify-center h-full max-w-2xl mx-auto">
        <div
          className="relative bg-white w-[90%] h-fit pt-20 pb-28 px-2 rounded-lg"
          ref={dialogRef}
        >
          <h3 className="absolute w-3/4 text-lg font-semibold top-4 left-4 text-slate-800">
            Fill in the required fields please
          </h3>
          <CloseButton onClick={onClose} />
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("form-dialog") as HTMLElement
  );
};

export default Dialog;

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <div className="absolute top-4 right-4 hover:scale-[120%]">
    <VscClose onClick={onClick} className="w-6 h-6 cursor-pointer" />
  </div>
);
