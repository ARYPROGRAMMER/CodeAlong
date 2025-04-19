"use client";

import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Code2Icon, Menu, X } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import DashboardButton from "./DashboardButton";
import { Button } from "@/components/ui/button";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border/40 sticky top-0 z-50 bg-background/90 backdrop-blur-md shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6 container mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-2xl mr-auto font-mono hover:opacity-75 transition-all duration-200 group"
        >
          <Code2Icon className="size-8 text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            CodeAlong
          </span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="hover:bg-muted"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/features"
            className="text-muted-foreground font-medium hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="/docs"
            className="text-muted-foreground font-medium hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/pricing"
            className="text-muted-foreground font-medium hover:text-foreground transition-colors"
          >
            Pricing
          </Link>

          <SignedIn>
            <div className="flex items-center space-x-4 ml-6 border-l border-border/60 pl-6">
              <DashboardButton />
              <ModeToggle />
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

      
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden p-4 pb-6 border-t border-border/40 space-y-5 bg-background shadow-md">
          <div className="flex flex-col space-y-3 pt-2">
            <Link
              href="/features"
              className="px-3 py-2 hover:bg-muted rounded-md transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/docs"
              className="px-3 py-2 hover:bg-muted rounded-md transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-2 hover:bg-muted rounded-md transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
          </div>

          <SignedIn>
            <div className="pt-4 border-t border-border/40 flex items-center justify-between">
              <DashboardButton />
              <div className="flex items-center space-x-3">
                <ModeToggle />
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </SignedIn>

      
        </div>
      )}
    </nav>
  );
}

export default Navbar;
