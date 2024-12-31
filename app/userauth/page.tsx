"use client";

import { Suspense, useEffect } from "react";
import { AuthForm } from "@/components/auth-form";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AnimationContainer from "@/components/animationContainer";

const AuthContent = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/create");
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
          </div>
          ImagiCraft AI
        </a>
        <AnimationContainer delay={0.3}>
          <AuthForm />
        </AnimationContainer>
      </div>
    </div>
  );
};

const UserAuthPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
};

export default UserAuthPage;
