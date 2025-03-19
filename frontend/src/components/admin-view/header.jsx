import React from "react";
import { AlignJustify } from "lucide-react";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import {useDispatch, } from 'react-redux'
import { logoutUser } from "../../store/authSlice";
import { toast } from "sonner"

function AdminHeader({setOpen}) {
  const dispatch = useDispatch()
  const logoutHandler = (e) => {
    e.preventDefault();
    
    dispatch(logoutUser()).then((data) => {
      
      if (data?.payload?.success) {
        toast.success("Logged Out Successfully");
      }
    });
  }
  
  const openSIdeBar = (e)=> {
    e.preventDefault();
    setOpen(true)
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block" onClick={openSIdeBar}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={logoutHandler} className="cursor-pointer inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
