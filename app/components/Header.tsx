"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/mode-toggle";

const Header = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-sm backdrop-saturate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            <span className="font-bold text-xl hidden md:block">ImagiCraft AI</span>
          </Link>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button onClick={() => router.push("/userauth")}>Sign In</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
