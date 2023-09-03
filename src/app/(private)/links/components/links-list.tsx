'use client'
import { useGetLinksQuery } from '@/redux/services'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Spinner
} from '@nextui-org/react'

const LinksList = () => {
  const { data, isSuccess, isLoading } = useGetLinksQuery(null)

  return (
    <section className='pt-5'>
      {isLoading && (
        <div className='flex justify-center'>
          <Spinner color='secondary' size="lg" />
        </div>
      )}

      {isSuccess &&
        data?.map((link) => (
          <Card key={link.id}>
            <CardHeader className="flex gap-3">header</CardHeader>
            <CardBody className="flex flex-row gap-4">
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
                <a className="text-small text-default-500">
                  {link.original_url}
                </a>
              </div>
            </CardBody>
            <CardFooter>footer</CardFooter>
          </Card>
        ))}
    </section>
  )
}

export default LinksList
