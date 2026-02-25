import { create } from "zustand";

const defaultData = {
  template: "Modern",
  sectionsOrder: ["personal", "summary", "experience", "education", "projects", "skills"],
  personal: {
    name: "Aarav Patel",
    title: "Senior Backend Engineer",
    email: "aarav@mail.com",
    phone: "+91 90000 00000",
    location: "Bengaluru, IN",
    links: "github.com/aarav | linkedin.com/in/aarav"
  },
  summary: {
    text: "Impact-driven engineer with 5+ years building scalable SaaS platforms."
  },
  experience: [
    {
      id: "exp-1",
      role: "Senior Engineer",
      company: "ProResume",
      period: "2022 - Present",
      bullets: "Led migration to Spring Boot 3.\nReduced export time by 40%."
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "IIT Delhi",
      degree: "B.Tech, CSE",
      period: "2014 - 2018"
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "Resume Studio",
      stack: "React, Spring Boot",
      description: "ATS friendly resume builder with export pipeline."
    }
  ],
  skills: {
    items: "Java, Spring Boot, React, PostgreSQL, Redis"
  }
};

export const useResumeEditorStore = create((set) => ({
  data: defaultData,
  setData: (data) => set({ data }),
  setTemplate: (template) => set((s) => ({ data: { ...s.data, template } }))
}));
