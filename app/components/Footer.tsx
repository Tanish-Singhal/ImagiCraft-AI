import React from 'react'
import Link from 'next/link'
import { FaGithub, FaXTwitter, FaRegHandPeace } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} ImagiCraft AI. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="https://github.com/Tanish-Singhal" className="hover:text-white text-xl" target="_blank">
              <FaGithub />
            </Link>
            <Link href="https://x.com/TanishSing44334" className="hover:text-white text-xl" target="_blank">
              <FaXTwitter />
            </Link>
            <Link href="https://tanish-singhal.vercel.app/" className="hover:text-white text-xl animate-spin" target="_blank">
              <FaRegHandPeace />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer