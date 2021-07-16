import React from "react"
import SidebarLayout from "../SidebarLayout/SidebarLayout"

const MainLayout = ({ children }) => {
    return (
        <div className="flex w-full mt-6">
        <SidebarLayout/>
        <div className="h-screen mt-6 ml-4 mr-4 w-screen">
            {children}
        </div>
        </div>
    )
}

export default MainLayout
