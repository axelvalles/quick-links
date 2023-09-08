import LinksList from './components/links-list'
import ModalLink from './components/modal-link'
import AddLinkButton from './components/add-link-button'

const LinksPage = async () => {
  return (
    <>
      <h1 className="font-extrabold text-4xl mb-5">Your links</h1>
      <AddLinkButton />

      <LinksList />

      <ModalLink />
    </>
  )
}

export default LinksPage
