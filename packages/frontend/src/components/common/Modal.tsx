import React, { memo } from "react";
import { IoClose } from "react-icons/io5";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = memo(
    ({ isOpen, onClose, children, title }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <div className="mb-4 flex justify-between ">
                        <h2 className="font-bold">
                            {title || "Create Course"}
                        </h2>
                        <button onClick={onClose}>
                            <IoClose className="w-6 h-6 hover:text-red-500" />
                        </button>
                    </div>
                    <hr />
                    {children}
                </div>
            </div>
        );
    }
);

export default Modal;
