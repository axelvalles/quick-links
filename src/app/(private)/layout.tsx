import AdminNavbar from '@/components/admin-navbar'
import { type ReactNode, type FC } from 'react'

interface Props {
  children: ReactNode
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen h-full p-2">
      <AdminNavbar />

      <main className="container mx-auto pt-4">{children}</main>
    </div>
  )
}

export default DashboardLayout
