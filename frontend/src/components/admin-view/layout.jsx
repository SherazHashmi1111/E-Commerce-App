import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import AdminHeader from './header'

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
        {/* Admin sidebar */}
        <AdminSidebar/>
        <div className="flex flex-1 flex-col">
            {/* Admin Header */}
            <AdminHeader/>
            <main className='flex flex-1 bg-muted/40 p-4 md-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout