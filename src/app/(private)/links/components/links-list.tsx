import { type Database } from '@/types/database'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
// import { Spinner } from '@nextui-org/spinner'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { IconCalendar, IconChartBar, IconX } from '@tabler/icons-react'
import { format } from 'date-fns'
import { cookies } from 'next/headers'

const getLinks = async () => {
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const { data } = await supabase.from('links').select('*')
  const response = data ?? []

  return response.map((link) => ({
    ...link,
    created_at: format(new Date(link.created_at), 'dd/MM/yyyy'),
    updated_at: format(new Date(link.updated_at), 'dd/MM/yyyy'),
    short_url: `${process.env.APP_HOST}/${link.short_url}`
  }))
}

const LinksList = async () => {
  const links = await getLinks()

  return (
    <section className="pt-5 space-y-4">

      {links.map((link) => (
        <Card key={link.id}>
          <CardHeader className="flex justify-end gap-3">
            <button>
              <IconX />
            </button>
          </CardHeader>
          <CardBody className="flex flex-row gap-5">
            <Image
              alt="nextui logo"
              height={50}
              radius="sm"
              src={link.image}
              width={50}
            />
            <div className="flex flex-col">
              <p className="text-md font-bold">{link.title}</p>
              <p className="text-small text-default-500">{link.short_url}</p>
              <a className="text-small text-default-500">{link.original_url}</a>
            </div>
          </CardBody>
          <CardFooter className="flex gap-4">
            <span className="flex gap-2 text-small text-default-500">
              <IconChartBar /> 25
            </span>
            <span className="flex gap-2 text-small text-default-500">
              <IconCalendar />
              {link.created_at}
            </span>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}

export default LinksList
