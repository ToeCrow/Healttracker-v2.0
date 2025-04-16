import React from 'react'
import Logo from './Logo'
import Navbar from './Navbar'
import DarkModeToggle from './DarkModeToggle'


const Header = () => {
  return (
    <header className='bg-primary text-primary-foreground sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-b border-grey-500 p-8'>
      <Logo onClick={() => { window.location.href = '/' }} />
        <h1 className='ml-4 text-4xl '>(You're) Your Personal Trainer</h1>
      <Navbar />
      <DarkModeToggle />
    </header>
  )
}

export default Header