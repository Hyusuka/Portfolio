/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  defaultProfile,
  defaultExperience,
  defaultEducation,
  defaultSkills,
  defaultLanguages,
  defaultProjects,
  defaultCertificates,
} from '../data/portfolioData';

const PortfolioContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api/portfolio' : '/api/portfolio');

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [experience, setExperience] = useState(defaultExperience);
  const [education, setEducation] = useState(defaultEducation);
  const [skills, setSkills] = useState(defaultSkills);
  const [languages, setLanguages] = useState(defaultLanguages);
  const [projects, setProjects] = useState(defaultProjects);
  const [certificates, setCertificates] = useState(defaultCertificates);

  // We are no longer using a database, state is initialized directly from portfolioData.js
  // Changes in Admin panel will only be temporary per session.
  // To make permanent changes, edit src/data/portfolioData.js directly in VSCode.

  const resetAll = () => {
    setProfile(defaultProfile);
    setExperience(defaultExperience);
    setEducation(defaultEducation);
    setSkills(defaultSkills);
    setLanguages(defaultLanguages);
    setProjects(defaultProjects);
    setCertificates(defaultCertificates);
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile, setProfile,
        experience, setExperience,
        education, setEducation,
        skills, setSkills,
        languages, setLanguages,
        projects, setProjects,
        certificates, setCertificates,
        resetAll,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
