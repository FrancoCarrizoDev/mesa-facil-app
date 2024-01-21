import React from "react";

export default function ErrorPage({
  searchParams,
}: {
  searchParams: {
    error: string;
  };
}) {
  const errorParam = new URLSearchParams(searchParams).get("error");
  const decodedError = decodeURIComponent(errorParam as string);

  return <div>{decodedError}</div>;
}
