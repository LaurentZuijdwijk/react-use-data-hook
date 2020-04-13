# React-use-data-hook

[![CircleCI](https://img.shields.io/circleci/build/gh/LaurentZuijdwijk/react-use-data-hook?style=for-the-badge)](https://app.circleci.com/pipelines/github/LaurentZuijdwijk/react-use-data-hook) [![Version](https://img.shields.io/github/package-json/version/LaurentZuijdwijk/react-use-data-hook?style=for-the-badge)](https://www.npmjs.com/package/react-use-data-hook)

Reusable hook for data retrieval. Can Fetch on mount (optionally) and refetch. 

Just inject a function that returns a Promise with your data. 

## Installation

```
npm i react-use-data-hooks
```
```
yarn add react-use-data-hooks
```

## Features

* Stale requests are canceled.
* Initial fetch or only on demand, using refetch method.
* Loading, error and data variables
* Error field
* Strongly typed in TS
* Unit tested

## Quick start

```javascript

const getDataById = (id) => Promise.resolve('Some data')

import useDataHook from 'react-use-data-hook'

function MyComponent({id}){

    const { data, loading, error, refetch } = useDataHook(getDataById, id);

    return (
        <>
            {loading && <span>Loading</span>}
            {!loading && <>
                <span>{data}</span>
                <button onClick={()=>refetch(id)}>Click</button>
            </>
            }
            {error && <span>{error}</span>}

        </>
    )
}

```

## Parameters

```javascript
    const options = { 
        fn: () => Promise.resolve({})), 
        initialFetch: false, 
        debug: false 
    }
    const { data, loading, error, refetch } = useDataHook(options, asyncParameters);

```

The useDataHook has to be called with one or more parameters. 

Options can either be an options object or an async function to be called.
The asyncParameters can be one or more arguments that will be used to call the async function.

```javascript

    // example 1: using a function and multiple arguments
    const { data, loading, error, refetch } = useDataHook(getUsersById, userOneId, userTwoId);

    // example 2: using an options object and no arguments
    
    const options = { fn: getAllUsers, initialFetch: false, debug: true }
    const { data, loading, error, refetch } = useDataHook(options);

```

### Options object

| Property name | Default | Required | Description |
|---|---|---| --- |
| **fn** | undefined | true | Async function that returns a Promise
| **initialFetch** | false | false | Should a request be made on mount
| **debug** | false | false | Console log debug information

Look at the example in the ./example folder for a type-ahead input field using this hook.

Hope you like this repo and find it useful. If you have any comments or questions, please open a ticket or a PR. 