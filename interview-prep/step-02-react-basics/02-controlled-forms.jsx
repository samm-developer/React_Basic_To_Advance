/**
 * STEP 2 — Controlled Forms & Validation
 */

import { useState, useRef } from "react";

function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.email.includes("@")) next.email = "Invalid email";
    if (form.password.length < 8) next.password = "Min 8 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Q: Why functional update? Safe when state depends on previous state
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Q: Why? Prevent full page reload
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        aria-invalid={!!errors.email}
      />
      {errors.email && <span role="alert">{errors.email}</span>}

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <span role="alert">{errors.password}</span>}

      <button type="submit">Login</button>
    </form>
  );
}

// ─── Uncontrolled alternative (useRef) ──────────────────────────────────────
// Q: When use uncontrolled? File inputs, integrating non-React libs, simple forms
function UncontrolledLogin({ onSubmit }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" defaultValue="" />
      <input ref={passwordRef} type="password" />
      <button type="submit">Login</button>
    </form>
  );
}

export { LoginForm, UncontrolledLogin };
