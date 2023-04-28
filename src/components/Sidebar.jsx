import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';


const Sidebar = ({sidebarToggle, setSidebarToggle}) => {
  return (
    <div className='sidebar' style={sidebarToggle ? {left:'-120vw', transition:'1s'} : {left:'0', transition:'1s'}} >

      <Navbar />
      <Search />
      <Chats sidebarToggle= {sidebarToggle} setSidebarToggle = {setSidebarToggle} />

    </div>
  )
}

export default Sidebar