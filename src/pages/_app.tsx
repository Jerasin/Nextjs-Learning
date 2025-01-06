import type { AppProps } from "next/app";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import "./globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
