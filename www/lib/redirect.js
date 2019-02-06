import Router from 'next/router'
import gql from 'graphql-tag'

export default async function redirectLogin(
  {apolloClient, res},
  target,
  requireLogin = true,
) {
  const {
    data: {viewer},
  } = await apolloClient.query({
    fetchPolicy: 'no-cache',
    query: gql`
      {
        viewer {
          email
        }
      }
    `,
  })

  if ((requireLogin && !viewer) || (!requireLogin && viewer)) {
    if (res) {
      res.writeHead(303, {Location: target})
      res.end()
    } else Router.replace(target)
  }
}
