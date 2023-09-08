import { configureStore } from '@reduxjs/toolkit'
import { linkApi, userApi } from './services'
import { modalLink } from './features/modal-link-slice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    [modalLink.name]: modalLink.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [linkApi.reducerPath]: linkApi.reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([userApi.middleware, linkApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
