import routes from '../routes/sidebar'
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon  from '@heroicons/react/24/outline/XMarkIcon'
import { useDispatch } from 'react-redux';

function LeftSidebar(){
    const location = useLocation();

    const dispatch = useDispatch()


    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }

    return(
        <div className="drawer-side  z-30  ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
            <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
            <XMarkIcon className="h-5 inline-block w-5"/>
            </button>

                <li className="mb-2 font-semibold text-xl">
                    
                    <Link to={'/app/welcome'}><svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="150"
            height="70"
            viewBox="0 0 3187.5 1363.9700131923478"
          >
            <g transform="scale(9.375) translate(10, 10)">
              <defs id="SvgjsDefs1822"></defs>
              <g
                id="SvgjsG1823"
                featureKey="monogramFeature-0"
                transform="matrix(2.1355408235303126,0,0,2.1355408235303126,-6.511709532428459,-50.7404545290876)"
                fill="currentcolor"
              >
                <path d="M38.94 81.96000000000001 c-0.18 0.66 -1.02 0.9 -0.78 -0.18 s5.58 -20.7 7.68 -33 c2.1 -12.36 3.96 -23.34 1.8 -23.34 c-2.1 0 -8.04 4.68 -17.46 17.52 c-9.42 12.96 -12 19.08 -13.44 19.08 c-2.58 0 -0.66 -6.84 0 -15.12 c0.6 -7.32 1.98 -16.38 -0.3 -16.38 c-1.98 0 -7.5 7.32 -10.2 18 c-2.4 9.66 -2.7 17.82 -1.2 19.5 c1.02 1.2 0.18 1.62 -0.72 0.54 c-1.92 -2.46 -1.62 -12.06 0.6 -20.46 c2.4 -8.7 7.92 -18.78 11.34 -18.78 c3.72 0 1.98 13.38 1.56 17.58 c-0.48 4.8 -2.28 13.8 -1.02 13.8 c0.12 0 5.28 -9.48 12.12 -18.42 c6.84 -9.06 14.7 -18.54 18.66 -18.54 c3.6 0 2.52 9.54 -0.18 25.02 c-2.58 15 -7.26 28.86 -8.46 33.18 z"></path>
              </g>
              <g
                id="SvgjsG1824"
                featureKey="nameFeature-0"
                transform="matrix(0.9632651537404903,0,0,0.9632651537404903,116.97120654082849,37.07246506646222)"
                fill="currentcolor"
              >
                <path d="M33.828 40 l-3.8086 0 l-1.8164 -22.461 l-8.5352 22.461 l-2.3633 0 l-8.4766 -22.383 l-1.8555 22.383 l-3.8281 0 l2.1289 -27.617 l5.2539 0 l7.9492 20.879 l7.9883 -20.879 l5.2539 0 z M64.8190234375 40 l-2.3047 -6.4453 l-12.344 0 l-2.3047 6.4453 l-4.043 0 l10.176 -27.617 l4.6875 0 l10.176 27.617 l-4.043 0 z M51.3818234375 30.1562 l9.9219 0 l-4.9609 -13.926 z M98.525890625 12.383 l3.8672 0 l0 27.617 l-4.1992 0 l-14.434 -21.914 l0 21.914 l-3.8477 0 l0 -27.617 l4.1602 0 l14.453 21.816 l0 -21.816 z M134.4381640625 40 l-2.3047 -6.4453 l-12.344 0 l-2.3047 6.4453 l-4.043 0 l10.176 -27.617 l4.6875 0 l10.176 27.617 l-4.043 0 z M121.0009640625 30.1562 l9.9219 0 l-4.9609 -13.926 z M151.99223125 36.4844 l15.605 0 l0 3.5156 l-20.371 0 l0 -3.1445 l15.254 -20.977 l-15.215 0 l0 -3.4961 l19.863 0 l0 3.1836 z M179.3700984375 40 l0 -27.617 l3.8867 0 l0 27.617 l-3.8867 0 z M201.337853125 36.4844 l9.4336 0 l0 3.5156 l-13.32 0 l0 -27.617 l3.8867 0 l0 24.102 z"></path>
              </g>
            </g>
          </svg>  </Link> </li>
                {
                    routes.map((route, k) => {
                        return(
                            <li className="" key={k}>
                                {
                                    route.submenu ? 
                                        <SidebarSubmenu {...route}/> : 
                                    (<NavLink
                                        end
                                        to={route.path}
                                        className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                           {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                aria-hidden="true"></span>) : null
                                            }
                                    </NavLink>)
                                }
                                
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar