import { lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";

const ContactForm = lazy(() =>
  import("./components/ContactForm")
);

const Admin = lazy(() =>
  import("./pages/Admin")
);

function App() {
  return (
    <main className="app">
      <section className="container">

        <div className="hero">

          <p className="badge">
            Production Ready Contact Portal
          </p>

          <h1>
            Secure Contact
            <br />
            Portal
          </h1>

          <p className="subtitle">
            Demonstrating React, Express, MongoDB,
            Zod Validation, Rate Limiting,
            Morgan, Winston Logging,
            Helmet and Cloudflare.
          </p>

          <div className="nav-buttons">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "nav-btn active"
                  : "nav-btn"
              }
            >
              Contact Form
            </NavLink>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "nav-btn active"
                  : "nav-btn"
              }
            >
              Admin Dashboard
            </NavLink>

          </div>

        </div>

        <Suspense
          fallback={
            <div className="contact-card">
              <h2>Loading...</h2>
            </div>
          }
        >

          <Routes>

            <Route
              path="/"
              element={<ContactForm />}
            />

            <Route
              path="/admin"
              element={<Admin />}
            />

          </Routes>

        </Suspense>

      </section>
    </main>
  );
}

export default App;