'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, type FC, useState } from 'react'
import { type Database } from '@/types/database'

interface Props {
  params: { id: string }
}

type LabelE = 'You will be redirected in a few seconds...' | 'This url does not exist'

const Link: FC<Props> = ({ params }) => {
  const [label, setlabel] = useState<LabelE>('You will be redirected in a few seconds...')
  const supabase = createClientComponentClient<Database>()

  const redirect = async () => {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('short_url', params.id)
      .single()

    if (error !== null) {
      setlabel('This url does not exist')
    } else {
      window.location.href = data.original_url
    }
  }

  useEffect(() => {
    redirect()
  }, [])

  return (
    <div className="min-h-screen h-full flex items-center justify-center">
    <p className="text-center">{label}</p>
  </div>
  )
}

export default Link
