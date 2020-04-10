# React-use-data-hook

[![CircleCI](https://img.shields.io/circleci/build/gh/LaurentZuijdwijk/react-use-data-hook?style=for-the-badge)](https://app.circleci.com/pipelines/github/LaurentZuijdwijk/react-use-data-hook) [![Version](https://img.shields.io/github/package-json/version/LaurentZuijdwijk/react-use-data-hook?style=for-the-badge)](https://www.npmjs.com/package/react-use-data-hook)

Reusable hook for data retrieval. Can Fetch on mount (optionally) and refetch. 

Just inject a function that returns a Promise with your data. 

## Installation

```
npm i react-use-data-hooks

yarn add react-use-data-hooks

```

## Quick start

```javascript

const getDataById = (id) => Promise.resolve('Some data')

import useDataHook from 'react-use-data-hook'

function MyComponent({id}){

    const { data, loading, error, refetch } = useDataHook({ fn: getDataById, initialFetch:true }, id);

    return (
        <>
            {loading && <span>Loading</span>}
            {!loading && <span>{data}</span>}
            {error && <span>{error}</span>}
        </>
    )
}

```

