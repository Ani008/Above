# Above

A prototype of a deal discovery platform for the Indian money market. Banks register, post borrowing deals with their terms, and browse deals posted by other banks, with market rate data from the Reserve Bank of India (RBI) alongside.

## The Problem

Money market funding between banks, with ticket sizes in the hundreds of crores, is arranged mostly through phone calls, WhatsApp messages and email. Treasury teams rely on text-based software, and checking how rates have moved means downloading daily PDF reports from the RBI website and reading them by hand. There is no single place where a bank can post a funding requirement, see who else is active, and compare it against the market.

Above is an attempt at that single place, built as an early MVP to test the idea.

## What It Does

- **Bank onboarding:** a multi-step registration form that captures organization profile, primary contact, headquarters, website, regulatory license ID, bank type, client ID and an administrator. The API enforces required fields and uniqueness of organization name, contact email, website, license ID and client ID.
- **Deal posting:** a form to post a borrowing request with instrument type (Call Money, Notice Money, Term Money, Repo, Reverse Repo, CD, CP), amount, tenure, interest rate, fixed or floating, negotiable flag, collateral type and description, pre-closure option, comments and contact details. The API validates enums and numeric ranges.
- **Deal board and deal details:** lists posted deals, newest first, with a detail view for each deal.
- **Market dashboard:** summary statistics and a filterable rate chart for call money, triparty repo and market repo, built from RBI daily reports.
- **Data pipeline:** Python scripts that scrape the RBI home page for current market rates and extract segment-wise volumes and rates from the RBI's daily PDF reports.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS 4, React Router 7, Axios, Recharts |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Atlas) with Mongoose |
| Data pipeline | Python, Requests, BeautifulSoup, pdfplumber, pandas, PyMongo |

## Project Structure

```
Above/
  backend/
    server.js                   Express app and MongoDB connection
    models/                     BorrowingRequest, Registration, MarketRate
    routes/                     registration and borrowing-request routes
    controllers/                rates controller
    scripts/importMarketRates.js  Loads scraped rates into MongoDB
  frontend/
    src/Pages/                  Registration, Dashboard, Post a Deal, Deal Details, Inbox, Profile
    src/Components/Dashboard/   Stats, chart, deal board sections
    public/                     segment_data.json, market_rates.json
  scraper/
    scrape_rbi.py               Scrapes market rates from the RBI home page
    ratespdf.py                 Extracts rates from daily RBI PDF reports into Excel
    py_to_mongo/pytojson.py     Converts the Excel output to JSON and inserts into MongoDB
  Feb/, pdf/                    Sample daily RBI reports used by the extraction script
```

## API

Base URL: `http://localhost:5000`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Confirms the API is running |
| POST | `/api/registration/register` | Register a bank |
| POST | `/api/borrowing/borrowing-requests` | Post a new deal |
| GET | `/api/borrowing/borrowing-requests` | List all deals, newest first |

## Getting Started

### Prerequisites

- Node.js 18 or later
- A MongoDB database (a free MongoDB Atlas cluster works)
- Python 3.9 or later, only if you want to run the data scripts

### 1. Clone

```bash
git clone https://github.com/Ani008/Above.git
cd Above
```

### 2. Backend

Create `backend/.env`:

```env
MONGO_URI="mongodb+srv://USER:PASSWORD@YOUR_CLUSTER.mongodb.net/above"
PORT=5000
```

```bash
cd backend
npm install
npm start
```

The server connects to MongoDB first and starts listening only after the connection succeeds.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend calls the API at `http://localhost:5000`, so keep the backend on port 5000.

### 4. Data scripts (optional)

```bash
pip install requests beautifulsoup4 pdfplumber pandas openpyxl pymongo

# Scrape current market rates from the RBI home page
python scraper/scrape_rbi.py

# Load scraped rates into MongoDB (run from the backend folder)
cd backend
node scripts/importMarketRates.js

# Extract call money, triparty repo and market repo data from the daily PDFs
python scraper/ratespdf.py
```

`pytojson.py` contains a local file path and a local MongoDB URL. Update both for your machine before running it.

## Pages

| Route | Page |
| --- | --- |
| `/` and `/register` | Bank registration |
| `/dashboard` | Market statistics, rate chart and deal board |
| `/postadeal` | Post a borrowing deal |
| `/deal` | Deal details |
| `/inbox` | Inbox prototype |
| `/profilePage` | Profile prototype |

## Project Status

Above is an early MVP built to validate the idea, not a production system.

- Implemented end to end: bank registration, deal posting and listing, RBI rate scraping and PDF extraction.
- Prototype screens with sample data: the inbox, the profile page and the negotiation messages in the inbox. Real-time negotiation between banks is not built.
- The rate chart uses data from daily RBI reports for January and February 2020, loaded from static JSON files in `frontend/public`.
- There is no login or authorization layer yet, and the frontend has the API address hard-coded.

Planned next steps: authentication and role-based access for bank users, real messaging and negotiation between a deal's owner and interested banks, configurable API URLs, and a longer rate history.

## What I Learned

The main lesson came from talking to bankers: they found the product useful, but a student-built platform is hard to trust without real traction, and the market has a chicken-and-egg problem (banks join only when other banks are already posting deals). Any future version should start by validating demand with a few anchor institutions before building more features.

## License

Released under the ISC license.
