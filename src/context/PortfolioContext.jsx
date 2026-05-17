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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/portfolio';

export function PortfolioProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [experience, setExperience] = useState(defaultExperience);
  const [education, setEducation] = useState(defaultEducation);
  const [skills, setSkills] = useState(defaultSkills);
  const [languages, setLanguages] = useState(defaultLanguages);
  const [projects, setProjects] = useState(defaultProjects);
  const [certificates, setCertificates] = useState(defaultCertificates);

  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const debounceTimer = useRef(null);

  // Fetch data from MySQL Backend on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          // Merge fetched data, if any table is empty, fallback is handled here
          if (data.profile && Object.keys(data.profile).length > 0) setProfile(data.profile);
          if (data.experience?.length) setExperience(data.experience);
          if (data.education?.length) setEducation(data.education);
          if (data.skills?.length) setSkills(data.skills);
          if (data.languages?.length) setLanguages(data.languages);
          if (data.projects?.length) setProjects(data.projects);
          if (data.certificates?.length) setCertificates(data.certificates);
        } else {
          console.warn('Backend returned error, using default data');
        }
      } catch (error) {
        console.error('Failed to connect to backend, using default data. Is MySQL and server.js running?', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    }
    fetchData();
  }, []);

  // Save to MySQL Backend whenever state changes
  useEffect(() => {
    if (!isInitialized) return; // Prevent saving on initial load

    const saveDataToBackend = async () => {
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profile,
            experience,
            education,
            skills,
            languages,
            projects,
            certificates
          }),
        });
        console.log('✅ Synchronized with MySQL Backend');
      } catch (error) {
        console.error('❌ Failed to save to backend:', error);
      }
    };

    // Debounce the save to prevent spamming the backend
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      saveDataToBackend();
    }, 1000);

  }, [profile, experience, education, skills, languages, projects, certificates, isInitialized]);

  const resetAll = () => {
    setProfile(defaultProfile);
    setExperience(defaultExperience);
    setEducation(defaultEducation);
    setSkills(defaultSkills);
    setLanguages(defaultLanguages);
    setProjects(defaultProjects);
    setCertificates(defaultCertificates);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#e0d1fa', fontFamily: "'Space Grotesk', sans-serif" }}>
        <h2>Loading Portfolio Data...</h2>
      </div>
    );
  }

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
