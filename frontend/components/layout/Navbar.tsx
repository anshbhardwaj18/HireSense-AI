"use client";

import Link from "next/link";
import { ArrowRight, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[var(--hs-border)] bg-[var(--hs-navbar-bg)] backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
            <span className="text-sm font-bold text-white">H</span>
          </div>

          <div>
            <span className="text-lg font-bold tracking-tight text-[var(--hs-text-primary)]">
              HireSense
            </span>
            <span className="ml-1 text-lg font-bold text-violet-400">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm text-[var(--hs-text-muted)] transition hover:text-[var(--hs-text-primary)]"
          >
            Features
          </Link>

          <Link
            href="/#how-it-works"
            className="text-sm text-[var(--hs-text-muted)] transition hover:text-[var(--hs-text-primary)]"
          >
            How It Works
          </Link>

          <Link
            href="/about"
            className="text-sm text-[var(--hs-text-muted)] transition hover:text-[var(--hs-text-primary)]"
          >
            About
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle */}
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-500 hover:to-indigo-500"
              >
                <LayoutDashboard size={16} />
                Dashboard
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--hs-border)] bg-[var(--hs-surface)] px-4 py-2 text-sm font-medium text-[var(--hs-text-muted)] transition hover:text-[var(--hs-text-primary)]"
              >
                <LogOut size={15} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--hs-text-muted)] transition hover:bg-[var(--hs-surface)] hover:text-[var(--hs-text-primary)]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-500 hover:to-indigo-500"
              >
                Get Started
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </>
          )}
        </div>

        {/* Mobile: Theme Toggle + Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--hs-border)] text-[var(--hs-text-muted)] transition hover:bg-[var(--hs-surface)] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--hs-border)] bg-[var(--hs-navbar-bg)] px-6 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="/#features"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-[var(--hs-text-muted)] transition hover:bg-[var(--hs-surface)] hover:text-[var(--hs-text-primary)]"
            >
              Features
            </Link>

            <Link
              href="/#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-[var(--hs-text-muted)] transition hover:bg-[var(--hs-surface)] hover:text-[var(--hs-text-primary)]"
            >
              How It Works
            </Link>

            <Link
              href="/#about"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-[var(--hs-text-muted)] transition hover:bg-[var(--hs-surface)] hover:text-[var(--hs-text-primary)]"
            >
              About
            </Link>

            <div className="my-2 h-px bg-[var(--hs-border)]" />

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-violet-600/20"
                >
                  <LayoutDashboard size={18} />
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="mt-1 flex items-center justify-center gap-2 rounded-lg border border-[var(--hs-border)] bg-[var(--hs-surface)] px-4 py-3 text-center text-sm font-medium text-[var(--hs-text-muted)] transition hover:text-[var(--hs-text-primary)]"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-[var(--hs-text-muted)] transition hover:bg-[var(--hs-surface)] hover:text-[var(--hs-text-primary)]"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:from-violet-500 hover:to-indigo-500"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


// export default function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { isAuthenticated, logout, user } = useAuth();

//   return (
//     <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
//       <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-3">
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
//             <span className="text-sm font-bold text-white">H</span>
//           </div>

//           <div>
//             <span className="text-lg font-bold tracking-tight text-white">
//               HireSense
//             </span>
//             <span className="ml-1 text-lg font-bold text-violet-400">
//               AI
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden items-center gap-8 md:flex">
//           <Link
//             href="/#features"
//             className="text-sm text-slate-400 transition hover:text-white"
//           >
//             Features
//           </Link>

//           <Link
//             href="/#how-it-works"
//             className="text-sm text-slate-400 transition hover:text-white"
//           >
//             How It Works
//           </Link>

//           <Link
//             href="/about"
//             className="text-sm text-slate-400 transition hover:text-white"
//           >
//             About
//           </Link>
//         </div>

//         {/* Desktop Actions */}
//         <div className="hidden items-center gap-3 md:flex">
//           {isAuthenticated ? (
//             <>
//               <Link
//                 href="/dashboard"
//                 className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-500 hover:to-indigo-500"
//               >
//                 <LayoutDashboard size={16} />
//                 Dashboard
//                 <ArrowRight
//                   size={15}
//                   className="transition-transform group-hover:translate-x-0.5"
//                 />
//               </Link>
//               <button
//                 onClick={logout}
//                 className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
//               >
//                 <LogOut size={15} />
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/login"
//                 className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/signup"
//                 className="group flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
//               >
//                 Get Started
//                 <ArrowRight
//                   size={15}
//                   className="transition-transform group-hover:translate-x-0.5"
//                 />
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMobileOpen(!mobileOpen)}
//           className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:bg-white/5 md:hidden"
//           aria-label="Toggle menu"
//         >
//           {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <div className="border-t border-white/10 bg-slate-950/95 px-6 py-5 backdrop-blur-xl md:hidden">
//           <div className="flex flex-col gap-2">
//             <Link
//               href="/#features"
//               onClick={() => setMobileOpen(false)}
//               className="rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
//             >
//               Features
//             </Link>

//             <Link
//               href="/#how-it-works"
//               onClick={() => setMobileOpen(false)}
//               className="rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
//             >
//               How It Works
//             </Link>

//             <Link
//               href="/#about"
//               onClick={() => setMobileOpen(false)}
//               className="rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
//             >
//               About
//             </Link>

//             <div className="my-2 h-px bg-white/10" />

//             {isAuthenticated ? (
//               <>
//                 <Link
//                   href="/dashboard"
//                   onClick={() => setMobileOpen(false)}
//                   className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-violet-600/20"
//                 >
//                   <LayoutDashboard size={18} />
//                   Go to Dashboard
//                 </Link>
//                 <button
//                   onClick={() => {
//                     logout();
//                     setMobileOpen(false);
//                   }}
//                   className="mt-1 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/login"
//                   onClick={() => setMobileOpen(false)}
//                   className="rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   href="/signup"
//                   onClick={() => setMobileOpen(false)}
//                   className="mt-1 rounded-lg bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }