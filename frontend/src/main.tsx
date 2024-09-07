import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NextUIProvider>
  </StrictMode>,
)
