import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const MENU = [
  {
    key: "personal",
    label: "Personal Banking",
    items: [
      { path: "/personal/checking-accounts", label: "Checking Accounts" },
      { path: "/personal/checking-accounts/compare", label: "Compare Checking Accounts" },
      { path: "/personal/checking-accounts/switch-kit", label: "Switch Kit" },
      { path: "/personal/savings", label: "Savings Account" },
      { path: "/personal/cd-rates", label: "Certificate of Deposit (CD) Rates" },
      { path: "/personal/online-banking", label: "Online Banking" },
      { path: "/personal/loans", label: "Loans" },
      { path: "/personal/credit-cards", label: "Credit Cards" }
    ]
  },
  {
    key: "business",
    label: "Business Banking",
    items: [
      { path: "/business/business-checking", label: "Business Checking" },
      { path: "/business/savings", label: "Savings" },
      { path: "/business/business-lending", label: "Business Lending" },
      { path: "/business/cash-management", label: "Cash Management" }
    ]
  },
  {
    key: "mortgage",
    label: "Mortgage Center",
    items: [
      { path: "/mortgage/mortgage-process", label: "Mortgage Process" },
      { path: "/mortgage/mortgage-glossary", label: "Mortgage Glossary" },
      { path: "/mortgage/homebuyer-resources", label: "Homebuyer Resources" },
      { path: "/mortgage/mortgage-options", label: "Mortgage Options" },
      { path: "/mortgage/mortgage-rates", label: "Mortgage Rates" },
      { path: "/mortgage/calculators", label: "Mortgage Calculators / Application" }
    ]
  },
  {
    key: "wealth",
    label: "Wealth Management",
    items: [
      { path: "/wealth", label: "Wealth Management Overview" }
    ]
  },
  {
    key: "foundation",
    label: "Foundation",
    items: [
      { path: "/foundation/grant-applications", label: "Grant Applications" },
      { path: "/foundation/awards", label: "Richard E. Tabor Award" },
      { path: "/foundation/grant-recipients", label: "Grant Recipients" },
      { path: "/foundation/news", label: "Foundation News" }
    ]
  }
];

const MY_ACCOUNT_LINKS = [
  { path: "/register", label: "Register" },
  { path: "/login", label: "Login" }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.classList.contains("mobile-toggle")
      ) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  return (
    <header className="nav-header">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <span className="logo-bold">Fin</span>County
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="nav-menu">
          <ul className="nav-links">
            {MENU.map((menu) => (
              <li
                key={menu.key}
                className="nav-item"
                onMouseEnter={() => setOpenMenu(menu.key)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="nav-button">
                  {menu.label}
                  <span className="nav-arrow">▾</span>
                </button>

                {openMenu === menu.key && (
                  <div className="dropdown">
                    {menu.items.map((item, i) => (
                      <Link key={i} to={item.path} className="dropdown-link">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* My Account + Mobile Toggle */}
        <div className="nav-right">
          <div
            className="my-account"
            onMouseEnter={() => setOpenMenu("account")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="account-btn">My Account ▾</button>

            {openMenu === "account" && (
              <div className="dropdown right">
                {MY_ACCOUNT_LINKS.map((item, i) => (
                  <Link key={i} to={item.path} className="dropdown-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu" ref={mobileMenuRef}>
          {MENU.map((menu) => (
            <details key={menu.key} className="mobile-dropdown">
              <summary>{menu.label}</summary>
              <div className="mobile-dropdown-items">
                {menu.items.map((item, i) => (
                  <Link
                    key={i}
                    to={item.path}
                    className="mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}

          <details className="mobile-dropdown">
            <summary>My Account</summary>
            <div className="mobile-dropdown-items">
              {MY_ACCOUNT_LINKS.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className="mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      )}
    </header>
  );
}
