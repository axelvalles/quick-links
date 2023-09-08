'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { onClose, onOpenChange } from '@/redux/features/modal-link-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import FileInputDnD from '@/components/file-input-dnd'
import { Input } from '@nextui-org/react'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useAddLinkMutation } from '@/redux/services'
import { useRouter } from 'next/navigation'
import { addLinkSchema } from '@/schemas'
import { toast } from 'sonner'

type AddLinkFormData = z.infer<typeof addLinkSchema>

export default function ModalLink () {
  // hooks
  const router = useRouter()
  // redux
  const { isOpen, title } = useAppSelector((state) => state.modalLink)
  const [addLink, addLinkCtx] = useAddLinkMutation()
  const dispatch = useAppDispatch()
  // form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddLinkFormData>({
    resolver: zodResolver(addLinkSchema),
    defaultValues: {
      title: '',
      url: ''
    }
  })
  // methods
  const onSubmit = async (data: AddLinkFormData) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('url', data.url)
      formData.append('image', data.image[0])
      const response = await addLink(formData).unwrap()
      toast.success('Successful operation')
      console.log(response)
      dispatch(onClose())
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error('An error ocurred')
    }
  }
  // effects
  useEffect(() => {
    reset()
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(state) => dispatch(onOpenChange(state))}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  {...register('title')}
                  type="text"
                  validationState={
                    errors.title !== undefined ? 'invalid' : 'valid'
                  }
                  errorMessage={errors.title?.message}
                />

                <Input
                  label="Destination URL"
                  {...register('url')}
                  type="url"
                  validationState={
                    errors.url !== undefined ? 'invalid' : 'valid'
                  }
                  errorMessage={errors.url?.message}
                />

                <FileInputDnD name="image" control={control} />
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="full"
                  color="danger"
                  variant="light"
                  type="button"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  isLoading={addLinkCtx.isLoading}
                  radius="full"
                  color="secondary"
                  type="submit"
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  )
}
