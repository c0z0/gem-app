import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
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

  const { loading, data, error } = useQuery(NOTES_QUERY)

  const deleteNote = useMutation(DELETE_MUTATION, {
    update: (
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
    }
  })

  const createNote = useMutation(CREATE_MUTATION, {
    optimisticResponse: {
      __typename: 'Mutation',
      createNote: {
        __typename: 'Note',
        id: 'optimistic-id',
        title: 'New Note',
        content: ''
      }
    },
    update: (cache, { data: mutationData }) => {
      const { viewer } = cache.readQuery({ query: NOTES_QUERY })

      viewer.notes.unshift(mutationData.createNote)

      cache.writeQuery({ query: NOTES_QUERY, data: { viewer } })
    }
  })

  function renderNotes() {
    const notes = data.viewer.notes.filter(n =>
      n.title.toLowerCase().includes(searchQueryState.toLowerCase())
    )

    if (!notes.length) return <NoNotes>No notes found.</NoNotes>

    return notes.map(n => (
      <Note
        key={n.id}
        {...n}
        onDelete={id =>
          deleteNote({
            variables: { id },
            optimisticResponse: {
              __typename: 'Mutation',
              deleteNote: {
                __typename: 'Note',
                id
              }
            }
          })
        }
      />
    ))
  }

  return (
    <React.Fragment>
      <Menu
        onLogout={e => {
          e.preventDefault()
          document.cookie = 'session=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          Router.replace('/login')
        }}
      />

      <NotesToolbar
        newGem={{ tags: [] }}
        onNewNote={createNote}
        searchQuery={searchQueryState}
        onSearchQueryChange={setSearchQueryState}
      />

      <Container>
        <H1>My Notes</H1>
        {loading || !data || error ? (
          <Title style={{ textAlign: 'center' }}>
            <LoadingElipsis />
          </Title>
        ) : (
          renderNotes()
        )}
      </Container>
      <Footer />
    </React.Fragment>
  )
}

Notes.getInitialProps = async ctx => {
  await redirectLogin(ctx, '/login')
  return {}
}
