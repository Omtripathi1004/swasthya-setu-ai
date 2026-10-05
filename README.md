# 🏥 SwasthyaSetu AI — Bharat's Rural & Tier-3/4 Healthcare Intelligence Platform

> **WhyCode_4U Hackathon 2026** — Theme: *"Healthcare for Every Individual"*  
> 🌐 **Live Vercel Site**: [https://swasthyasetuai-rouge.vercel.app/](https://swasthyasetuai-rouge.vercel.app/)  
> 🔗 **GitHub Repository**: [https://github.com/Omtripathi1004/swasthya-setu-ai](https://github.com/Omtripathi1004/swasthya-setu-ai)  
> 🚀 **Deploy on Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FOmtripathi1004%2Fswasthya-setu-ai)

---

## 🌟 Overview

**SwasthyaSetu AI** is a production-quality, multi-lingual rural & Tier-3/4 healthcare platform built for the **WhyCode_4U Hackathon 2026**. It connects patients, ASHA field workers, PHC/CHC doctors, and District Health Officers into one connected healthcare intelligence ecosystem.

---

## 🏛️ The 5 Pillars of SwasthyaSetu AI

1. **ACCESS**: Interactive spatial Leaflet map for PHCs, CHCs, District Hospitals & Jan Aushadhi stores with real-time travel times and bed availability.
2. **AI TRIAGE**: Smart symptom intake calculator evaluating risk scores (0–100), urgency tiers, and referral pathways.
3. **TELEMEDICINE**: eSanjeevani virtual clinic suite with encrypted video call preview and electronic generic prescription generation.
4. **COMMUNITY HEALTH**: ASHA/ANM mobile-first field app with household visit queue, maternal ANC tracker, child immunization schedule, and **Offline Sync Simulator** (`Offline Mode → Local Queue → Sync`).
5. **DATA-DRIVEN GOVERNANCE**: District Officer AI Resource Allocation Engine recommending medicine transfers, mobile health van dispatch, and Bharat Health Equity Score (0–100).

---

## 👤 6 Role-Based Views

- **Patient / Citizen**: AI Assistant, Smart Triage, Nearby Map, Telemedicine, Jan Aushadhi Finder, ABHA Health ID.
- **ASHA / ANM Worker**: Today's Household Visit Queue, ANC Checkups, Child Immunization Dues, Offline Sync.
- **Doctor / Medical Officer**: eSanjeevani Teleconsultation Queue, Live Virtual Suite, e-Prescription Generator.
- **PHC / CHC Staff**: Bed Availability, Doctor Shifts, Oxygen Stock, Equipment Status.
- **District Health Officer (CMO)**: Outbreak Surveillance, AI Resource Redistribution, Health Equity Leaderboard.
- **System Admin**: Audit Logs, System Analytics, Government Data Source Hub (`/data-sources`).

---

## 📊 Government Data Sources & Transparency

Integrates verified open government metadata from:
- **National Health Authority (NHA)** — PM-JAY & ABDM Registry
- **Ministry of Health & Family Welfare (MoHFW)** — HMIS Portal
- **Open Government Data Platform India (`data.gov.in`)** — Health Facility Directories
- **National Family Health Survey (NFHS-5)** — Demographic Benchmarks
- **India Meteorological Department (IMD)** — Temperature, Humidity & Vector Outbreak Index

---

## 💻 Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES Modules), Tailwind CSS, Lucide Icons, Leaflet Maps.
- **Design System**: KrishiMitra inspired UX, Glassmorphic Headers, Custom Dark/Light Mode, Plus Jakarta Sans.
- **Deployment**: Live on **Vercel** (`https://swasthyasetuai-rouge.vercel.app/`) and **GitHub**.

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Omtripathi1004/swasthya-setu-ai.git

# Navigate into project directory
cd swasthya-setu-ai

# Serve static files (using Python http.server or any local server)
python -m http.server 8000
```

Open `http://localhost:8000` in your web browser.
