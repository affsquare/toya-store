import { Customer } from "@medusajs/medusa"
import { useMeCustomer } from "medusa-react"
import { useRouter } from "next/router"
import React, { createContext, useCallback, useContext, useState } from "react"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  FORGET_PASSWORD = "forget-password",
  VERIFY_OTP = "verify-OTP",
  NEW_PASSWORD ="new-password"
}




interface AccountContext {
  customer?: Omit<Customer, "password_hash">
  // token?: [number, React.Dispatch<React.SetStateAction<0>>]
  token?: number
  retrievingCustomer: boolean
  loginView: [LOGIN_VIEW, React.Dispatch<React.SetStateAction<LOGIN_VIEW>>]
  checkSession: () => void
  refetchCustomer: () => void
  setOTP: (arg0: number) => number
}

const AccountContext = createContext<AccountContext | null>(null)

interface AccountProviderProps {
  children?: React.ReactNode
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const {
    customer,
    isLoading: retrievingCustomer,
    refetch,
  } = useMeCustomer({ onError: () => {} })
  const loginView = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)
  
  const router = useRouter()

  const checkSession = useCallback(() => {
    if (!customer && !retrievingCustomer) {
      router.push("/account/login")
    }
  }, [customer, retrievingCustomer, router])
  const [token , setToken] = useState<number>(0)

  const setOTP = (otp:number = 0) =>{
  
    setToken(otp)
    return token
  }

  return (
    <AccountContext.Provider
      value={{
        customer,
        token : token ,
        retrievingCustomer,
        loginView, 
        checkSession,
        refetchCustomer: refetch,
        setOTP 
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => {
  const context = useContext(AccountContext)

  if (context === null) {
    throw new Error("useAccount must be used within a AccountProvider")
  }
  return context
}
