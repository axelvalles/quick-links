import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ModalLinkState {
  isOpen: boolean
  title: 'Create Link' | 'Edit Link'
}

const initialState: ModalLinkState = {
  isOpen: false,
  title: 'Create Link'
}

export const modalLink = createSlice({
  name: 'modalLink',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true
    },
    onClose: (state) => {
      state.isOpen = false
    },
    onOpenChange: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    onChangeTitle: (state, action: PayloadAction<ModalLinkState['title']>) => {
      state.title = action.payload
    }
  }
})

export const { onClose, onOpen, onOpenChange } = modalLink.actions
