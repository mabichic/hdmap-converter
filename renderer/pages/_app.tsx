import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
      </>
  );
};

export default App; 