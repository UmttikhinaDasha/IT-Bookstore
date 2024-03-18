import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import App from 'app/App'
import store, { persistor } from 'app/store'
import { ThemeProvider } from 'entities/theme'
import { PersistGate } from 'redux-persist/integration/react'
import { Fallback } from 'shared/ui/fallback'

import './index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ErrorBoundary FallbackComponent={Fallback}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </ErrorBoundary>
)
