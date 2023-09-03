'use client'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '@/types/database'
import { type UserEntity } from '@/types/entities'
const AdminNavbar = () => {
  // supabase
  const supabase = createClientComponentClient<Database>()
  // next
  const pathname = usePathname()
  const router = useRouter()
  // states
  const [user, setUser] = useState<UserEntity | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard'
    },
    {
      label: 'Links',
      href: '/links'
    },
    {
      label: 'Profile',
      href: '/profile'
    },
    {
      label: 'Qr Codes',
      href: '/qr-codes'
    }
  ]

  // methods
  const getUser = async () => {
    const { data } = await supabase.auth.getUser()

    if (data.user !== null) {
      const response = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()

      setUser(response.data)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // effects
  useEffect(() => {
    getUser()
  }, [])

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      className="rounded-full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-extrabold text-secondary-500">QuickLinks</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        {menuItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <NavbarItem isActive={isActive} key={item.label}>
              <Link aria-current={isActive && 'page'} href={item.href}>
                {item.label}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user?.name}
              size="sm"
              src={user?.avatar_url}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem onClick={handleSignOut} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu className="bg-white mt-2 rounded-3xl">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <NavbarMenuItem key={item.label}>
              <Link
                className={`w-full ${isActive ? 'font-bold' : ''}`}
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          )
        })}
      </NavbarMenu>
    </Navbar>
  )
}

export default AdminNavbar
