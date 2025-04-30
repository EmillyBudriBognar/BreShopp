import React from "react";

export default function ActionButton({ text, onClick, variant = "solid" }) {
  const baseClasses = "font-bold text-sm py-3 px-6 rounded-full transition-all duration-300 hover:scale-105";
  const solidClasses = "bg-custom-green text-custom-cream shadow-lg hover:bg-custom-earth hover:shadow-xl";
  const outlineClasses = "bg-transparent text-custom-earth border-2 border-custom-olive/30 hover:bg-custom-sage/50 hover:border-custom-olive/50";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variant === "solid" ? solidClasses : outlineClasses}`}
    >
      {text}
    </button>
  );
}