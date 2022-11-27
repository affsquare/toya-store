import { medusaClient } from "@lib/config"
import { Customer } from "@medusajs/medusa"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface NewPassCredentials extends FieldValues {
    newPassword: string
    confirmPassword: string
    
}



// type MyInformationProps = {
//     customer: Omit<Customer, "password_hash">
//   }


const NewPassword = () => {
    const CustomerEmail: string = JSON.parse(localStorage.getItem('email') || "");
    const { loginView, token } = useAccount()
console.log(CustomerEmail , token)
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (_e : string) => {
    setAuthError(_e)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPassCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    console.log(credentials.newPassword , credentials.confirmPassword )
    if ((credentials.newPassword == credentials.confirmPassword) && CustomerEmail != "") {
        console.log("match")
        medusaClient.customers.resetPassword({
            email: CustomerEmail,
            password:credentials.newPassword,
            token: token
          })
          .then(()=>{
            console.log("success")
          })
          .catch(()=>{
            handleError("medusa failed")
          })
      }else {
        handleError("passwords are not same ")
      }
    // medusaClient.auth
    //   .authenticate(credentials)
    //   .then(() => {
    //     refetchCustomer()
    //     router.push("/account")
    //   })
    //   .catch(handleError)
  })

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
      <p className="text-center text-base-regular text-gray-700 mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          
          <Input
            label="New Password"
            {...register("newPassword", { required: "Password is required" })}
            type="password"
            // autoComplete="current-password"
            errors={errors}
          />
          <Input
            label="Confirm Password"
            {...register("confirmPassword", { required: "Confirm Password is required" })}
            type="password"
            // autoComplete="pas"
            errors={errors}
          />
           {/* <span className="text-center text-gray-700 text-small-regular mt-6">
       
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.FORGET_PASSWORD)}
          className="underline"
        >
          Forget Password ?
        </button>
        .
      </span> */}
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              {authError}
            </span>
          </div>
        )}
        <Button className="mt-6">Enter</Button>
      </form>
      {/* <span className="text-center text-gray-700 text-small-regular mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Join us
        </button>
        .
      </span> */}
    </div>
  )
}

export default NewPassword
