# Introduction

`use-resource` is a React Hook optimized for RESTful API interactions.

`use-resource` provides you with all fundamental functionalities of interacting with a standardized RESTful API.

```js
const [
  collection,
  {
    fetchCollection, // GET /resources
    createResource, // POST /resources
    fetching,
    creating,
    fetchError,
    createError,
  },
] = useCollection("/resources")

const [
  resource,
  {
    fetchResource, // GET /resources/1
    updateResource, // PUT /resources/1
    destroyResource, // DELETE /resources/1
    fetching,
    updating,
    destroying,
    fetchError,
    updateError,
    destroyError,
  },
] = useResource("/resources/1")
```

# Quick Start

```jsx
import { useResource } from "@spellbook-technology/use-resource"

const Film = () => {
  const [film] = useResource("/films/1")

  return <div>{film.title}</div>
}
```

```jsx
import {
  BasePathProvider,
  CacheProvider,
} from "@spellbook-technology/use-resource"

import Film from "./Film"

const App = () => {
  return (
    <BasePathProvider value="https://films.com/api">
      <CacheProvider>
        <Film />
      </CacheProvider>
    </BasePathProvider>
  )
}
```
