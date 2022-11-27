import { useAccount } from "@lib/context/account-context"
import Register from "@modules/account/components/register"
import ForgetPassword from "@modules/account/components/forger-password"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Login from "../components/login"
import Verify from "../components/verify-OTP"
import NewPassword from "../components/new-password"

const LoginTemplate = () => {
  const { loginView, customer, retrievingCustomer } = useAccount()
  const [currentView, _] = loginView

  const router = useRouter()

  useEffect(() => {
    if (!retrievingCustomer && customer) {
      router.push("/account")
    }
  }, [customer, retrievingCustomer, router])

  // if (retrievingCustomer || !customer) {
  //   return null
  // }

  return (
    <div className="w-full flex justify-center py-24">
      {currentView === "sign-in" ? <Login /> 
      :currentView === "forget-password" ? <ForgetPassword />
      : currentView === "verify-OTP" ? <Verify />
      : currentView === "new-password" ? <NewPassword/>
      :<Register />}
    </div>
  )
}

export default LoginTemplate
