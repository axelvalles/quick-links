import { Button } from '@nextui-org/button'
import LinksList from './components/links-list'

const LinksPage = async () => {
  return (
    <>
      <h1 className="font-extrabold text-4xl mb-5">Your links</h1>
      <Button radius="full" color="secondary">
        Add Link
      </Button>

      <LinksList />
    </>
  )
}

export default LinksPage
