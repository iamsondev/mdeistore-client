"use client";

import {
  Menu,
  Pill,
  Info,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  UserCircle,
  Shapes,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CartIcon } from "./CartIcon";
import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/store/cartStore/cartStore";

import { getAllCategories } from "@/actions/category.action";
import { Category } from "@/types/medicine.type";

// Support links are now part of mainRoutes


const mainRoutes = [
  { title: "About Us", url: "/about-us" },
  { title: "Articles", url: "/blog" },
  { title: "Help Center", url: "/help-center" },
  { title: "Contact Us", url: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const fetchCategories = async () => {
      const res = await getAllCategories();
      const data = res?.data;
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data && typeof data === "object") {
        const nested = Object.values(data).find(Array.isArray);
        if (nested) setCategories(nested as Category[]);
      }
    };

    fetchCategories();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clearCart = useCartStore((state) => state.clearCart);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          clearCart(); // Clear cart items on logout for security
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const isLoggedIn = !!session?.user;
  const user = session?.user;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-primary/10 shadow-lg shadow-primary/5 h-16"
          : "bg-background h-20"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Pill className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">Medistore</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>

                {/* Home */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className={navClass(pathname === "/")}>
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Shop Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent font-semibold">Shop</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] md:w-[500px] md:grid-cols-2 gap-3 p-4">
                      {categories.length > 0 ? (
                        categories.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={`/shop?categoryId=${item.id}`}
                              className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition group"
                            >
                              {item.image ? (
                                <img src={item.image} alt={item.name} className="h-5 w-5 rounded-md object-cover transition group-hover:scale-110" />
                              ) : (
                                <Shapes className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                              )}
                              <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground w-full col-span-2">
                          Loading categories...
                        </div>
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Prescription, Articles, Contact */}
                {mainRoutes.map((route) => (
                  <NavigationMenuItem key={route.title}>
                    <NavigationMenuLink asChild>
                      <Link href={route.url} className={navClass(pathname === route.url)}>
                        {route.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}



              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4">
            <CartIcon />
            <ModeToggle />

            {mounted && (
              <>
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all">
                        {user?.image ? (
                          <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {user?.name?.charAt(0) || "U"}
                          </div>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile/edit" className="cursor-pointer">
                          <UserCircle className="mr-2 h-4 w-4" />
                          <span>Edit Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <Button size="sm" className="hidden sm:flex rounded-full px-6 shadow-md shadow-primary/10 font-bold active:scale-95 transition-transform">
                      Login
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-secondary rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] overflow-y-auto p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="text-left border-b p-6 bg-muted/20">
                    <SheetTitle className="flex items-center gap-2">
                      <Pill className="h-6 w-6 text-primary" />
                      <span className="text-primary font-bold italic">Medistore</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto py-6 px-6 space-y-8">
                    {/* User Profile Mobile */}
                    {mounted && isLoggedIn && (
                      <>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                          <div className="h-12 w-12 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center font-bold text-primary">
                            {user?.image ? <img src={user.image} className="object-cover h-full w-full" /> : user?.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                          </div>
                        </div>

                        {/* Account Links Mobile */}
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-muted-foreground uppercase px-2 mb-2 tracking-widest">Account</p>
                          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-base font-semibold hover:bg-secondary rounded-xl transition-colors">
                            <LayoutDashboard className="h-5 w-5 text-primary" />
                            Dashboard
                          </Link>
                          <Link href="/profile/edit" className="flex items-center gap-3 px-4 py-3 text-base font-semibold hover:bg-secondary rounded-xl transition-colors">
                            <UserCircle className="h-5 w-5 text-primary" />
                            Edit Profile
                          </Link>
                        </div>
                      </>
                    )}

                    {/* Main Routes Mobile */}
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase px-2 mb-2 tracking-widest">Navigation</p>
                      <Link href="/" className="flex items-center px-4 py-3 text-base font-semibold hover:bg-secondary rounded-xl transition-colors">Home</Link>
                      {mainRoutes.map((r) => (
                        <Link key={r.title} href={r.url} className="flex items-center px-4 py-3 text-base font-semibold hover:bg-secondary rounded-xl transition-colors">
                          {r.title}
                        </Link>
                      ))}
                    </div>

                    {/* Categories Mobile */}
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase px-2 mb-2 tracking-widest">Categories</p>
                      <div className="grid grid-cols-1 gap-2">
                        {categories.map((c) => (
                          <Link key={c.id} href={`/shop?categoryId=${c.id}`} className="flex items-center gap-3 px-4 py-3 border border-border rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all">
                            {c.image ? (
                              <img src={c.image} alt={c.name} className="h-5 w-5 rounded object-cover" />
                            ) : (
                              <Shapes className="h-5 w-5 text-primary" />
                            )}
                            <span className="text-sm font-semibold">{c.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>


                  </div>

                  <div className="p-6 border-t bg-muted/40 mt-auto">
                    {mounted && isLoggedIn ? (
                      <Button onClick={handleLogout} variant="destructive" className="w-full gap-2 rounded-xl h-12 shadow-lg shadow-destructive/10">
                        <LogOut className="h-5 w-5" />
                        Logout
                      </Button>
                    ) : (
                      <Link href="/login">
                        <Button className="w-full gap-2 rounded-xl h-12 shadow-lg shadow-primary/20">
                          <User className="h-5 w-5" />
                          Login / Signup
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}

function navClass(active: boolean) {
  return cn(
    "px-4 py-2 text-sm font-bold rounded-full transition-all duration-200",
    active
      ? "text-primary bg-primary/10 shadow-sm"
      : "text-muted-foreground hover:text-primary hover:bg-secondary"
  );
}