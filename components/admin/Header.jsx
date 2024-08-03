import MobileSidebar from '@/components/admin/MobileSidebar';
import AccountDropdown from './AccountDropdown';
import DateComponent from './DateComponent';

const Header = () => {
  return (
    <div className='flex items-center justify-between bg-gray-100 px-6 py-5'>
        <div>
            <MobileSidebar />
        </div>
        <div className='flex items-center gap-8'>
            <DateComponent />
            <AccountDropdown />
        </div>
    </div>
  )
}

export default Header