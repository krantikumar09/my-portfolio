import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-full md:w-[18%] '>
        <div className="flex flex-col gap-3">
            <NavLink className="text-black text-sm md:text-base font-medium btn" to="/add-project">
                Create Project
            </NavLink>

            <NavLink className="text-black text-sm md:text-base font- btn" to="/all-project">
                View All Projects
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar