import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import styled from 'styled-components'

import redirectLogin from '../lib/redirect'
import { Title, LoadingElipsis, H1 } from '../components/Typography'
import Note from '../components/Note'
import Container from '../components/Container'
import Menu from '../components/Menu'
import NotesToolbar from '../components/NotesToolbar'
import Footer from '../components/Footer'

const NOTES_QUERY = gql`
  query {
    viewer {
      id
      email
      notes {
        title
        content
        id
      }
    }
  }
`

const CREATE_MUTATION = gql`
  mutation {
    createNote {
      title
      content
      id
    }
  }
`

const DELETE_MUTATION = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`

const NoNotes = styled.p`
  text-align: center;
  margin-top: 32px;
  color: #ddd;
`

export default function Notes() {
  const [searchQueryState, setSearchQueryState] = useState('')

  return (
    <React.Fragment>
      <Menu
        onLogout={e => {
          e.preventDefault()
          document.cookie = 'session=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          Router.replace('/login')
        }}
      />
      <Mutation
        mutation={CREATE_MUTATION}
        optimisticResponse={{
          __typename: 'Mutation',
          createGem: {
            __typename: 'Note',
            id: 'optimistic-id',
            title: 'New Note'
          }
        }}
        update={(cache, { data: { createNote } }) => {
          const { viewer } = cache.readQuery({ query: NOTES_QUERY })

          viewer.notes.unshift(createNote)

          cache.writeQuery({ query: NOTES_QUERY, data: { viewer } })
        }}
      >
        {createNote => (
          <NotesToolbar
            newGem={{ tags: [] }}
            onNewNote={createNote}
            searchQuery={searchQueryState}
            onSearchQueryChange={setSearchQueryState}
          />
        )}
      </Mutation>

      <Container>
        <H1>My Notes</H1>
        <Query query={NOTES_QUERY}>
          {({ loading, data, error }) => {
            if (loading || !data || error)
              return (
                <Title style={{ textAlign: 'center' }}>
                  <LoadingElipsis />
                </Title>
              )

            const notes = data.viewer.notes.filter(n =>
              n.title.toLowerCase().includes(searchQueryState.toLowerCase())
            )

            if (!notes.length) return <NoNotes>No notes found.</NoNotes>

            return (
              <Mutation
                mutation={DELETE_MUTATION}
                update={(
                  cache,
                  {
                    data: {
                      deleteNote: { id }
                    }
                  }
                ) => {
                  const { viewer } = cache.readQuery({ query: NOTES_QUERY })

                  viewer.notes = viewer.notes.filter(n => n.id !== id)

                  cache.writeQuery({ query: NOTES_QUERY, data: { viewer } })
                }}
              >
                {deleteNote =>
                  notes.map(n => (
                    <Note
                      key={n.id}
                      {...n}
                      onDelete={id =>
                        deleteNote({
                          variables: { id },
                          optimisticResponse: {
                            __typename: 'Mutation',
                            deleteGem: {
                              __typename: 'Note',
                              id
                            }
                          }
                        })
                      }
                    />
                  ))
                }
              </Mutation>
            )
          }}
        </Query>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

Notes.getInitialProps = async ctx => {
  await redirectLogin(ctx, '/login')
  return {}
}
