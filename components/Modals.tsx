"use client";
import React, { ReactNode } from "react";

type ModalProps = {
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[400px] p-5 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">{title}</h2>
          <button onClick={onClose} className="text-black">✖</button>
        </div>

        {/* Body */}
        <div className="text-black">{children}</div>
      </div>
    </div>
  );
};

export default Modal;