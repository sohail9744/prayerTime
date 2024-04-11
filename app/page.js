"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
import Dashboard from "./pages/dashboard";
import DefaultTheme from "./templates/blueTheme/page";
export default function Home() {

  return (
    <Dashboard />
    // <DefaultTheme />
  );
}
