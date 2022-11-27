import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface ForgetPasswordCredentials extends FieldValues {
  email: string
}

const ForgetPassword = () => {
  const { loginView , token , setOTP } = useAccount()
  // const token  = OTP()

  const [_, setCurrentView] = loginView
  // const [ d1, setD1] = useState(token);
  
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  // const [OTP, setOTP] = useState<any>(token)
  const router = useRouter()

  const handleError = (_e: Error) => {
    setAuthError("Invalid email")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    localStorage.setItem('email', JSON.stringify(credentials.email));
    medusaClient.customers
      .generatePasswordToken(credentials)
      .then((data) => {
        // setOTP(data.otp)
      // console.log(setOTP);
        setOTP(data.otp)
        console.log(token);
        // let ch = OTP(data.otp);
        // console.log(ch);
       
        setCurrentView(LOGIN_VIEW.VERIFY_OTP)
      })
      .catch(handleError)
  })
  console.log(token);


  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      {/* <h1 className="text-large-semi uppercase mb-6">Welcome back</h1> */}
      <p className="text-center text-base-regular text-gray-700 mb-8">
        Please enter your mail to send you reset code 
      </p>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
            errors={errors}
          />
         
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              These credentials do not match our records
            </span>
          </div>
        )}
        <Button className="mt-6">Enter</Button>
      </form>
     
    </div>
  )
}

export default ForgetPassword
