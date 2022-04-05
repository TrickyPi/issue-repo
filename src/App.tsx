import { useState, lazy, Suspense } from 'react'
import logo from './logo.svg'
import './App.css'

const LazyFoo = lazy(() => import('./lazyedFoo'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <div>
          <button type="button" onClick={() => { setCount(1) }}>
            load lazy Component
          </button>
          {!!count &&
            <Suspense fallback={<div>Loading...</div>}>
              <LazyFoo />
            </Suspense>
          }
        </div>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
