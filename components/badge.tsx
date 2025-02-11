"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const colors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];
const colorMap: { [key: string]: string } = {
  gray: "mr-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10",
  red: "mr-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10",
  yellow:
    "mr-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20",
  green:
    "mr-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20",
  blue: "mr-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10",
  indigo:
    "mr-2 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10",
  purple:
    "mr-2 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10",
  pink: "mr-2 inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10",
};

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const getColorName = colors[randomIndex];
  const temp = colorMap[getColorName as keyof typeof colorMap];
  return temp;
};

interface BadgeProps {
  url?: string;
  name: string;
  pathname?: string;
  color?: string;
  customStyle?: string;
}

export default function Badge(props: BadgeProps) {
  const { url, name, pathname, color, customStyle } = props;
  const router = useRouter();
  const style: string | undefined = colorMap[color ?? ""];
  const [randomColorState,setRandomColorState] = useState<string|null>(null)

  useEffect(() => {
    const randomColor = getRandomColor()
    setRandomColorState(randomColor)
  }, [name, pathname, color, customStyle]);

  if ((color == null || style == null) && customStyle == null && randomColorState != null) {
    // console.log("getRandomColor");
    return (
      <button
        key={name}
        className={randomColorState}
        onClick={() => {
          router.push(`${router.basePath}${pathname}`);
        }}
      >
        {name}
      </button>
    );
  } else {
    // console.log("customStyle", customStyle);
    // console.log("color", color);
    // console.log("style", style);
    // console.log("name", name);

    return (
      <button
        key={name}
        className={style ?? customStyle}
        onClick={() => {
          router.push(`${router.basePath}${pathname}`);
        }}
      >
        {name}
      </button>
    );
  }
}
