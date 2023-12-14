import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import App from 'app/App'
import { store } from 'shared/model/store'
import { Fallback } from 'shared/ui/fallback/fallback'

import './index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ErrorBoundary FallbackComponent={Fallback}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ErrorBoundary>
    </Provider>
)
