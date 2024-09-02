import React from 'react'

const Footer = () => {
  return (
      <footer className='text-center py-2'>
          &copy;
          {new Date().getFullYear()} mailtracker.biyondbytes. All rights reserved.
      </footer>
  )
}

export default Footer
