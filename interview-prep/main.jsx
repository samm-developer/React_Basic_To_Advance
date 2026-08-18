import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LoginForm,
  UncontrolledLogin,
} from "./step-02-react-basics/02-controlled-forms.jsx";
import "./demo.css";

function Demo() {
  const [controlledResult, setControlledResult] = useState(null);
  const [uncontrolledResult, setUncontrolledResult] = useState(null);

  return (
    <main className="page">
      <h1>Controlled vs Uncontrolled</h1>
      <p className="lead">
        Type in both forms and submit. Controlled re-renders on every keystroke
        (React state). Uncontrolled only reads values on submit (DOM + ref).
      </p>

      <div className="grid">
        <section className="card">
          <h2>Controlled</h2>
          <p>
            <code>value</code> + <code>onChange</code> + <code>useState</code>
          </p>
          <LoginForm onSubmit={setControlledResult} />
          {controlledResult && (
            <pre>{JSON.stringify(controlledResult, null, 2)}</pre>
          )}
        </section>

        <section className="card">
          <h2>Uncontrolled</h2>
          <p>
            <code>ref</code> + <code>defaultValue</code> + <code>useRef</code>
          </p>
          <UncontrolledLogin onSubmit={setUncontrolledResult} />
          {uncontrolledResult && (
            <pre>{JSON.stringify(uncontrolledResult, null, 2)}</pre>
          )}
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Demo />
  </StrictMode>
);
