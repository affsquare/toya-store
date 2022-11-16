import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAccount } from "@lib/context/account-context"
import axios from "axios"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import { medusaClient } from "@lib/config"
import { FieldValues, useForm } from "react-hook-form"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "./../../../common/icons/package"

const AccountNav = () => {
  const httpClient = axios.create({
    baseURL: MEDUSA_BACKEND_URL,
  })

  const { route } = useRouter()
  const { customer, retrievingCustomer, checkSession, refetchCustomer } =
    useAccount()
  const router = useRouter()

  function logout() {
    // httpClient.delete("/store/auth")
  }

  // const onSubmit = ()=> {
  //   medusaClient.auth
  //     .authenticate()
  //     .then(() => {
  //       // refetchCustomer()
  //       router.push("/account/login")
  //     })

  // })

  // const onSubmit = ()=> {
  //   medusaClient.auth
  //   httpClient.delete("/store/auth")

  // }

  async function auth() {
    const x = await medusaClient.auth.getSession()
    console.log(x)
  }

  return (
    <div>
      <div className="small:hidden">
        {route !== "/account" && (
          <Link href="/account">
            <a className="flex items-center gap-x-2 text-small-regular py-2">
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </a>
          </Link>
        )}
      </div>
      <div className="hidden small:block">
        <div>
          {/* <div className="py-4">
            <h3 className="text-base-semi">Account</h3>
          </div> */}
          <div className="text-base-regular border p-3 mt-2">
            <div className="info mb-3 ">
              <div className="profile-photo h1 d-flex flex-column  items-center ">
                <User size={60} />
                <h4 className="mt-3 h4">
                {customer?.first_name} {customer?.last_name}{" "}
              </h4>
              </div>
              
            </div>
            
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4 text-lg">
              <li>
                <AccountNavLink href="/account" route={route}>
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/profile" route={route}>
                  <div className="d-flex items-center">
                    <User size={16} />
                    <div className="ms-2">Profile</div>
                  </div>
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/addresses" route={route}>
                  <div className="d-flex items-center">
                    <MapPin size={16} />
                    <div className="ms-2">Addresses</div>
                  </div>
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route}>
                  <div className="d-flex items-center">
                    <Package size={16} />
                    <div className="ms-2">Orders</div>
                  </div>
                </AccountNavLink>
              </li>
              <li className="">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
}

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href
  return (
    <Link href={href}>
      <a
        className={clsx("text-gray-700", {
          "toya-color font-semibold": active,
        })}
      >
        {children}
      </a>
    </Link>
  )
}

export default AccountNav
