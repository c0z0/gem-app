import App, { Container } from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import withApollo from '../lib/withApollo'
import theme from '../lib/theme'

const GlobalStyle = createGlobalStyle`
   body {
    color: #484848;
    font-size: 16px;
    margin: 0;
    min-height: 100%;
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  html {
    height: 100%;
  }
`

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <Head>
          <title>Gem - Keep your online finds</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
              <React.Fragment>
                <GlobalStyle />
                <Component {...pageProps} />
              </React.Fragment>
            </ThemeProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
