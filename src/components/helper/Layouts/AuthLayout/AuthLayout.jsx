import logo from './../../../../assests/images/logo.png'

const AuthLayout = ({ children}) => {
    return (
        <div className="h-screen rounded-lg items-center flex justify-center m-4">
        <div className="container flex justify-center">
        <div className="row grid grid-cols-2 gap-36">
        <div className="text-center">
        <img src={logo} className="mt-25p w-80" alt="logo"/>
        </div>
        {children}
        
        </div>
        </div>
        </div>
    )
}

export default AuthLayout
