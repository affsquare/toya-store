import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <h2 className="text-xl-semi">Already have an account?</h2>
        <p className="text-base-regular text-gray-700 my-3">
          Sign in for a better experience.
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <a className="p-3">
            <Button variant="secondary">Sign in</Button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
