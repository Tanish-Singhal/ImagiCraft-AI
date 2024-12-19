"use client";

import { AuthForm } from "@/components/auth-form";
import Image from "next/image";

export default function AuthPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
          </div>
          ImagiCraft AI
        </a>
        <AuthForm />
      </div>
    </div>
  );
}
