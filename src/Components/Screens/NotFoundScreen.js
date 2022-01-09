import React from 'react'
import { Link } from 'react-router-dom';
import notFoundSVG from "../../Media/undraw_not_found_-60-pq.svg"
import useWindowSize from '../../Utils/windowSize';
import Navbar from '../Navbar'

const NotFoundScreen = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    return (
<div style={{minHeight: '1000px'}}  class="h-screen bg-gray-100 flex items-center">
    {/* Navbar */}
    <Navbar width={width} />
	<div class="container flex gap-20 flex-col ipad:flex-row items-center justify-center px-5 text-gray-700">
   		<div class="max-w-md">
      		<div class="text-5xl font-dark font-bold">404</div>
            <p
              class="text-2xl ipad:text-3xl font-light leading-normal"
            >Spiacenti, ciò che cercavi non si trova quì </p>
          <p class="mb-8">Ma non ti preoccupare, ci sono molte altre cose che puoi fare con noi!</p>
          
          <Link to="/"><button class="px-4 inline py-2 text-sm font-medium leading-5 shadow btn btn-secondary">Torna alla home</button></Link>
          
    </div>
      <div class="max-w-lg">
      <img className="w-full h-full object-contain" src={notFoundSVG} alt="" />
    </div>
    
  </div>
</div>
    )
}

export default NotFoundScreen
