"use client";

import { FC, ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  session?: Session;
  children: ReactNode;
};

const Provider: FC<Props> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
