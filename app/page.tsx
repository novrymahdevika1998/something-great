"use client";

import gsap from 'gsap';
import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import { SplitText} from 'gsap/all'
import { GSDevTools } from 'gsap/GSDevTools'

gsap.registerPlugin(SplitText);
gsap.registerPlugin(GSDevTools);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(
    () => {
      const split = new SplitText(".title", {
        type: "words, chars",
        wordsClass: "title-word++",
        charsClass: "title-char++",
        mask: "chars"
      });
      
      const tl = gsap.timeline()
      
      tl.from(".title-word1 .title-char", {
        y: "100%",
        duration: 0.5,
        stagger: 0.07,
        ease: "circ.out",
      })
      
      tl.from(".title-word2 .title-char", {
        x: "-100%",
        duration: 0.5,
        stagger: 0.07,
        ease: "circ.out",
      }, "-=0.5s")
      
      tl.from(".tl-start", {
        height: 0,
        duration: 0.5,
        ease: "circ.out",
      }, "<")
      
      tl.from(
        ".tl-main",
        {
          width: 0,
          duration: 0.8,
          ease: "circ.out",
        },
        "<+0.2s"
      );
      
      tl.from(
        ".title-word3 .title-char",
        {
          y: "-100%",
          duration: 0.3,
          stagger: 0.07,
          ease: "circ.out",
        },
        "-=0.5s"
      );
      
      tl.to(
        ".tl-dot",
        {
          opacity: 1,
          duration: 0.01,
          repeat: 6,
          yoyo: true,
          repeatDelay: 0.05,
          ease: "circ.out",
        },
        1
      );

      if (process.env.NODE_ENV === "development") {
        new GSDevTools.create({ animation: tl });
      }
    },
    {
      scope: containerRef,
    }
  );

  return (
    <div className="bg-blue-300 text-black">
      <div
        ref={containerRef}
        className="bg-blue-300 text-black flex h-screen items-end justify-left overflow-hidden"
      >
        <h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
          Coming
          <br />
          Soon!
        </h1>
      </div>
    </div>
  );
}
