import React, { useState } from 'react'
import './MobileSidebar.css'
import SearchIcon from '@mui/icons-material/Search';
const MobileSidebar = () => {
    const [currentFilters,setCurrentFilters] = useState(['sajan','ram']);
  return (
    <>
       <div className='MobileHead'>
       <div className='filters_head'>
        <p className='txt_filter'>Filters</p>

        {/*  Later on to track the current filters and remove if required */}
        {/* <p>CUrrent Filters</p> */}
        {/* {currentFilters.map((current) => (
            <div>
                <p>{current}</p>
            </div>
        ))} */}
        <div className='price_container'>
            <p>PRICE</p>
            {/*  for price slider */}
            <div className='slider_form'>Slider</div>
            <div className='brands_search'>
            <div className='search_bar'>
            <SearchIcon className='search_icon'/>
            <input className='inputSearch' type='text' placeholder='Search Brand'/>
            
            </div>
            
            
           
            


            </div>
        </div>
        {/*  for the ratings */}
        <div>
        <p>CUSTOMER RATINGS</p>
            <div>
            <input type='checkbox' value='4Star'name='rating1'/>
            <label for = "rating1">4 * & above</label>
                
                
            </div>
            <div>
            <input type='checkbox' value='4Star'name='rating1'/>
            <label for = "rating1">3 * & above</label>
                
                
            </div>
        </div>
       </div>

       </div>
       

    </>
 
  )
}

export default MobileSidebar