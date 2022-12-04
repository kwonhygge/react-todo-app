import * as React from "react";
import { useRouteError } from "react-router-dom";
import { AxiosError } from "axios";

interface RouteError {
  statusText: string;
  message: string;
}

interface CustomAxiosError extends AxiosError<{ details: string }> {}

export default function Error() {
  const error = useRouteError();
  const isAxiosError = error instanceof AxiosError;

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {isAxiosError
            ? (error as CustomAxiosError)?.response?.data?.details
            : (error as RouteError).statusText || (error as RouteError).message}
        </i>
      </p>
    </div>
  );
}
