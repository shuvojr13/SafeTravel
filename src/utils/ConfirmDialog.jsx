import React from "react";
import { X, CheckCircle, Trash2, PlusCircle } from "lucide-react";

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  type = "info", 
}) => {
  if (!open) return null;

  const icon =
    type === "remove" ? (
      <Trash2 className="text-red-500 w-8 h-8" />
    ) : type === "add" ? (
      <PlusCircle className="text-green-500 w-8 h-8" />
    ) : (
      <CheckCircle className="text-indigo-500 w-8 h-8" />
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          onClick={onCancel}
        >
          <X />
        </button>
        <div className="flex flex-col items-center">
          {icon}
          <h2 className="mt-3 text-xl font-bold text-gray-800 dark:text-gray-100 text-center">{title}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">{description}</p>
          <div className="mt-6 flex gap-4">
            <button
              className={`px-5 py-2 rounded-lg font-semibold shadow cursor-pointer ${
                type === "remove"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : type === "add"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              } transition`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            <button
              className="cursor-pointer px-5 py-2 rounded-lg font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              onClick={onCancel}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;