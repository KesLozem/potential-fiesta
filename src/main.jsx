import React from 'react'
import ReactDOM from 'react-dom'
import Root from './routes/Root'
import './output.css'
import { 
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom'

import ErrorPage from './routes/error-page'
import JoinParty, { loader as statusLoader, action as joinAction } from './routes/join-party'
import Party, { loader as partyLoader} from './routes/party'
import ClientPlayback from './components/Playback/ClientPlayback'
import AdminPlayback, { loader as adminLoader} from './components/Playback/AdminPlayback'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Root />,
    errorElement: <ErrorPage />, 
  },
  {
    path: '/connect',
    element: <JoinParty />,
    errorElement: <ErrorPage />,
    loader: statusLoader,
    action: joinAction,
  },
  {
    path: '/party',
    element: <Party />,
    errorElement: <ErrorPage />,
    loader: partyLoader,
    children: [
      {
        path: '/party/',
        element: <ClientPlayback />,
      },
      {
        path: '/party/admin',
        element: <AdminPlayback />,
        loader: adminLoader,
      }
    ]
  },
]);

// React 18 not compatible with Spotify SDK
// Spotify SDK only works in this way of rendering DOM in index as it effects state of player
// Uncaught TypeError: this._streamer is null - https://community.spotify.com/t5/Spotify-for-Developers/Spotify-Web-Playback-SDK-example-playback-buttons-don-t-work/td-p/5516960?hwSuccess=1682633176302
// Also needing to import only react-dom and not react-dom/client
ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
)