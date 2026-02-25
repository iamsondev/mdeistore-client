"use client";

import Link from "next/link";
import { FaFacebook, FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">💊 MediStore</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Your trusted online medicine shop. Browse OTC medicines and get
            delivered fast.
          </p>
          <div className="flex gap-4 text-muted-foreground">
            <a
              href="https://www.linkedin.com/in/sondip-kumar-8637b9179/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://www.facebook.com/sondip.kumar.750"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="https://github.com/iamsondev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://x.com/SonDIPX"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <FaXTwitter size={22} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="hover:text-primary transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-primary transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="hover:text-primary transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>📧 support@medistore.com</li>
            <li>📞 +880 1774032681</li>
            <li>📍 Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="border-t mt-8 pt-6 text-center text-muted-foreground text-sm">
        <p>© 2026 MediStore. All rights reserved.</p>
      </div>
    </footer>
  );
}
