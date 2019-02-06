import App, {Container} from 'next/app'
import {ThemeProvider, createGlobalStyle as styled} from 'styled-components'
import Head from 'next/head'
import React from 'react'
import {ApolloProvider} from 'react-apollo'
import withApollo from '../lib/withApollo'

import theme from '../lib/theme'

const GlobalStyle = styled`
  body {
  color: #484848;
  font-size: 16px;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans";
  }
`

class MyApp extends App {
  render() {
    const {Component, pageProps, apolloClient} = this.props
    return (
      <Container>
        <Head>
          <title>Gem</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
        <GlobalStyle />
      </Container>
    )
  }
}

export default withApollo(MyApp)
