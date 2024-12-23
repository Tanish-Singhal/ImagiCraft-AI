import React from "react";
import Link from "next/link";
import { FaXTwitter, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} ImagiCraft AI. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/Tanish-Singhal"
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={22} />
            </Link>
            <Link
              href="https://twitter.com/your-twitter"
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
