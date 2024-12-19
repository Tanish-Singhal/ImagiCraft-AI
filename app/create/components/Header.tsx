"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ModeToggle } from "@/app/components/mode-toggle";

const Header = () => {
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    setInitialLoading(false);
  }, [status]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            <span className="font-bold text-xl hidden md:block">ImagiCraft AI</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/create" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Create
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/images" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Images
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            <ModeToggle />
            {initialLoading && status === "loading" ? (
              <div className="w-10 h-10 rounded-full bg-skeleton animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <Button onClick={() => signOut()} variant="destructive" size="sm">
                  Logout
                </Button>
                <Avatar>
                  <AvatarImage src={session.user?.image || ""} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Button onClick={() => router.push("/userauth")}>Get Started</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
