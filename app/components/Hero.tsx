"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShineBorderDemo } from "./ShineBorderDemo";
import Image from "next/image";
import { useEffect, useState } from "react";
import AnimationContainer from "@/components/animationContainer";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative isolate">
      <div className="max-w-7xl mx-auto px-2 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <AnimationContainer delay={0.3}>
            <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text text-5xl font-medium leading-none tracking-tighter text-transparent text-balance mb-3 md:mb-6 sm:text-6xl md:text-7xl lg:text-8xl font-['Playwrite+AU+SA'] pb-2">
              Transform Your Ideas Into
              <br className="hidden md:block" /> Stunning AI Art.
            </h1>
            <p className="text-lg tracking-tight text-muted-foreground md:text-xl text-balance">
              Create beautiful, unique images in seconds with our advanced AI image generator. No
              technical skills required - just describe what you want to see.
            </p>
          </AnimationContainer>
          <AnimationContainer delay={0.5}>
            <div className="mt-8 md:mt-12 flex items-center justify-center gap-x-6">
              <Link href="/create">
                <Button
                  size="lg"
                  effect="expandIcon"
                  icon={ArrowRight}
                  iconPlacement="right"
                  className="rounded-full"
                >
                  Start Creating
                </Button>
              </Link>
            </div>
          </AnimationContainer>

          <AnimationContainer delay={1}>
            <div className="relative mt-[8rem]">
              <div className="mt-10 md:mt-16 relative">
                <div className="absolute -inset-10 bg-gradient-to-r from-amber-200/20 via-yellow-200/30 to-amber-200/20 blur-3xl -z-10" />
                <ShineBorderDemo
                  className="rounded-lg max-w-[80rem] mx-auto relative z-10"
                  color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                  {mounted && (
                    <div className="flex justify-center relative w-full aspect-[16/9]">
                      <Image
                        src="/product-light.png"
                        alt="AI Art Demo Light"
                        width={1920}
                        height={1080}
                        className="rounded-lg object-cover w-full h-full transition-opacity duration-300 dark:opacity-0"
                        priority
                      />
                      <Image
                        src="/product-dark.png"
                        alt="AI Art Demo Dark"
                        width={1920}
                        height={1080}
                        className="rounded-lg object-cover w-full h-full absolute inset-0 transition-opacity duration-300 opacity-0 dark:opacity-100"
                        priority
                      />
                    </div>
                  )}
                </ShineBorderDemo>
              </div>
            </div>
          </AnimationContainer>
        </div>
      </div>
    </div>
  );
};

export default Hero;
