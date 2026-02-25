const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fakeUser = {
  id: "u_1",
  email: "demo@proresume.com",
  name: "Demo User",
  role: "USER"
};

let resumes = [
  {
    id: "r_1",
    title: "Software Engineer Resume",
    updatedAt: new Date().toISOString(),
    templateKey: "modern",
    sectionsOrder: ["personal", "summary", "experience", "education", "projects", "skills"],
    data: {
      personal: { fullName: "Demo User", title: "Frontend Engineer", email: "demo@proresume.com" },
      summary: "Product-focused engineer with 5+ years of experience.",
      experience: [
        {
          id: "exp_1",
          role: "Frontend Engineer",
          company: "Studio Labs",
          location: "Remote",
          start: "2022",
          end: "Present",
          bullets: ["Built a design system used by 12 teams."]
        }
      ],
      education: [
        { id: "edu_1", school: "IIT", degree: "B.Tech", start: "2016", end: "2020" }
      ],
      projects: [
        { id: "proj_1", name: "Resume Builder", summary: "ATS-friendly resume tool." }
      ],
      skills: ["React", "TypeScript", "Node.js"]
    }
  }
];

const templates = [
  { id: "t_1", key: "modern", name: "Modern", isPremium: false },
  { id: "t_2", key: "classic", name: "Classic", isPremium: false },
  { id: "t_3", key: "minimal", name: "Minimal", isPremium: true }
];

export function applyMockAdapter(axiosInstance) {
  axiosInstance.defaults.adapter = async (config) => {
    const { method = "get", url = "" } = config;
    await sleep(400);

    if (url.endsWith("/auth/login") && method === "post") {
      return ok({ accessToken: "mock_access", refreshToken: "mock_refresh", user: fakeUser });
    }
    if (url.endsWith("/auth/refresh") && method === "post") {
      return ok({ accessToken: "mock_access_2", refreshToken: "mock_refresh_2" });
    }
    if (url.endsWith("/auth/register") && method === "post") {
      return ok({ user: fakeUser });
    }
    if (url.endsWith("/auth/logout") && method === "post") {
      return ok({});
    }
    if (url.endsWith("/resumes") && method === "get") {
      return ok(resumes);
    }
    if (url.endsWith("/resumes") && method === "post") {
      const body = JSON.parse(config.data || "{}");
      const newResume = {
        id: `r_${Date.now()}`,
        title: body.title || "Untitled",
        updatedAt: new Date().toISOString(),
        templateKey: "modern",
        sectionsOrder: ["personal", "summary", "experience", "education", "projects", "skills"],
        data: {
          personal: { fullName: "", title: "", email: "" },
          summary: "",
          experience: [],
          education: [],
          projects: [],
          skills: []
        }
      };
      resumes = [newResume, ...resumes];
      return ok(newResume);
    }
    if (url.includes("/resumes/") && method === "put") {
      const id = url.split("/resumes/")[1];
      const body = JSON.parse(config.data || "{}");
      resumes = resumes.map((r) => (r.id === id ? { ...r, ...body, updatedAt: new Date().toISOString() } : r));
      return ok(resumes.find((r) => r.id === id));
    }
    if (url.includes("/resumes/") && url.endsWith("/draft") && method === "post") {
      return ok({ status: "saved" });
    }
    if (url.includes("/resumes/") && url.endsWith("/versions") && method === "post") {
      return ok({ id: `v_${Date.now()}`, version: 2, status: "published" });
    }
    if (url.endsWith("/templates") && method === "get") {
      return ok(templates);
    }
    if (url.includes("/exports/") && method === "post") {
      return ok({ id: `ex_${Date.now()}`, status: "processing" });
    }
    if (url.includes("/exports/") && method === "get") {
      return ok({ id: url.split("/exports/")[1], status: "done", fileUrl: "https://example.com/demo.pdf" });
    }
    if (url.includes("/share/") && method === "post") {
      return ok({ slug: "demo-resume", url: "http://localhost:5173/r/demo-resume" });
    }

    return err(404, "Not found");
  };
}

function ok(data) {
  return {
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {}
  };
}

function err(status, message) {
  return Promise.reject({
    response: {
      status,
      data: { message }
    }
  });
}
