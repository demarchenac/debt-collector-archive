import type { AppProps } from "next/app";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useCallback, useState } from "react";

import { api } from "../utils/api";
import { Header } from "../components/Header";

import "../styles/globals.css";
import { Sidebar } from "../components/Sidebar";
import { AnimatePresence } from "framer-motion";
import { MemoizedMotionLayout } from "../components/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) => {
  const [showSidebar, toggleSidebar] = useState(false);

  const openSidebar = () => toggleSidebar(true);
  const closeSidebar = useCallback(() => {
    toggleSidebar(false);
  }, []);

  return (
    <SessionProvider session={session}>
      <div className="min-screen flex flex-col bg-gradient-to-b  from-[#2e026d] to-[#15162c]">
        <Header onClick={openSidebar} />
        <Sidebar visible={showSidebar} onClose={closeSidebar} />
        <div className="min-h-screen">
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <MemoizedMotionLayout key={router.route}>
              <Component {...pageProps} />
            </MemoizedMotionLayout>
          </AnimatePresence>
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
