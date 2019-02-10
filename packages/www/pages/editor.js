import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import debounce from 'lodash.debounce'

import Menu from '../components/Menu'
import RichEditor from '../components/RichEditor'
import { Title, LoadingElipsis } from '../components/Typography'

import redirectLogin from '../lib/redirect'

const NOTE_QUERY = gql`
  query Note($id: ID!) {
    note(id: $id) {
      title
      id
      content
    }
  }
`

const SAVE_MUTATION = gql`
  mutation SaveNote($id: ID!, $content: JSON!, $title: String!) {
    updateNote(id: $id, content: $content, title: $title) {
      title
      id
      content
    }
  }
`

const saveChanges = ({ changedNote, setUnsavedChangesState, saveNote }) => {
  setUnsavedChangesState(false)

  saveNote({ variables: changedNote })
}

const saveChangesDebounced = debounce(
  saveChanges,
  3e3 // 3 seconds
)

export default function EditorPage({ noteId }) {
  const [unsavedChangesState, setUnsavedChangesState] = useState(false)
  return (
    <React.Fragment>
      <Menu
        onLogout={e => {
          e.preventDefault()
          document.cookie = 'session=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          Router.replace('/login')
        }}
      />
      <Query query={NOTE_QUERY} variables={{ id: noteId }}>
        {({ loading, data: { note } }) => {
          if (loading || !note)
            return (
              <Title style={{ textAlign: 'center' }}>
                <LoadingElipsis />
              </Title>
            )

          return (
            <Mutation mutation={SAVE_MUTATION}>
              {(saveNote, { loading: saveNoteLoading }) => (
                <RichEditor
                  {...note}
                  unsavedChanges={unsavedChangesState}
                  onSave={changedNote => {
                    saveChangesDebounced.cancel()
                    saveChanges({
                      changedNote,
                      setUnsavedChangesState,
                      saveNote
                    })
                  }}
                  onChange={changedNote => {
                    setUnsavedChangesState(true)
                    saveChangesDebounced({
                      changedNote,
                      setUnsavedChangesState,
                      saveNote
                    })
                  }}
                  loading={saveNoteLoading}
                />
              )}
            </Mutation>
          )
        }}
      </Query>
    </React.Fragment>
  )
}

EditorPage.getInitialProps = async ({ query: { n }, res, apolloClient }) => {
  await redirectLogin({ res, apolloClient }, '/login')
  return { noteId: n }
}

EditorPage.propTypes = {
  noteId: PropTypes.string.isRequired
}
