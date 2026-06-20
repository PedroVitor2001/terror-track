"use client";
import { useState } from "react";
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(true)

    return (
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="cursor-pointer">{
            isDarkMode ? <Moon color="#90D5FF"/> : <Sun color="#90D5FF"/>
        }</button>
    );
}