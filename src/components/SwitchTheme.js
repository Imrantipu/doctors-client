import "./SwitchTheme.css"
import React, { useState } from "react";
 import { useEffect } from 'react';
// import { useLocalStorage } from 'usehooks-ts';
import { FiMoon, FiSun } from 'react-icons/fi';
const SwitchTheme = () => {
  //we store the theme in localStorage to preserve the state on next visit with an initial theme of dark.
  // const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'cmyk');
  //toggles the theme
  const toggleTheme = () => {
    setTheme(theme === "cmyk" ? "dark" : "cmyk");
  };
  //modify data-theme attribute on document.body when theme changes
  // useEffect(() => {
  //   const body = document.body;
  //   body.setAttribute("data-theme", theme);
  // }, [theme]);
  useEffect(()=>{
    localStorage.setItem('theme', theme);
    document.body.className = theme;
}, [theme]);
  return (
    <div className="tooltip tooltip-bottom" data-tip="Toggle Mode">
      <button className="btn btn-circle" onClick={toggleTheme}>
      {theme === "dark" ? (
        <FiMoon className="w-3 h-3" />
      ) : (
        <FiSun className="w-3 h-3" />
      )}
    </button>
    </div>
  );
};
export default SwitchTheme;