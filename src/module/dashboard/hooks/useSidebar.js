"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing sidebar state
 * Persists the collapsed state to localStorage
 */
export const useSidebar = (initialCollapsed = false) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [isMounted, setIsMounted] = useState(false);

  // Load saved state from localStorage after mount
  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, isMounted]);

  const toggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const collapse = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const expand = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  return {
    isCollapsed,
    toggle,
    collapse,
    expand,
    setIsCollapsed,
  };
};
