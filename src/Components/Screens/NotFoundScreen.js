import React from 'react'
import { Link } from 'react-router-dom';
import notFoundSVG from "../../Media/undraw_not_found_-60-pq.svg"
import useWindowSize from '../../Utils/windowSize';
import Navbar from '../Navbar'

const NotFoundScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    return (

      <div style={{minHeight: '100vh'}} className="flex items-center py-10 ">
      {/* Navbar */}
    <Navbar width={width} />
            <div className="container flex gap-20 flex-col ipad:flex-row items-center justify-center px-5">
                   <div className="max-w-md">
                      <div className="text-5xl font-dark font-bold">404</div>
                    <p
                      className="text-2xl ipad:text-3xl font-light leading-normal"
                    >Spiacenti, ciò che cercavi non si trova quì </p>
                  <p className="mb-8">Ma non ti preoccupare, ci sono molte altre cose che puoi trovare da noi!</p>
                  
                  <Link to="/"><button className="px-4 inline py-2 text-sm font-medium leading-5 shadow btn btn-secondary">
                    <span className='text-secondary-content'>Torna alla home</span>  
                    </button></Link>
                  
            </div>
              <div className="max-w-lg">
              <img className="w-full h-full object-contain" src={notFoundSVG} alt="" />
            </div>
            
          </div>
        </div>
    )
}

export default NotFoundScreen
