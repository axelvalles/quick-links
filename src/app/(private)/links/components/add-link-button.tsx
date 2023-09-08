'use client'
import { onOpen } from '@/redux/features/modal-link-slice'
import { useAppDispatch } from '@/redux/hooks'
import { Button } from '@nextui-org/button'

const AddLinkButton = () => {
  const dispatch = useAppDispatch()
  return (
    <Button onPress={() => dispatch(onOpen())} radius="full" color="secondary">
      Add Link
    </Button>
  )
}

export default AddLinkButton
