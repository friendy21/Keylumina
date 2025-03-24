"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#660099] text-white py-8 w-full mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Logo and Contact Us section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-6 w-full">
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
            <h3 className="text-xl font-bold">CONTACT US</h3>
          </div>
        </div>
        
        {/* Social Media Links - Mobile Layout Adjusted */}
        <div className="flex flex-col items-center md:hidden w-full">
          {/* WhatsApp and TikTok in first row on mobile */}
          <div className="flex justify-center w-full mb-4">
            {/* <a
              href="tel:+0888888888888"
              className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer mr-8"
            >
              <img src="/Whatsapp.png" className="w-6 h-6 mr-2" alt="Whatsapps" />
              <span>+088 8888 888888</span>
            </a>
             */}
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
          
          {/* YouTube and Instagram in second row on mobile */}
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
        
        {/* Desktop layout - all social media links in one row */}
        <div className="hidden md:flex md:flex-wrap md:items-center md:justify-end md:gap-8 w-full">
          {/* <a
            href="tel:+0888888888888"
            className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer"
          >
            <img src="/Whatsapp.png" className="w-6 h-6 mr-2" alt="Whatsapps" />
            <span>+088 8888 888888</span>
          </a>
           */}
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
        
        {/* Copyright text */}
        <div className="text-center mt-4 w-full">
          <p>KeyLumina | Alright Reserved 2025</p>
        </div>
      </div>
    </footer>
  )
}
