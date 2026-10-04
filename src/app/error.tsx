"use client";
import ErrorPage from "@/components/errors/ErrorPage";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <ErrorPage
      statusCode={500}
      message="Something went wrong. Please try again."
      tryAgainButton={true}
      onTryAgain={reset}
    />
  );
}