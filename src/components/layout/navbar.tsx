"use client";

import { Menu, Search, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "MediStore 💊",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: any) => {
  const { data: session } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoggedIn = !!session?.user;

  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-xl font-bold tracking-tighter hidden sm:block">
                {logo.title}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-sm relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search medicine..."
              className="pl-8 w-full bg-muted/50 focus-visible:ring-primary"
            />
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {menu.map((item: any) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url}
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-3 border-l pl-4">
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>

              <ModeToggle />

              {mounted && (
                <div className="flex items-center gap-2 ml-2">
                  {isLoggedIn ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => authClient.signOut()}
                      >
                        Logout
                      </Button>
                      <Button asChild size="sm">
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">{logo.title}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search medicine..."
                      className="pl-8"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    {menu.map((item: any) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3 border-t pt-6">
                    {mounted && isLoggedIn ? (
                      <>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => authClient.signOut()}
                        >
                          Logout
                        </Button>
                        <Button asChild className="w-full">
                          <Link href="/dashboard">Dashboard</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild className="w-full">
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };
