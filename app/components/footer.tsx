"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#660099] text-white py-8 w-full mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Logo and Contact Us section */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between mb-6 w-full">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="rounded-full overflow-hidden w-16 h-16 mr-2 flex items-center justify-center bg-white">
              <Image
                src="/KMS_Logo_crop.png?height=30&width=30"
                alt="Keylumina Logo"
                width={120}
                height={120}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold md:mr-8">CONTACT US</h3>
          </div>
        
          {/* Desktop Social Media Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="https://www.tiktok.com/@keylumina"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer"
            >
              <img src="/tiktok.png" className="w-6 h-6 mr-2" alt="Tiktok" />
              <span>TikTok</span>
            </a>
            
            <a
              href="https://www.youtube.com/@Keylumina"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer"
            >
              <img src="/Youtube.png" className="w-6 h-6 mr-2" alt="Youtube" />
              <span>YouTube</span>
            </a>
            
            <a
              href="https://www.instagram.com/keylumina/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer"
            >
              <img src="/Instagram.png" className="w-6 h-6 mr-2" alt="Instagram" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Mobile Social Media Links */}
        <div className="flex flex-col items-center md:hidden w-full">
          <div className="flex justify-center w-full mb-4">
            <a
              href="https://www.tiktok.com/@keylumina"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer"
            >
              <img src="/tiktok.png" className="w-6 h-6 mr-2" alt="Tiktok" />
              <span>TikTok</span>
            </a>
          </div>
          
          <div className="flex justify-center w-full mb-6">
            <a
              href="https://www.youtube.com/@Keylumina"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer mr-8"
            >
              <img src="/Youtube.png" className="w-6 h-6 mr-2" alt="Youtube" />
              <span>YouTube</span>
            </a>
            
            <a
              href="https://www.instagram.com/keylumina/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer"
            >
              <img src="/Instagram.png" className="w-6 h-6 mr-2" alt="Instagram" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Copyright text */}
        <div className="text-center mt-4 w-full">
          <p>Copyright © 2025 KeyLumina Media School | All rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
