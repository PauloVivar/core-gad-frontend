import { Provider } from 'react-redux'
import store from './redux/store'
import { AppRoutes } from './routes'

export function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}
