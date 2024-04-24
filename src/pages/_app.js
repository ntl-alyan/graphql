/**
 * @author: Mahnoor, Mursleen & Sehrish
 * @description: This is main App page of the project, it contains providers and relevant fields
 * @datetime : 12-AUG-2022
 */

// ============= Start :: Imports =============
import Head from "next/head";
import { APP } from "@/components/enums";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { ApolloProvider } from "@apollo/client";
import client from '../apolloClient';
// ============= End :: Imports =============

// ============= Start :: Component =============
export default function App({ Component, pageProps }) {
  // QueryClient Setting
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1, // no of retries
          },
        },
      })
  );
  return (
    <>
      <Head>
        <title>{APP.TITLE}</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content={APP.DESC} />
        <meta name="keywords" content={APP.KEYWORDS} />
        <meta name="author" content={APP.AUTHOR} />
      </Head>
      {/* React Query Setting */}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
            <ToastContainer />
          </ApolloProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
// ============= End :: Component =============
