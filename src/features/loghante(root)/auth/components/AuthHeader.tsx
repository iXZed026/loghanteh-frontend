import AppImage from '@/components/ui/AppImage'
import AuthRoutes from './AuthRoutes'

function AuthHeader() {


  return (
    <div className='fcol gap-10 mb-7.5'>
      {/* Logo */}
      <div className='fcc'>
        <AppImage
          width={85}
          height={65}
          src={"/images/Loghanteh-logo.svg"}
          alt="loghanteh logo"
          priority={true}
        />
      </div>
      {/* Auth Route */}
      <AuthRoutes />
    </div>
  )
}

export default AuthHeader