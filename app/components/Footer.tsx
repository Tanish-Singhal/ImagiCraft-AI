import React from 'react'
import Link from 'next/link'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'

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
            <Link href="https://github.com/Tanish-Singhal" className="hover:text-white text-xl">
              <FaGithub />
            </Link>
            <Link href="https://twitter.com/your-twitter" className="hover:text-white text-xl">
              <FaXTwitter />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer