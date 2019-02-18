import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import styled from 'styled-components'
import Router from 'next/router'
import gql from 'graphql-tag'
import memoize from 'lodash.memoize'
import PropTypes from 'prop-types'

import Menu from './Menu'
import Folder from './Folder'
import { Title, LoadingElipsis, H1 } from './Typography'
import Toolbar from './Toolbar'
import Container from './Container'
import Gem from './Gem'
import { isValidUrl } from './NewGem'
import Footer from './Footer'

const NoGems = styled.p`
  text-align: center;
  margin-top: 32px;
  color: #ddd;
`

const GemsContainer = styled(Container)`
  padding-bottom: 147px;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    padding-bottom: 187px;
  }
`

const TOGLE_FAVORITE_MUTATION = gql`
  mutation ToggleFavorite($id: ID!) {
    toggleFavoriteGem(id: $id) {
      id
      favorite
    }
  }
`

const GEMS_QUERY = gql`
  {
    viewer {
      email
      id
      gems {
        id
        folderId
        favorite
        title
        displayUrl
        href
        tags
      }
      folders {
        title
        id
      }
    }
  }
`

const MOVE_GEM_MUTATION = gql`
  mutation MoveGem($id: ID!, $folderId: ID) {
    moveGem(id: $id, folderId: $folderId) {
      id
      folderId
    }
  }
`

const DELETE_GEM_MUTATION = gql`
  mutation Delete($id: ID!) {
    deleteGem(id: $id) {
      id
    }
  }
`

const CREATE_GEM_MUTATION = gql`
  mutation Create($tags: [String]!, $url: String!, $favorite: Boolean) {
    createGem(url: $url, tags: $tags, favorite: $favorite) {
      id
      title
      displayUrl
      folderId
      href
      favorite
      tags
    }
  }
`

export default function GemList({ favorites }) {
  const [newGem, setNewGem] = useState({ url: '', tags: [] })
  const [searchQuery, setSearchQuery] = useState('')

  function filterGems(gems, sq, showFavorites) {
    const r = /(tagged|tag):([\w-]+)/g
    const nameQuery = sq
      .replace(r, '')
      .trim()
      .toLowerCase()

    let q = sq

    const tags = []

    while (q.match(r)) {
      const t = r.exec(q)[2]
      tags.push(t)

      q = q.replace(`tagged:${t}`, '')
      q = q.replace(`tag:${t}`, '')
    }

    return gems.filter(
      g =>
        (g.title.toLowerCase().includes(nameQuery) ||
          g.displayUrl.toLowerCase().includes(nameQuery)) &&
        tags.reduce((p, c) => p && g.tags.includes(c), true) &&
        (g.favorite || !showFavorites)
    )
  }

  const memoizedFilterGems = memoize(filterGems)

  const { data, loading } = useQuery(GEMS_QUERY)

  const createGem = useMutation(CREATE_GEM_MUTATION, {
    update: (cache, { data: { createGem: createGemData } }) => {
      const { viewer } = cache.readQuery({ query: GEMS_QUERY })

      viewer.gems.unshift(createGemData)

      cache.writeData({ query: GEMS_QUERY, data: { viewer } })
    }
  })

  const toggleFavorite = useMutation(TOGLE_FAVORITE_MUTATION, {
    update: (
      cache,
      {
        data: {
          toggleFavoriteGem: { favorite, id }
        }
      }
    ) => {
      const { viewer } = cache.readQuery({ query: GEMS_QUERY })

      viewer.gems = viewer.gems.map(g => (g.id === id ? { ...g, favorite } : g))

      cache.writeQuery({
        query: GEMS_QUERY,
        data: { viewer }
      })
    }
  })

  const deleteGem = useMutation(DELETE_GEM_MUTATION, {
    update: (
      cache,
      {
        data: {
          deleteGem: { id }
        }
      }
    ) => {
      const { viewer } = cache.readQuery({ query: GEMS_QUERY })
      viewer.gems = viewer.gems.filter(g => id !== g.id)

      cache.writeQuery({
        query: GEMS_QUERY,
        data: { viewer }
      })
    }
  })

  const moveGem = useMutation(MOVE_GEM_MUTATION, {})

  function renderGems() {
    const gems = memoizedFilterGems(data.viewer.gems, searchQuery, favorites)

    if (!gems.length)
      return (
        <NoGems>
          {searchQuery.length ? 'No Gems found.' : 'No saved Gems.'}
        </NoGems>
      )

    const renderGem = g => (
      <Gem
        onTagClick={t => setSearchQuery(`${searchQuery} tag:${t}`.trim())}
        key={g.id}
        {...g}
        onToggleFavorite={({ id, favorite }) => {
          toggleFavorite({
            variables: { id },
            optimisticResponse: {
              __typename: 'Mutation',
              toggleFavoriteGem: {
                __typename: 'Gem',
                id,
                favorite: !favorite
              }
            }
          })
        }}
        folders={data.viewer.folders.filter(f => f.id !== g.folderId)}
        onMoveGem={({ id, folderId }) =>
          moveGem({
            variables: { id, folderId },
            optimisticResponse: {
              __typename: 'Mutation',
              moveGem: {
                __typename: 'Gem',
                id,
                folderId
              }
            }
          })
        }
        onDelete={id =>
          deleteGem({
            variables: { id },
            optimisticResponse: {
              __typename: 'Mutation',
              deleteGem: {
                __typename: 'Gem',
                id
              }
            }
          })
        }
      />
    )

    return (
      <React.Fragment>
        {data.viewer.folders.map(f => (
          <Folder key={f.id} {...f}>
            {gems.filter(g => g.folderId === f.id).map(renderGem)}
          </Folder>
        ))}
        {gems.filter(g => !g.folderId).map(renderGem)}
      </React.Fragment>
    )
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

      <Toolbar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        newGem={newGem}
        favorites={favorites}
        onNewGemSubmit={({ url, tags }) => {
          setNewGem({ url: '', tags: [] })
          createGem({
            optimisticResponse: {
              __typename: 'Mutation',
              createGem: {
                __typename: 'Gem',
                id: 'optimistic-id',
                displayUrl: isValidUrl(url).host,
                folderId: null,
                favorite: favorites,
                title: 'Loading...',
                href: url,
                tags: tags.map(t => t.trim()).filter(t => t.length > 0)
              }
            },
            variables: {
              url,
              tags: tags.map(t => t.trim()).filter(t => t.length > 0),
              favorite: favorites
            }
          })
        }}
        onNewGemChange={setNewGem}
        newGemLoading={false}
      />
      <GemsContainer>
        <H1>{favorites ? 'Favorite' : 'My'} Gems</H1>
        {loading ? (
          <Title style={{ textAlign: 'center' }}>
            <LoadingElipsis />
          </Title>
        ) : (
          renderGems()
        )}
      </GemsContainer>
      <Footer />
    </React.Fragment>
  )
}

GemList.propTypes = {
  favorites: PropTypes.bool
}

GemList.defaultProps = {
  favorites: false
}
