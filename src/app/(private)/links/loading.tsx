import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'

const loading = () => {
  return (
    <>
      <h1 className="font-extrabold text-4xl mb-5">Your links</h1>
      <Button radius="full" color="secondary">
        Add Link
      </Button>

      <div className="flex justify-center pt-5">
        <Spinner color="secondary" size="lg" />
      </div>
    </>
  )
}

export default loading
