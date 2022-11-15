import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import PrivateRoutes from './components/PrivateRoutes'
import { publicRoutes, privateRoutes } from './routes'

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component
          let Layout = route.layout

          if (route.layout == null) {
            Layout = Fragment
          }

          return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
        })}
        <Route element={<PrivateRoutes />}>
          {privateRoutes.map((route, index) => {
            const Page = route.component
            let Layout = route.layout

            if (route.layout == null) {
              Layout = Fragment
            }

            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
          })}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
