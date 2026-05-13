// src/components/sections/FeaturedJobs/FilterSection.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './featured-jobs.module.css';
import { FiFilter, FiDollarSign, FiZap, FiTarget } from 'react-icons/fi'; // نصب کن: npm i react-icons

export default function FilterSection({
  selectedJobTypes, setSelectedJobTypes,
  selectedModes, setSelectedModes,
  selectedSkills, setSelectedSkills,
  salaryRange, setSalaryRange,
}: any) {
  
  const [isOpen, setIsOpen] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  const jobTypes = ['Full-time', 'Part-time', 'Contract'];
  const modes = ['Remote', 'Hybrid', 'On-site'];
  const allSkills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'GraphQL'];

  const toggle = (value: string, list: string[], setter: any) => {
    if (list.includes(value)) setter(list.filter((v: any) => v !== value));
    else setter([...list, value]);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <FiFilter /> <span>Advanced Filters</span>
      </div>
      
      <div className={styles.filterGrid}>
        {/* Job Type Group */}
        <div className={styles.filterBlock}>
          <label><FiZap size={14}/> Job Type</label>
          <div className={styles.filterGroup}>
            {jobTypes.map(j => (
              <button key={j} 
                className={`${styles.chip} ${selectedJobTypes.includes(j) ? styles.activeChip : ''}`}
                onClick={() => toggle(j, selectedJobTypes, setSelectedJobTypes)}>
                {j}
              </button>
            ))}
          </div>
        </div>

        {/* Work Mode Group */}
        <div className={styles.filterBlock}>
          <label><FiTarget size={14}/> Work Mode</label>
          <div className={styles.filterGroup}>
            {modes.map(m => (
              <button key={m}
                className={`${styles.chip} ${selectedModes.includes(m) ? styles.activeChip : ''}`}
                onClick={() => toggle(m, selectedModes, setSelectedModes)}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Salary Group */}
        <div className={styles.filterBlock} ref={popRef}>
          <label><FiDollarSign size={14}/> Monthly Salary</label>
          <button className={styles.salaryTrigger} onClick={() => setIsOpen(!isOpen)}>
            ${salaryRange[0]/1000}k – ${salaryRange[1]/1000}k
          </button>
          
          {isOpen && (
            <div className={styles.salaryPopover}>
               <input type="range" min="0" max="20000" step="500" 
                      value={salaryRange[0]} 
                      onChange={e => setSalaryRange([+e.target.value, salaryRange[1]])} />
               <input type="range" min="0" max="20000" step="500" 
                      value={salaryRange[1]} 
                      onChange={e => setSalaryRange([salaryRange[0], +e.target.value])} />
               <div className={styles.rangeLabels}>
                  <span>${salaryRange[0]}</span>
                  <span>${salaryRange[1]}</span>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Skills Row */}
      <div className={styles.skillsWrapper}>
        <span className={styles.skillsLabel}>Common Skills:</span>
        <div className={styles.skillsRow}>
          {allSkills.map(s => (
            <button key={s}
              className={`${styles.skillChip} ${selectedSkills.includes(s) ? styles.skillActive : ''}`}
              onClick={() => toggle(s, selectedSkills, setSelectedSkills)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
