import React, { createContext, useState, useContext, useCallback } from "react";

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(() => {
    try {
      const theme =
        localStorage.getItem("@LinkedIn:theme") === "old" ? "old" : "new";
      return theme;
    } catch (err) {
      return "new";
    }
  });

  const changeTheme = useCallback(() => {
    try {
      const theme = themeName === "new" ? "old" : "new";
      setThemeName(theme);
      localStorage.setItem("@LinkedIn:theme", theme);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }

  return context;
};

export { ThemeProvider, useTheme };
