import { BasePathProvider, CacheProvider, useResource, useCollection, CacheContext } from "@spellbook-technology/use-resource"
import { useContext, useEffect, useState } from "react"
import ReactJSON from "react-json-view"
import GitHubButton from "react-github-btn"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

function App() {
  const [showSample, setShowSample] = useState(false)
  const [showCollection, setShowCollection] = useState(false)

  const handleShowSampleClick = () => {
    setShowSample(showSample => !showSample)
  }

  const handleShowCollectionClick = () => {
    setShowCollection(showCollection => !showCollection)
  }

  return (
    <BasePathProvider value="https://anapioficeandfire.com/api">
      <CacheProvider>
        <div className="py-8 px-4 container mx-auto">
          <div className="flex justify-between gap-4">
            <h1 className="mb-4">@spellbook-technology/use-resource</h1>

            <div className="flex gap-4">
              <GitHubButton href="https://github.com/spellbook-technology/use-resource/packages"
                data-color-scheme="dark_high_contrast"
                data-size="large"
                aria-label="Install this package spellbook-technology/use-resource on GitHub"
              >
                Install this package
              </GitHubButton>

              <GitHubButton
                href="https://github.com/spellbook-technology/use-resource"
                data-color-scheme="dark_high_contrast"
                data-size="large"
                data-show-count="true"
                aria-label="Star spellbook-technology/use-resource on GitHub"
              >
                Star
              </GitHubButton>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl">Resource</h2>

                <button className="bg-blue-500 rounded-lg px-3 py-2 w-36 hover:bg-blue-600" onClick={handleShowSampleClick}>
                  {showSample ? "Hide" : "Show"} Resource
                </button>
              </div>

              {
                showSample && (
                  <>
                    <Resource />
                    <SyntaxHighlighter language="jsx" style={oneDark}>
                      {
                        `const Resource = () => {
  const [character, { containerRef }] = useResource("/characters/583")

  return (
    <div className="p-4 bg-gray-200 rounded-lg" ref={containerRef}>
      <Character character={character} className="grow" />
    </div>
  )
}`
                      }
                    </SyntaxHighlighter>
                  </>
                )
              }

              <div className="flex justify-between items-center">
                <h2 className="text-xl">Collection</h2>

                <button className="bg-blue-500 rounded-lg px-3 py-2 w-36 hover:bg-blue-600" onClick={handleShowCollectionClick}>
                  {showCollection ? "Hide" : "Show"} Collection
                </button>
              </div>

              {
                showCollection && (
                  <>
                    <Collection />
                    <SyntaxHighlighter language="jsx" style={oneDark}>
                      {
                        `const Collection = () => {
  const [characters, { containerRef }] = useCollection("/characters?culture=Northmen&pageSize=4")

  return (
    <div className="p-4 bg-gray-200 rounded-lg text-gray-800 flex flex-col gap-4" ref={containerRef}>
      {
        characters && characters.map(character => {
          return (
            <Character key={character.id} character={character} />
          )
        })
      }
    </div>
  )
}`
                      }
                    </SyntaxHighlighter>
                  </>
                )
              }
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl">Cache Store</h2>
              <Store />
            </div>
          </div>
        </div>
      </CacheProvider>
    </BasePathProvider>
  )
}

const Resource = () => {
  const [character, { fetchResource }] = useResource("/characters/583")

  useEffect(() => {
    fetchResource()
  }, [fetchResource])

  return (
    <div className="p-4 bg-gray-200 rounded-lg">
      <Character character={character} className="grow" />
    </div>
  )
}

const Collection = () => {
  const [characters, { fetchCollection }] = useCollection("/characters?culture=Northmen&pageSize=4")

  useEffect(() => {
    fetchCollection()
  }, [fetchCollection])

  return (
    <div className="p-4 bg-gray-200 rounded-lg text-gray-800 flex flex-col gap-4">
      {
        characters && characters.map(character => {
          return (
            <Character key={character.id} character={character} />
          )
        })
      }
    </div>
  )
}

const Character = ({ character, className }) => {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg bg-gray-400 text-gray-800 ${className}`}>
      <div className="grow">
        <div>{character?.name}</div>
        <div className="text-sm text-gray-600">{character?.gender}</div>
      </div>
      <div>
        {character?.release_date}
      </div>
    </div>
  )
}

const Store = () => {
  const { store } = useContext(CacheContext)

  return (
    <div className="bg-gray-400 p-4 rounded-lg">
      <ReactJSON src={store} />
    </div>
  )
}

export default App
