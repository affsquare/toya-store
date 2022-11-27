import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import reactSelect from "react-select"
// import OTPInput from "otp-input-react"

// interface OTPCredential extends FieldValues {
//   otp: string
// }

const Verify = () => {
  const { loginView, token } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()
  const [otpInput, setOtpInput] = useState<string[]>(new Array(4).fill(""))
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0)
  const handleError = (_e: string) => {
    setAuthError(_e)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  let currentOtpIndex: number = 0
  const inputRef = useRef<HTMLInputElement>(null)
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target
    console.log(value)
    const newOtpInput: string[] = [...otpInput]
    newOtpInput[currentOtpIndex] = value.substring(value.length - 1)
    if (!value) setActiveOtpIndex(currentOtpIndex - 1)
    else setActiveOtpIndex(currentOtpIndex + 1)
    setOtpInput(newOtpInput)
    // setActiveOtpIndex()
  }

  const handleKeyDown = ({ code }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentOtpIndex = index
    if (code === "backspace") setActiveOtpIndex(currentOtpIndex - 1)

  }

  const onSubmit = handleSubmit(() => {
    // console.log(credntials)
    // console.log(token)
    if (token === +otpInput.join("")) {
      setCurrentView(LOGIN_VIEW.NEW_PASSWORD)
    } else {
      console.log("failed")
      handleError("the code did'nt match")

    }
    // medusaClient.auth
    //   .authenticate(credentials)
    //   .then(() => {
    //     refetchCustomer()
    //     router.push("/account")
    //   })
    //   .catch(handleError)
  })

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex])

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
      <p className="text-center text-base-regular text-gray-700 mb-8">
        Check the code sent to your Email
      </p>
      {/* <OTPInput value={test} onChange={settest} autoFocus OTPLength={4} otpType="number" disabled={false} secure /> */}
      <form className="w-full text-center" onSubmit={onSubmit}>
        <div className="flex w-full gap-y-2 justify-center items-center space-x-2">
          {otpInput.map((_, index) => {
            return (
              <>
                <input
                  ref={index === activeOtpIndex ? inputRef : null}
                  key={index}
                  onChange={handleOnChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  type="number"
                  value={otpInput[index]}
                  className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
                />
                {index === otpInput.length - 1 ? null : (
                  <span className="w-2 py-0.5 bg-gray-400" />
                )}
              </>
            );
          })}


          {/* <Input
            label="OTP"
            {...register("otp", { required: "Password is required" })}
            type="text"
            autoComplete="current-password"
            errors={errors}
          /> */}

        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              {authError}
            </span>
          </div>
        )}
        {/* <button
          onClick={() => {
            let x = [1,2,3,4,5]

            console.log(+otpInput.join(""))}}
          className="underline"
        >
          Forget Password ?
        </button> */}
        <Button className="mt-6">Enter</Button>
      </form>

    </div>
  )
}

export default Verify
