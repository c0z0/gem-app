import App, { Container } from 'next/app'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import withApollo from '../lib/withApollo'

import theme from '../lib/theme'

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
              <Component {...pageProps} />
            </ThemeProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
