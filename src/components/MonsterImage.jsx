import React, { useState, useEffect } from "react";
import "./MonsterImage.css";

const sizeMulti = 3;

export default function MonsterImage({ src, alt, feedback }) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const image = require(`../assets/monsters_images/${src}`);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () =>
      setSize({
        width: img.width * sizeMulti,
        height: img.height * sizeMulti,
      });
  }, [image]);

  return (
    <div className={"monster-image" + (!!feedback ? " transparent" : "")}>
      <img
        src={image}
        alt="Monstre à deviner. Si l'image ne s'affiche pas, recharger la page."
        style={{ width: size.width, height: size.height }}
      />
    </div>
  );
}
