"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const updateProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    updateProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} className="object-contain" />

        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button type="button" className="outline_btn" onClick={() => signOut()}>
              Sign Out
            </button>

            <button
              type="button"
              className="mt-5 w-full black_btn"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {providers
              ? Object.values(providers).map((provider) => (
                  <button key={provider.name} type="button" className="black_btn" onClick={() => signIn(provider.id)}>
                    Sign In
                  </button>
                ))
              : null}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user ? (session.user.image as string) : "/assets/images/logo.svg"}
              width={37}
              height={37}
              alt="Profile"
              className="rounded-full"
            />
          </div>
        ) : (
          <>
            {providers
              ? Object.values(providers).map((provider) => (
                  <button key={provider.name} type="button" className="black_btn" onClick={() => signIn(provider.id)}>
                    Sign In
                  </button>
                ))
              : null}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
