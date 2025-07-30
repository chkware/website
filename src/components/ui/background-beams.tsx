"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
    "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
    "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
    "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
  ];

  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full bg-gradient-to-t from-blue-950 via-blue-900 to-blue-800 opacity-20",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1065_8)">
          {paths.map((path, index) => (
            <path
              key={index}
              d={path}
              stroke={`url(#paint${index}_linear_1065_8)`}
              strokeOpacity="0.05"
              strokeWidth="0.5"
            />
          ))}
        </g>
        <defs>
          <clipPath id="clip0_1065_8">
            <rect width="696" height="316" fill="white" />
          </clipPath>
          {paths.map((_, index) => (
            <linearGradient
              key={index}
              id={`paint${index}_linear_1065_8`}
              x1="43.376"
              y1="128.178"
              x2="616.67"
              y2="128.178"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="0.325" stopColor="#18CCFC" />
              <stop offset="1" stopColor="#6344F5" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
};