import type { AppProps } from "next/app";
import "./globals.css";
import ErrorBoundary from "@/components/error-boundary";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
