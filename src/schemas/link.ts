import { z } from 'zod'

const MAX_FILE_SIZE = 5
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

export const addLinkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Invalid url'),
  image: z
    .any()
    .refine((files) => {
      if (files?.length === undefined || files?.length === 0) return true

      return files?.[0]?.size / 1024 / 1024 <= MAX_FILE_SIZE
    }, 'Max file size is 5MB.')
    .refine((files) => {
      if (files?.length === undefined || files?.length === 0) return true

      return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)
    }, '.jpg, .jpeg, .png and .webp files are accepted.')
})
