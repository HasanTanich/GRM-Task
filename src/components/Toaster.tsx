import type React from "react";
import { useState } from "react";

interface ToasterProps {
  message: string;
  duration?: number;
}

const Toaster: React.FC<ToasterProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  // Hide the toaster after the specified duration
  setTimeout(() => {
    setVisible(false);
  }, duration);

  return visible ? (
    <div className="fixed bottom-16 bg-green-700 border border-green-500 right-[20%] p-4 rounded-lg text-white hover:bg-green-900 font-semibold">
      {message}
    </div>
  ) : null;
};

export default Toaster;
