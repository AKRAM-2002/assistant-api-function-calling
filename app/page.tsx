"use client";

import Header from "./components/Header";
import Assistant from "./components/Assistant";
import Thread from "./components/Thread";
import Run from "./components/Run";
import ChatContainer from "./components/ChatContainer";
import StockPricesContainer from "./components/StockPricesContainer";
import { useAtom } from "jotai";
import {
  assistantAtom,
  isValidRunState,
  runAtom,
  runStateAtom,
  threadAtom,
} from "@/atoms";
import { useEffect } from "react";

export default function Home() {
  // Atom State
  const [, setAssistant] = useAtom(assistantAtom);
  const [, setThread] = useAtom(threadAtom);
  const [, setRun] = useAtom(runAtom);
  const [, setRunState] = useAtom(runStateAtom);

  // Load default data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localAssistant = localStorage.getItem("assistant");
      if (localAssistant) {
        try {
          setAssistant(JSON.parse(localAssistant));
        } catch (error) {
          console.error("Error parsing assistant data:", error);
        }
      }
  
      const localThread = localStorage.getItem("thread");
      if (localThread) {
        try {
          setThread(JSON.parse(localThread));
        } catch (error) {
          console.error("Error parsing thread data:", error);
        }
      }
  
      const localRun = localStorage.getItem("run");
      if (localRun) {
        try {
          setRun(JSON.parse(localRun));
        } catch (error) {
          console.error("Error parsing run data:", error);
        }
      }
  
      const localRunState = localStorage.getItem("runState");
      if (localRunState && isValidRunState(localRunState)) {
        try {
          setRunState(localRunState);
        } catch (error) {
          console.error("Error parsing runState data:", error);
        }
      }
    }
  }, []);
  

  return (
    <main className="flex flex-col">
      <Header />
      <div className="flex flex-row mt-20 gap-x-10">
        {/* Actions */}
        <div className="flex flex-col w-full">
          <Assistant />
          <Thread />
          <Run />
        </div>
        {/* Chat */}
        <div className="w-full">
          <ChatContainer />
        </div>
        <div className="w-full">
          <StockPricesContainer />
        </div>
      </div>
    </main>
  );
}
