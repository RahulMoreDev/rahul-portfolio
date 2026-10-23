import { useState, useEffect } from 'react';

const ROLES = ['Software Developer', 'Full Stack Engineer', 'Java Developer', 'React Developer', 'API Developer'];

export default function Typewriter() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timer;

    if (!deleting && charIdx <= current.length) {
      timer = setTimeout(() => {
        setText(current.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, 80);
    } else if (!deleting && charIdx > current.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx >= 0) {
      timer = setTimeout(() => {
        setText(current.slice(0, charIdx));
        setCharIdx(c => c - 1);
      }, 45);
    } else if (deleting && charIdx < 0) {
      setDeleting(false);
      setCharIdx(0);
      setRoleIdx(r => (r + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, deleting, roleIdx]);

  return (
    <span className="gradient-text-static typewriter-cursor">
      {text}
    </span>
  );
}
