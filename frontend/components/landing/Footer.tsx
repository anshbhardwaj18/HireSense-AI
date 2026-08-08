import Link from "next/link";
import {
  Mail,
  ArrowUpRight,
} from "lucide-react";

const productLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Resume Analysis", href: "#analysis" },
  { name: "Job Matching", href: "#job-matching" },
];

const companyLinks = [
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03040b] px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Main footer */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white shadow-lg shadow-violet-500/20">
                H
              </div>

              <span className="text-lg font-bold text-white">
                HireSense<span className="text-violet-400"> AI</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
              AI-powered career intelligence that helps you understand
              your resume, discover skill gaps, and find better career
              opportunities.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-500 transition hover:border-violet-500/30 hover:text-white"
              >
                <span className="text-xs font-bold">GH</span>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-500 transition hover:border-violet-500/30 hover:text-white"
              >
                <span className="text-xs font-bold">in</span>
              </a>

              <a
                href="#"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-500 transition hover:border-violet-500/30 hover:text-white"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Product
            </h3>

            <div className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-1 text-sm text-slate-500 transition hover:text-white"
                >
                  {link.name}

                  <ArrowUpRight
                    size={12}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Company
            </h3>

            <div className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-1 text-sm text-slate-500 transition hover:text-white"
                >
                  {link.name}

                  <ArrowUpRight
                    size={12}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} HireSense AI. All rights reserved.
          </p>

          <p>
            Built with AI to help you build your career.
          </p>
        </div>
      </div>
    </footer>
  );
}