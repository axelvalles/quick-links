import { type Database } from '@/types/database'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET () {
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const { data } = await supabase.from('links').select('*')
  const response = data ?? []
  return NextResponse.json(response)
}
