import AccountLayout from "@modules/account/templates/account-layout"
import OverviewTemplate from "@modules/account/templates/overview-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import ProfileTemplate from "./../../modules/account/templates/profile-template"
import { useMeCustomer } from "medusa-react"
import AccountNav from "@modules/account/components/account-nav"

const Account: NextPageWithLayout = () => {
  const { customer } = useMeCustomer()

  return (
    <>
      <Head title="Account" description="Overview of your account activity." />

      
      {/* <ProfileTemplate /> */}
      <OverviewTemplate />
    </>
  )
}

Account.getLayout = (page: ReactElement) => {
  return (
    <>
      <AccountLayout>{page}</AccountLayout>
      {/* <Layout>
    </Layout> */}
    </>
  )
}

export default Account
