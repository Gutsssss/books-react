import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import {AppTheme} from '../shared/theme/theme.ts'
import { router } from './router/index.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './store/index.ts'
const store = setupStore()
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <ThemeProvider theme={AppTheme}>
     <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>
  </ThemeProvider>
  </Provider>
 ,
)
