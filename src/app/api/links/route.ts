import { type Database } from '@/types/database'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { addLinkSchema } from '@/schemas'

export async function GET () {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data } = await supabase.from('links').select('*')
  const response = data ?? []
  return NextResponse.json(response)
}

// {
//   "title": "ghfghfh",
//   "url": "https://nextui.org/docs/customization/colors",
//   "image": undefined
// }

export async function POST (request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const formData = await request.formData()
    const formPayload = Object.fromEntries(formData)
    const result = addLinkSchema.safeParse(formPayload)
    console.log(formPayload)

    console.log(result)

    if (!result.success) {
      return NextResponse.json({
        message: result.error,
        ok: false
      })
    }

    const image = formPayload.image as File

    const uploadResponse = await supabase.storage
      .from('public')
      .upload(nanoid(), image)

    if (uploadResponse.error !== null) {
      return NextResponse.json({
        message: uploadResponse.error,
        ok: false
      })
    }

    const getUrlPublicResponse = supabase.storage
      .from('public')
      .getPublicUrl(uploadResponse.data.path)

    const { error } = await supabase.from('links').insert({
      image: getUrlPublicResponse.data.publicUrl,
      original_url: formPayload.url as string,
      short_url: nanoid(10),
      title: formPayload.title as string,
      user_id: '95d94fab-6762-4ccd-8728-fc6a217becb2'
    })

    if (error !== null) {
      return NextResponse.json({
        message: error,
        ok: false
      })
    }

    return NextResponse.json({
      message: 'Successful operation',
      ok: true
    })
  } catch (error) {
    console.log('An error ocurred: ', error)

    return NextResponse.json({
      message: error,
      ok: false
    })
  }
}
