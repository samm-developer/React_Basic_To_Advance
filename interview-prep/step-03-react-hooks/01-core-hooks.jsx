/**
 * STEP 3 — Core Hooks
 */

import { useState, useEffect, useMemo, useCallback, useRef } from "react";

// ─── useState ─────────────────────────────────────────────────────────────────
function Counter() {
  const [count, setCount] = useState(0);

  // Q: Why not count + 1 directly? Batching — use functional form
  const increment = () => setCount((c) => c + 1);

  return <button onClick={increment}>{count}</button>;
}

// ─── useEffect — lifecycle + side effects ───────────────────────────────────
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false; // cleanup flag — prevents stale updates

    async function fetchUser() {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      if (!cancelled) setUser(data);
    }

    fetchUser();

    // Q: When is cleanup called? Before re-run AND on unmount
    return () => {
      cancelled = true;
    };
  }, [userId]); // re-fetch when userId changes

  return user ? <div>{user.name}</div> : <p>Loading...</p>;
}

// ─── useMemo & useCallback — performance ──────────────────────────────────────
function ExpensiveList({ items, onSelect }) {
  // Q: When NOT to use useMemo? Cheap computations — premature optimization
  const sorted = useMemo(
    () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  );

  const handleSelect = useCallback(
    (id) => onSelect(id),
    [onSelect]
  );

  return sorted.map((item) => (
    <button key={item.id} onClick={() => handleSelect(item.id)}>
      {item.name}
    </button>
  ));
}

// ─── useRef — no re-render on change ──────────────────────────────────────────
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return <span>{count}s</span>;
}

export { Counter, UserProfile, ExpensiveList, Timer };
