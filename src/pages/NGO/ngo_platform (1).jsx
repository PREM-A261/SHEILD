import { useState, useEffect, useRef, useMemo } from "react";

const BANNER_GRADIENTS = ["linear-gradient(135deg,#1a3c5e 0%,#2d7d9a 100%)", "linear-gradient(135deg,#1b4332 0%,#40916c 100%)", "linear-gradient(135deg,#4a1942 0%,#9b2335 100%)", "linear-gradient(135deg,#1a237e 0%,#3949ab 100%)", "linear-gradient(135deg,#4e342e 0%,#8d6e63 100%)", "linear-gradient(135deg,#006064 0%,#00838f 100%)", "linear-gradient(135deg,#33691e 0%,#7cb342 100%)", "linear-gradient(135deg,#37474f 0%,#607d8b 100%)"];
const AVATAR_COLORS = ["#1a3c5e", "#1b4332", "#9b2335", "#1a237e", "#4e342e", "#006064", "#33691e", "#37474f", "#5c1a5e", "#7b3f00"];
const DOMAIN_ICONS = { Education: "📚", Healthcare: "🏥", Environment: "🌿", Technology: "💻", Agriculture: "🌾", Finance: "💰", "Social Impact": "🤝", Energy: "⚡", AI: "🤖", Cybersecurity: "🔐", "Data & Analytics": "📊", "Rural Development": "🏡" };
const POST_IMAGES = ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80", "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80", "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&q=80", "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80", "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80", "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80", "https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=600&q=80", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"];
const SAMPLE_POST_TEXT = [{ text: "Launched a new initiative to provide clean drinking water to 5,000 rural households in collaboration with local panchayats.", tags: ["#WaterForAll", "#RuralIndia"] }, { text: "Our Annual Education Drive reached 12,000 students across 3 states. Digital learning labs are now operational in 47 schools!", tags: ["#DigitalIndia", "#EdTech"] }, { text: "Healthcare camp organized in partnership with AIIMS — over 2,000 patients received free consultations and medicines.", tags: ["#HealthForAll", "#FreeHealthcare"] }, { text: "Celebrating 10 years of impact! From 2 projects to 50+ active programs — grateful for every supporter.", tags: ["#10Years", "#Impact"] }, { text: "Women entrepreneurs empowerment bootcamp concluded with 300 graduates receiving micro-finance support and mentorship.", tags: ["#WomenEmpowerment", "#SheLeads"] }, { text: "Solar panels installed in 150 homes in Rajasthan. Green energy is no longer a luxury — it's a right.", tags: ["#CleanEnergy", "#GreenIndia"] }];

const RAW = [{ "Name": "CleanWater Hub 1", "Description": "Promotes sustainable development and responsible innovation.", "Objective": "Improve accessibility of services across India", "Domain": "Education", "Industry": "AgriTech", "Founded Year": "2016", "Employees": "1268", "Followers": "48312", "Rating": "3.23", "Verified": "Yes", "Website": "www.org1.in", "Contact No": "+91 8323219929", "Contact Email": "contact1@org1.in", "Address": "20, Tech Park Road", "City": "Mumbai", "State": "Tamil Nadu", "Country": "India", "Complaints Resolve": "Resolved within 24 hours", "Active Projects": "18", "Glimpses": "Partnered with government initiatives", "India Rank": "94" }, { "Name": "AgriTech Hub 2", "Description": "Empowers communities using innovative technology solutions.", "Objective": "Improve accessibility of services across India", "Domain": "Finance", "Industry": "EdTech", "Founded Year": "2015", "Employees": "898", "Followers": "62076", "Rating": "4.14", "Verified": "Yes", "Website": "www.org2.in", "Contact No": "+91 7531054074", "Contact Email": "contact2@org2.in", "Address": "50, Tech Park Road", "City": "Bhopal", "State": "Rajasthan", "Country": "India", "Complaints Resolve": "24x7 customer support desk", "Active Projects": "11", "Glimpses": "Partnered with government initiatives", "India Rank": "132" }, { "Name": "StartupCatalyst Foundation 3", "Description": "Empowers communities using innovative technology solutions.", "Objective": "Enable skill development and employment", "Domain": "Data & Analytics", "Industry": "Data Intelligence", "Founded Year": "2000", "Employees": "2431", "Followers": "33165", "Rating": "3.85", "Verified": "Yes", "Website": "www.org3.in", "Contact No": "+91 7382671931", "Contact Email": "contact3@org3.in", "Address": "161, Tech Park Road", "City": "Jaipur", "State": "Gujarat", "Country": "India", "Complaints Resolve": "Resolved within 24 hours", "Active Projects": "21", "Glimpses": "Recognized at National Innovation Summit", "India Rank": "280" }, { "Name": "ImpactSphere Hub 4", "Description": "Empowers communities using innovative technology solutions.", "Objective": "Build sustainable technology ecosystems", "Domain": "Finance", "Industry": "Information Technology", "Founded Year": "2013", "Employees": "2614", "Followers": "74969", "Rating": "4.25", "Verified": "Yes", "Website": "www.org4.in", "Contact No": "+91 9006239897", "Contact Email": "contact4@org4.in", "Address": "72, Tech Park Road", "City": "Bhopal", "State": "Madhya Pradesh", "Country": "India", "Complaints Resolve": "24x7 customer support desk", "Active Projects": "18", "Glimpses": "Awarded best social impact platform", "India Rank": "61" }, { "Name": "EduBridge Network 5", "Description": "Advocates for transparent governance and social equity.", "Objective": "Foster digital inclusion across underserved regions", "Domain": "Healthcare", "Industry": "Clean Energy", "Founded Year": "2019", "Employees": "1567", "Followers": "91543", "Rating": "4.67", "Verified": "Yes", "Website": "www.org5.in", "Contact No": "+91 8412590637", "Contact Email": "contact5@org5.in", "Address": "37, Tech Park Road", "City": "Hyderabad", "State": "Delhi", "Country": "India", "Complaints Resolve": "Dedicated grievance officer", "Active Projects": "25", "Glimpses": "Launched 5 state-level campaigns", "India Rank": "18" }, { "Name": "GreenFuture Society 6", "Description": "Builds bridges between communities and technology.", "Objective": "Reduce carbon footprint through grassroots engagement", "Domain": "Environment", "Industry": "Social Innovation", "Founded Year": "2008", "Employees": "743", "Followers": "27841", "Rating": "3.91", "Verified": "No", "Website": "www.org6.in", "Contact No": "+91 9845123670", "Contact Email": "contact6@org6.in", "Address": "88, Tech Park Road", "City": "Ahmedabad", "State": "Gujarat", "Country": "India", "Complaints Resolve": "Email response within 48 hours", "Active Projects": "9", "Glimpses": "Planted 50,000 trees in collaboration with state govt", "India Rank": "215" }, { "Name": "TechSeva Initiative 7", "Description": "Connects rural India with urban innovation.", "Objective": "Enable skill development and employment", "Domain": "Technology", "Industry": "Information Technology", "Founded Year": "2011", "Employees": "1834", "Followers": "55210", "Rating": "4.32", "Verified": "Yes", "Website": "www.org7.in", "Contact No": "+91 7890123456", "Contact Email": "contact7@org7.in", "Address": "15, Innovation Lane", "City": "Bangalore", "State": "Karnataka", "Country": "India", "Complaints Resolve": "24x7 customer support desk", "Active Projects": "22", "Glimpses": "Trained 10,000 youth in digital skills", "India Rank": "45" }, { "Name": "HealthFirst Foundation 8", "Description": "Provides accessible healthcare to underserved communities.", "Objective": "Improve healthcare access in rural India", "Domain": "Healthcare", "Industry": "Healthcare Technology", "Founded Year": "2007", "Employees": "2100", "Followers": "83400", "Rating": "4.78", "Verified": "Yes", "Website": "www.org8.in", "Contact No": "+91 9123456780", "Contact Email": "contact8@org8.in", "Address": "42, Wellness Road", "City": "Chennai", "State": "Tamil Nadu", "Country": "India", "Complaints Resolve": "Dedicated grievance officer", "Active Projects": "30", "Glimpses": "Served 1 million patients across India", "India Rank": "8" }, { "Name": "SolarRise Trust 9", "Description": "Champions clean and renewable energy solutions.", "Objective": "Build sustainable technology ecosystems", "Domain": "Energy", "Industry": "Clean Energy", "Founded Year": "2014", "Employees": "987", "Followers": "41200", "Rating": "4.05", "Verified": "Yes", "Website": "www.org9.in", "Contact No": "+91 8765432109", "Contact Email": "contact9@org9.in", "Address": "99, Green Valley", "City": "Pune", "State": "Maharashtra", "Country": "India", "Complaints Resolve": "Resolved within 24 hours", "Active Projects": "15", "Glimpses": "Installed solar in 200 villages", "India Rank": "78" }, { "Name": "AgriSakhi Network 10", "Description": "Empowers women farmers with technology and finance.", "Objective": "Foster digital inclusion across underserved regions", "Domain": "Agriculture", "Industry": "AgriTech", "Founded Year": "2012", "Employees": "1456", "Followers": "38920", "Rating": "4.41", "Verified": "Yes", "Website": "www.org10.in", "Contact No": "+91 7654321098", "Contact Email": "contact10@org10.in", "Address": "7, Farm Road", "City": "Jaipur", "State": "Rajasthan", "Country": "India", "Complaints Resolve": "Email response within 48 hours", "Active Projects": "19", "Glimpses": "Connected 50,000 women farmers to markets", "India Rank": "33" }, { "Name": "DataDriven Society 11", "Description": "Uses data analytics for social good programs.", "Objective": "Improve accessibility of services across India", "Domain": "Data & Analytics", "Industry": "Data Intelligence", "Founded Year": "2017", "Employees": "654", "Followers": "29870", "Rating": "3.97", "Verified": "Yes", "Website": "www.org11.in", "Contact No": "+91 8901234567", "Contact Email": "contact11@org11.in", "Address": "55, Analytics Hub", "City": "Hyderabad", "State": "Telangana", "Country": "India", "Complaints Resolve": "24x7 customer support desk", "Active Projects": "12", "Glimpses": "Analyzed data for 100+ govt schemes", "India Rank": "167" }, { "Name": "RuralConnect Hub 12", "Description": "Bridges the urban-rural digital divide.", "Objective": "Foster digital inclusion across underserved regions", "Domain": "Rural Development", "Industry": "EdTech", "Founded Year": "2009", "Employees": "2890", "Followers": "67430", "Rating": "4.55", "Verified": "Yes", "Website": "www.org12.in", "Contact No": "+91 7123456789", "Contact Email": "contact12@org12.in", "Address": "3, Village Square", "City": "Lucknow", "State": "Uttar Pradesh", "Country": "India", "Complaints Resolve": "Dedicated grievance officer", "Active Projects": "28", "Glimpses": "Connected 1,000 villages to internet", "India Rank": "12" }, { "Name": "AIForGood Lab 13", "Description": "Applies artificial intelligence to solve social problems.", "Objective": "Enable skill development and employment", "Domain": "AI", "Industry": "Data Intelligence", "Founded Year": "2020", "Employees": "321", "Followers": "22100", "Rating": "4.33", "Verified": "Yes", "Website": "www.org13.in", "Contact No": "+91 8234567890", "Contact Email": "contact13@org13.in", "Address": "77, AI Boulevard", "City": "Bangalore", "State": "Karnataka", "Country": "India", "Complaints Resolve": "Email response within 48 hours", "Active Projects": "10", "Glimpses": "Built AI tools for 50 NGOs", "India Rank": "89" }, { "Name": "FinLit Foundation 14", "Description": "Promotes financial literacy among low-income households.", "Objective": "Improve accessibility of services across India", "Domain": "Finance", "Industry": "FinTech", "Founded Year": "2013", "Employees": "1123", "Followers": "44560", "Rating": "4.02", "Verified": "Yes", "Website": "www.org14.in", "Contact No": "+91 9345678901", "Contact Email": "contact14@org14.in", "Address": "11, Finance Street", "City": "Mumbai", "State": "Maharashtra", "Country": "India", "Complaints Resolve": "24x7 customer support desk", "Active Projects": "16", "Glimpses": "Educated 500,000 people on savings", "India Rank": "57" }, { "Name": "SocialWeave Trust 15", "Description": "Weaves social safety nets for vulnerable communities.", "Objective": "Reduce carbon footprint through grassroots engagement", "Domain": "Social Impact", "Industry": "Social Innovation", "Founded Year": "2005", "Employees": "3200", "Followers": "98760", "Rating": "4.82", "Verified": "Yes", "Website": "www.org15.in", "Contact No": "+91 6789012345", "Contact Email": "contact15@org15.in", "Address": "44, Community Lane", "City": "Kolkata", "State": "West Bengal", "Country": "India", "Complaints Resolve": "Dedicated grievance officer", "Active Projects": "35", "Glimpses": "India's largest volunteer network", "India Rank": "4" }, { "Name": "EduTech Pioneers 16", "Description": "Brings quality education to remote areas through technology.", "Objective": "Enable skill development and employment", "Domain": "Education", "Industry": "EdTech", "Founded Year": "2016", "Employees": "876", "Followers": "51230", "Rating": "4.21", "Verified": "Yes", "Website": "www.org16.in", "Contact No": "+91 7890123455", "Contact Email": "contact16@org16.in", "Address": "66, Knowledge Park", "City": "Pune", "State": "Maharashtra", "Country": "India", "Complaints Resolve": "Resolved within 24 hours", "Active Projects": "20", "Glimpses": "Reached 2 million students online", "India Rank": "38" }, { "Name": "NatureGuard Alliance 17", "Description": "Protects biodiversity and natural ecosystems in India.", "Objective": "Build sustainable technology ecosystems", "Domain": "Environment", "Industry": "Clean Energy", "Founded Year": "2003", "Employees": "1654", "Followers": "73200", "Rating": "4.61", "Verified": "Yes", "Website": "www.org17.in", "Contact No": "+91 8901234565", "Contact Email": "contact17@org17.in", "Address": "9, Forest View", "City": "Chennai", "State": "Tamil Nadu", "Country": "India", "Complaints Resolve": "Email response within 48 hours", "Active Projects": "24", "Glimpses": "Protected 10,000 sq km of forests", "India Rank": "15" }, { "Name": "MicroCredit Mission 18", "Description": "Provides microfinance to rural entrepreneurs.", "Objective": "Improve accessibility of services across India", "Domain": "Finance", "Industry": "FinTech", "Founded Year": "2010", "Employees": "2340", "Followers": "59870", "Rating": "4.38", "Verified": "Yes", "Website": "www.org18.in", "Contact No": "+91 9012345679", "Contact Email": "contact18@org18.in", "Address": "28, Enterprise Road", "City": "Ahmedabad", "State": "Gujarat", "Country": "India", "Complaints Resolve": "24x7 customer support desk", "Active Projects": "22", "Glimpses": "Disbursed 500 crore in micro loans", "India Rank": "22" }, { "Name": "HealthTech Seva 19", "Description": "Deploys mobile health units to underserved areas.", "Objective": "Foster digital inclusion across underserved regions", "Domain": "Healthcare", "Industry": "Healthcare Technology", "Founded Year": "2015", "Employees": "1432", "Followers": "47800", "Rating": "4.44", "Verified": "Yes", "Website": "www.org19.in", "Contact No": "+91 7123456780", "Contact Email": "contact19@org19.in", "Address": "18, Medical Plaza", "City": "Hyderabad", "State": "Telangana", "Country": "India", "Complaints Resolve": "Dedicated grievance officer", "Active Projects": "17", "Glimpses": "Conducted 10,000 free surgeries", "India Rank": "29" }, { "Name": "SmartVillage Foundation 20", "Description": "Transforms rural India through smart infrastructure.", "Objective": "Reduce carbon footprint through grassroots engagement", "Domain": "Rural Development", "Industry": "Information Technology", "Founded Year": "2011", "Employees": "1876", "Followers": "62400", "Rating": "4.19", "Verified": "Yes", "Website": "www.org20.in", "Contact No": "+91 8234567891", "Contact Email": "contact20@org20.in", "Address": "5, Smart Hub", "City": "Indore", "State": "Madhya Pradesh", "Country": "India", "Complaints Resolve": "Resolved within 24 hours", "Active Projects": "26", "Glimpses": "Smart infrastructure in 500 villages", "India Rank": "41" }, { "Name": "WomenRise Trust 21", "Description": "Empowers women through education and entrepreneurship.", "Objective": "Improve accessibility of services across India", "Domain": "Social Impact", "Industry": "Social Innovation", "Founded Year": "2006", "Employees": "2100", "Followers": "87600", "Rating": "4.73", "Verified": "Yes", "Website": "www.org21.in", "Contact No": "+91 7890123456", "Contact Email": "contact21@org21.in", "Address": "21, Empowerment Lane", "City": "Jaipur", "State": "Rajasthan", "Country": "India", "Complaints Resolve": "Dedicated grievance officer", "Active Projects": "32", "Glimpses": "Empowered 1 million women", "India Rank": "6" }, { "Name": "GreenEnergy Hub 22", "Description": "Promotes renewable energy adoption in rural India.", "Objective": "Reduce carbon footprint through grassroots engagement", "Domain": "Energy", "Industry": "Clean Energy", "Founded Year": "2014", "Employees": "765", "Followers": "34500", "Rating": "4.12", "Verified": "Yes", "Website": "www.org22.in", "Contact No": "+91 8234567892", "Contact Email": "contact22@org22.in", "Address": "56, Solar Park", "City": "Ahmedabad", "State": "Gujarat", "Country": "India", "Complaints Resolve": "Resolved within 24 hours", "Active Projects": "13", "Glimpses": "Powered 50,000 homes with solar energy", "India Rank": "68" }, { "Name": "MedAccess Foundation 23", "Description": "Ensures medicine accessibility in remote areas.", "Objective": "Foster digital inclusion across underserved regions", "Domain": "Healthcare", "Industry": "Healthcare Technology", "Founded Year": "2009", "Employees": "1876", "Followers": "71300", "Rating": "4.58", "Verified": "Yes", "Website": "www.org23.in", "Contact No": "+91 6789012347", "Contact Email": "contact23@org23.in", "Address": "33, Medicine Road", "City": "Kolkata", "State": "West Bengal", "Country": "India", "Complaints Resolve": "Dedicated grievance officer", "Active Projects": "27", "Glimpses": "Distributed medicines to 5 million patients", "India Rank": "11" }, { "Name": "AgroTech Solutions 24", "Description": "Modernizes Indian agriculture with digital solutions.", "Objective": "Build sustainable technology ecosystems", "Domain": "Agriculture", "Industry": "AgriTech", "Founded Year": "2012", "Employees": "1234", "Followers": "53100", "Rating": "4.28", "Verified": "Yes", "Website": "www.org24.in", "Contact No": "+91 9012345670", "Contact Email": "contact24@org24.in", "Address": "8, Harvest Road", "City": "Lucknow", "State": "Uttar Pradesh", "Country": "India", "Complaints Resolve": "24x7 customer support desk", "Active Projects": "21", "Glimpses": "Increased farmer income by 40%", "India Rank": "36" }, { "Name": "CyberShield India 25", "Description": "Protects digital rights of Indian citizens.", "Objective": "Build sustainable technology ecosystems", "Domain": "Cybersecurity", "Industry": "Information Technology", "Founded Year": "2018", "Employees": "432", "Followers": "17600", "Rating": "4.18", "Verified": "Yes", "Website": "www.org25.in", "Contact No": "+91 9012345678", "Contact Email": "contact25@org25.in", "Address": "23, Cyber Lane", "City": "Delhi", "State": "Delhi", "Country": "India", "Complaints Resolve": "Resolved within 24 hours", "Active Projects": "8", "Glimpses": "Trained 5,000 in cyber safety", "India Rank": "203" }, { "Name": "CodeForBharat 26", "Description": "Teaches coding skills to underprivileged youth.", "Objective": "Enable skill development and employment", "Domain": "Technology", "Industry": "EdTech", "Founded Year": "2019", "Employees": "543", "Followers": "31200", "Rating": "4.09", "Verified": "Yes", "Website": "www.org26.in", "Contact No": "+91 9345678902", "Contact Email": "contact26@org26.in", "Address": "34, Code Street", "City": "Bangalore", "State": "Karnataka", "Country": "India", "Complaints Resolve": "Email response within 48 hours", "Active Projects": "11", "Glimpses": "Placed 3,000 youth in tech jobs", "India Rank": "112" }, { "Name": "ClimateAction India 27", "Description": "Drives grassroots climate action campaigns.", "Objective": "Reduce carbon footprint through grassroots engagement", "Domain": "Environment", "Industry": "Clean Energy", "Founded Year": "2018", "Employees": "678", "Followers": "42300", "Rating": "3.88", "Verified": "No", "Website": "www.org27.in", "Contact No": "+91 6789012346", "Contact Email": "contact27@org27.in", "Address": "62, Green Boulevard", "City": "Delhi", "State": "Delhi", "Country": "India", "Complaints Resolve": "24x7 customer support desk", "Active Projects": "14", "Glimpses": "Led India's largest climate march", "India Rank": "143" }, { "Name": "DigitalSakhi Network 28", "Description": "Trains rural women as digital entrepreneurs.", "Objective": "Enable skill development and employment", "Domain": "Education", "Industry": "EdTech", "Founded Year": "2016", "Employees": "987", "Followers": "45600", "Rating": "4.37", "Verified": "Yes", "Website": "www.org28.in", "Contact No": "+91 7123456781", "Contact Email": "contact28@org28.in", "Address": "13, Digital Lane", "City": "Bhopal", "State": "Madhya Pradesh", "Country": "India", "Complaints Resolve": "Email response within 48 hours", "Active Projects": "18", "Glimpses": "200,000 women trained in digital skills", "India Rank": "27" }, { "Name": "SocialInnovation Lab 29", "Description": "Incubates social enterprises for sustainable impact.", "Objective": "Improve accessibility of services across India", "Domain": "Social Impact", "Industry": "Social Innovation", "Founded Year": "2015", "Employees": "543", "Followers": "28700", "Rating": "4.01", "Verified": "Yes", "Website": "www.org29.in", "Contact No": "+91 9345678903", "Contact Email": "contact29@org29.in", "Address": "71, Innovation Hub", "City": "Chennai", "State": "Tamil Nadu", "Country": "India", "Complaints Resolve": "24x7 customer support desk", "Active Projects": "16", "Glimpses": "Launched 100 social enterprises", "India Rank": "95" }, { "Name": "RuralHealth Initiative 30", "Description": "Provides primary healthcare in tribal and remote areas.", "Objective": "Improve healthcare access in rural India", "Domain": "Healthcare", "Industry": "Healthcare Technology", "Founded Year": "2004", "Employees": "1320", "Followers": "39200", "Rating": "4.51", "Verified": "Yes", "Website": "www.org30.in", "Contact No": "+91 8765432100", "Contact Email": "contact30@org30.in", "Address": "22, Tribal Road", "City": "Nagpur", "State": "Maharashtra", "Country": "India", "Complaints Resolve": "Dedicated grievance officer", "Active Projects": "23", "Glimpses": "Treated 800,000 patients in remote areas", "India Rank": "19" }];

const gi = n => n.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
const gb = n => BANNER_GRADIENTS[n.charCodeAt(0) % BANNER_GRADIENTS.length];
const ga = n => AVATAR_COLORS[n.charCodeAt(0) % AVATAR_COLORS.length];
const fmt = n => { const x = parseInt(n) || 0; return x >= 1e6 ? (x / 1e6).toFixed(1) + "M" : x >= 1000 ? (x / 1000).toFixed(1) + "K" : String(x); };
let _pid = 0;
function makePosts(ngo, cnt = 2) {
  return Array.from({ length: cnt }, (_, i) => {
    const tmpl = SAMPLE_POST_TEXT[(parseInt(ngo["India Rank"] || "1") + i) % SAMPLE_POST_TEXT.length];
    const d = new Date(); d.setDate(d.getDate() - [1, 3, 7, 14, 21][i % 5]);
    return {
      id: `p${_pid++}`, ngoName: ngo.Name, ngoDomain: ngo.Domain, text: tmpl.text, tags: tmpl.tags,
      image: i % 2 === 0 ? POST_IMAGES[(parseInt(ngo["India Rank"] || "1") + i) % POST_IMAGES.length] : null,
      date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      likes: 40 + Math.floor((ngo.Name.charCodeAt(0) * 7 + i * 13) % 760),
      shares: 5 + Math.floor((ngo.Name.charCodeAt(2) * 3 + i * 7) % 55),
      comments: [], liked: false
    };
  });
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@600;700&display=swap');
:root{--p:#0a3d62;--p2:#1a6fa8;--ac:#e8772e;--ok:#27ae60;--w:#fff;--s2:#f4f7fc;--s3:#eef2f9;--bd:#dde4f0;--t1:#1a2740;--t2:#5a6a85;--t3:#8fa0b8;--sh1:0 1px 4px rgba(10,61,98,.08);--sh2:0 4px 20px rgba(10,61,98,.12);--sh3:0 12px 40px rgba(10,61,98,.16);--r:14px;--rs:8px;}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:var(--s2);color:var(--t1);}
a{color:inherit;text-decoration:none;}
.wrap{min-height:100vh;}

/* NAV */
.nav{background:var(--p);padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:64px;position:sticky;top:0;z-index:100;box-shadow:0 2px 12px rgba(10,61,98,.25);}
.nlogo{display:flex;align-items:center;gap:10px;color:#fff;font-family:'Playfair Display',serif;font-size:20px;font-weight:700;cursor:pointer;}
.nlogo-ic{width:36px;height:36px;background:var(--ac);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;}
.ntabs{display:flex;gap:4px;}
.nt{background:transparent;border:none;color:rgba(255,255,255,.7);padding:8px 16px;border-radius:8px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;transition:all .2s;}
.nt:hover,.nt.on{background:rgba(255,255,255,.15);color:#fff;}
.ncta{background:var(--ac);color:#fff;border:none;padding:9px 20px;border-radius:8px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;white-space:nowrap;}
.ncta:hover{background:#d4631e;transform:translateY(-1px);}

/* HERO */
.hero{background:linear-gradient(135deg,#0a3d62 0%,#1a6fa8 60%,#0d5fa0 100%);padding:60px 24px;padding-top:100px;text-align:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}
.htag{display:inline-block;background:rgba(232,119,46,.25);color:#ffb380;border:1px solid rgba(232,119,46,.4);border-radius:20px;padding:5px 16px;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px;}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(26px,4vw,46px);color:#fff;font-weight:700;line-height:1.2;margin-bottom:12px;position:relative;}
.hero h1 span{color:#ffb380;}
.hero p{color:rgba(255,255,255,.78);font-size:16px;max-width:500px;margin:0 auto 28px;line-height:1.6;position:relative;}
.hstats{display:flex;justify-content:center;gap:40px;position:relative;}
.hst{text-align:center;} .hst-n{font-size:26px;font-weight:700;color:#fff;} .hst-l{font-size:12px;color:rgba(255,255,255,.6);margin-top:2px;}

/* LAYOUT */
.layout{max-width:1240px;margin:0 auto;padding:24px 20px;display:grid;grid-template-columns:270px 1fr 290px;gap:22px;}
@media(max-width:1100px){.layout{grid-template-columns:1fr;}.sl,.sr{display:none;}}

/* SIDEBARS */
.sc{background:var(--w);border-radius:var(--r);border:1px solid var(--bd);padding:18px;margin-bottom:14px;box-shadow:var(--sh1);}
.stit{font-size:12px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:12px;}
.qs{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--s3);}
.qs:last-child{border-bottom:none;}
.qsl{font-size:13px;color:var(--t2);} .qsv{font-size:14px;font-weight:600;color:var(--p);}
.ti{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--s3);cursor:pointer;transition:color .2s;}
.ti:last-child{border-bottom:none;} .ti:hover .tin{color:var(--p);}
.tirn{width:22px;height:22px;background:var(--s3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--t2);flex-shrink:0;}
.tin{font-size:13px;font-weight:500;color:var(--t1);flex:1;} .tib{font-size:11px;color:var(--ac);font-weight:600;}

/* SECTION HDR */
.shdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.sh{font-size:17px;font-weight:700;color:var(--t1);display:flex;align-items:center;gap:8px;}
.ss{font-size:13px;color:var(--t3);margin-top:2px;}
.vab{font-size:13px;color:var(--p2);font-weight:600;background:none;border:none;cursor:pointer;}
.vab:hover{color:var(--p);text-decoration:underline;}

/* BACK BTN */
.bk{display:inline-flex;align-items:center;gap:6px;background:none;border:none;color:var(--p2);font-size:14px;font-weight:600;cursor:pointer;margin-bottom:14px;padding:5px 0;font-family:'DM Sans',sans-serif;transition:color .2s;}
.bk:hover{color:var(--p);}

/* SEARCH */
.sb{background:var(--w);border-radius:var(--r);border:1px solid var(--bd);padding:18px;margin-bottom:22px;box-shadow:var(--sh1);}
.srow{display:flex;gap:10px;margin-bottom:12px;}
.siw{flex:1;position:relative;}
.siw svg{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--t3);}
.si{width:100%;padding:10px 12px 10px 38px;border:1.5px solid var(--bd);border-radius:var(--rs);font-size:14px;font-family:'DM Sans',sans-serif;color:var(--t1);background:var(--s2);outline:none;transition:border .2s;}
.si:focus{border-color:var(--p2);background:#fff;}
.fr{display:flex;gap:10px;flex-wrap:wrap;}
.fs{padding:9px 12px;border:1.5px solid var(--bd);border-radius:var(--rs);font-size:13px;font-family:'DM Sans',sans-serif;color:var(--t2);background:var(--s2);outline:none;cursor:pointer;flex:1;min-width:125px;}
.fs:focus{border-color:var(--p2);}
.cb{padding:9px 14px;border:1.5px solid var(--bd);border-radius:var(--rs);background:#fff;color:var(--t2);font-size:13px;font-family:'DM Sans',sans-serif;cursor:pointer;white-space:nowrap;font-weight:500;transition:all .2s;}
.cb:hover{border-color:var(--p);color:var(--p);}
.ftags{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;}
.ftag{display:flex;align-items:center;gap:5px;background:var(--s3);border:1px solid var(--bd);border-radius:20px;padding:4px 12px;font-size:12px;color:var(--p);font-weight:500;}
.ftag button{background:none;border:none;cursor:pointer;color:var(--t3);font-size:14px;line-height:1;padding:0;}
.ri{font-size:13px;color:var(--t3);margin-top:8px;}

/* NGO CARDS */
.ng{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:16px;margin-bottom:24px;}
.nc{background:var(--w);border-radius:var(--r);border:1px solid var(--bd);overflow:hidden;cursor:pointer;transition:all .25s;box-shadow:var(--sh1);position:relative;}
.nc:hover{transform:translateY(-4px);box-shadow:var(--sh3);border-color:rgba(26,111,168,.3);}
.ncb{height:78px;position:relative;}
.ncb img{width:100%;height:100%;object-fit:cover;}
.nca{position:absolute;bottom:-22px;left:14px;width:46px;height:46px;border-radius:10px;border:3px solid #fff;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.2);overflow:hidden;}
.nca img{width:100%;height:100%;object-fit:cover;border-radius:7px;}
.nvb{position:absolute;top:7px;right:7px;background:rgba(255,255,255,.92);border-radius:20px;padding:2px 7px;font-size:11px;font-weight:600;display:flex;align-items:center;gap:3px;}
.nrk{position:absolute;top:7px;left:7px;background:var(--p);color:#fff;border-radius:6px;padding:2px 7px;font-size:10px;font-weight:700;}
.ncbody{padding:28px 14px 14px;}
.nname{font-size:15px;font-weight:700;color:var(--t1);margin-bottom:3px;line-height:1.3;}
.nmeta{font-size:12px;color:var(--t2);margin-bottom:8px;}
.ndom{display:inline-flex;align-items:center;gap:4px;background:var(--s3);border-radius:20px;padding:3px 10px;font-size:11px;font-weight:600;color:var(--p);margin-bottom:8px;}
.ndesc{font-size:12px;color:var(--t2);line-height:1.5;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.nfoot{display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid var(--s3);}
.nsv{font-size:13px;font-weight:700;color:var(--t1);text-align:center;}
.nsl{font-size:10px;color:var(--t3);text-align:center;}
.nrat{display:flex;align-items:center;gap:3px;font-size:12px;font-weight:600;color:#f39c12;}

/* NGO DETAIL */
.dp{animation:fadein .3s ease;}
@keyframes fadein{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.dpcard{background:var(--w);border-radius:var(--r);border:1px solid var(--bd);overflow:hidden;box-shadow:var(--sh2);}
.dpbanner{height:175px;position:relative;overflow:hidden;}
.dpbanner img{width:100%;height:100%;object-fit:cover;}
.dpbanner-grad{width:100%;height:100%;}
.dp-edit-banner{position:absolute;bottom:10px;right:12px;background:rgba(0,0,0,.55);color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background .2s;display:flex;align-items:center;gap:5px;}
.dp-edit-banner:hover{background:rgba(0,0,0,.78);}
.dpav-wrap{position:absolute;bottom:-40px;left:24px;z-index:2;}
.dpav{width:80px;height:80px;border-radius:16px;border:4px solid #fff;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.22);overflow:hidden;position:relative;cursor:pointer;}
.dpav img{width:100%;height:100%;object-fit:cover;border-radius:12px;}
.dpav-hover{position:absolute;inset:0;background:rgba(0,0,0,.45);display:none;align-items:center;justify-content:center;border-radius:12px;font-size:18px;}
.dpav:hover .dpav-hover{display:flex;}
.dpacts{position:absolute;bottom:-28px;right:20px;display:flex;gap:8px;z-index:2;}
.mb{padding:8px 18px;border-radius:22px;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;border:2px solid;}
.mb-p{background:var(--p);color:#fff;border-color:var(--p);}
.mb-p:hover{background:var(--p2);border-color:var(--p2);}
.mb-fol{background:var(--p);color:#fff;border-color:var(--p);}
.mb-fol.on{background:#e8f5e9;color:var(--ok);border-color:var(--ok);}
.dpbody{padding:54px 24px 24px;}
.dpname{font-size:21px;font-weight:700;color:var(--t1);margin-bottom:5px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.vb{display:inline-flex;align-items:center;gap:3px;background:#e8f5e9;color:var(--ok);border-radius:20px;padding:3px 10px;font-size:11px;font-weight:700;}
.dpsub{font-size:14px;color:var(--t2);margin-bottom:14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
.strow{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:16px 0;}
.stb{background:var(--s2);border-radius:10px;padding:12px;text-align:center;}
.stbv{font-size:19px;font-weight:700;color:var(--p);} .stbl{font-size:11px;color:var(--t3);margin-top:2px;}
.dptabs{display:flex;border-bottom:2px solid var(--bd);margin:18px 0 20px;}
.dtab{padding:9px 18px;font-size:14px;font-weight:600;color:var(--t3);border:none;background:none;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .2s;font-family:'DM Sans',sans-serif;}
.dtab.on{color:var(--p);border-bottom-color:var(--p);}
.igrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.ii{background:var(--s2);border-radius:10px;padding:12px;}
.iil{font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;}
.iiv{font-size:14px;font-weight:600;color:var(--t1);}
.tchips{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;}
.tc{background:var(--s3);border:1px solid var(--bd);border-radius:20px;padding:4px 12px;font-size:12px;color:var(--p);font-weight:500;}
.prog{display:flex;align-items:center;gap:12px;padding:12px;background:var(--s2);border-radius:10px;margin-bottom:10px;}
.prog-ic{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.prog-n{font-size:14px;font-weight:600;color:var(--t1);} .prog-m{font-size:12px;color:var(--t3);margin-top:2px;}
.prog-b{font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;}
.ggrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.gi{aspect-ratio:1;border-radius:8px;overflow:hidden;cursor:pointer;}
.gi img{width:100%;height:100%;object-fit:cover;transition:transform .3s;}
.gi:hover img{transform:scale(1.05);}

/* IMAGE PICKER */
.iov{position:fixed;inset:0;background:rgba(10,20,40,.6);backdrop-filter:blur(4px);z-index:300;display:flex;align-items:center;justify-content:center;padding:20px;}
.iob{background:#fff;border-radius:16px;width:100%;max-width:400px;padding:22px;box-shadow:var(--sh3);animation:fadein .2s ease;}
.iot{font-size:15px;font-weight:700;margin-bottom:14px;color:var(--t1);}
.iosam{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;}
.ioopt{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;padding:16px;border:2px dashed var(--bd);border-radius:10px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;background:var(--s2);color:var(--t2);font-size:13px;font-weight:600;}
.ioopt:hover{border-color:var(--p);color:var(--p);background:var(--s3);}
.ioopt span{font-size:24px;}
.ioc{width:100%;margin-top:12px;padding:9px;background:none;border:1.5px solid var(--bd);border-radius:8px;font-size:14px;font-weight:600;color:var(--t2);cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;}
.ioc:hover{border-color:var(--t2);}

/* POSTS */
.pc{background:var(--w);border-radius:var(--r);border:1px solid var(--bd);overflow:visible;margin-bottom:16px;box-shadow:var(--sh1);transition:box-shadow .2s;position:relative;}
.pc:hover{box-shadow:var(--sh2);}
.phdr{display:flex;align-items:center;gap:12px;padding:14px 16px 10px;}
.pav{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:#fff;flex-shrink:0;}
.pau{flex:1;}
.pan{font-size:14px;font-weight:700;color:var(--p);cursor:pointer;}
.pan:hover{text-decoration:underline;}
.pam{font-size:12px;color:var(--t3);display:flex;align-items:center;gap:5px;margin-top:1px;}
.pdots{background:none;border:none;cursor:pointer;color:var(--t3);font-size:22px;padding:2px 6px;border-radius:50%;transition:background .2s;line-height:1;position:relative;}
.pdots:hover{background:var(--s3);}
.dm{position:absolute;top:100%;right:0;background:#fff;border:1px solid var(--bd);border-radius:10px;box-shadow:var(--sh2);z-index:50;min-width:170px;overflow:hidden;animation:fadein .15s ease;}
.dmi{display:flex;align-items:center;gap:10px;padding:10px 14px;font-size:13px;color:var(--t1);cursor:pointer;font-weight:500;transition:background .15s;}
.dmi:hover{background:var(--s2);}
.dmi.red{color:#e74c3c;}
.ptxt{padding:0 16px 10px;font-size:14px;color:var(--t1);line-height:1.65;}
.ptags{padding:0 16px 10px;display:flex;flex-wrap:wrap;gap:5px;}
.ptag{font-size:12px;color:var(--p2);font-weight:600;cursor:pointer;}
.ptag:hover{text-decoration:underline;}
.pimg{width:100%;max-height:290px;object-fit:cover;display:block;}
.pcnts{display:flex;align-items:center;justify-content:space-between;padding:8px 16px;border-top:1px solid var(--s3);border-bottom:1px solid var(--s3);}
.pci{display:flex;align-items:center;gap:4px;font-size:12px;color:var(--t3);}
.pci b{font-weight:700;color:var(--t2);}
.pacts{display:flex;padding:2px 6px;}
.pa{flex:1;display:flex;align-items:center;justify-content:center;gap:4px;padding:8px 3px;border:none;background:none;cursor:pointer;font-size:13px;font-weight:600;color:var(--t2);border-radius:var(--rs);transition:all .2s;font-family:'DM Sans',sans-serif;}
.pa:hover{background:var(--s3);color:var(--p);}
.pa.liked{color:#e74c3c;}
.pa svg{width:16px;height:16px;}
.pac{font-size:12px;font-weight:700;color:inherit;}
.csec{border-top:1px solid var(--s3);}
.cr{display:flex;align-items:flex-start;gap:10px;padding:10px 16px;border-bottom:1px solid var(--s3);}
.cr:last-child{border-bottom:none;}
.cmav{width:30px;height:30px;border-radius:8px;background:var(--s3);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--p);flex-shrink:0;}
.cmb{flex:1;background:var(--s2);border-radius:10px;padding:7px 11px;}
.cmn{font-size:12px;font-weight:700;color:var(--t1);margin-bottom:2px;}
.cmt{font-size:13px;color:var(--t2);line-height:1.5;}
.cmtm{font-size:11px;color:var(--t3);margin-top:3px;}
.noc{font-size:13px;color:var(--t3);text-align:center;padding:10px 16px;}
.cir{display:flex;gap:8px;padding:10px 16px;border-top:1px solid var(--s3);}
.ci{flex:1;padding:8px 13px;border:1.5px solid var(--bd);border-radius:22px;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:border .2s;background:var(--s2);}
.ci:focus{border-color:var(--p2);background:#fff;}
.cs{background:var(--p);color:#fff;border:none;width:34px;height:34px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0;}
.cs:hover{background:var(--p2);}

/* FORM */
.fc{background:var(--w);border-radius:var(--r);border:1px solid var(--bd);box-shadow:var(--sh1);overflow:hidden;}
.fh{background:linear-gradient(135deg,var(--p),var(--p2));padding:22px 26px;}
.fht{font-family:'Playfair Display',serif;font-size:21px;color:#fff;font-weight:700;margin-bottom:4px;}
.fhs{font-size:13px;color:rgba(255,255,255,.75);}
.fb{padding:26px;}
.fst{font-size:12px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.07em;margin:18px 0 12px;padding-top:14px;border-top:1px solid var(--bd);}
.fst:first-child{margin-top:0;border-top:none;padding-top:0;}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.ff{display:flex;flex-direction:column;gap:4px;}
.ff.full{grid-column:1/-1;}
.fl{font-size:12px;font-weight:700;color:var(--t2);text-transform:uppercase;letter-spacing:.05em;}
.fl span{color:#e74c3c;}
.fi,.fsel,.fta{padding:10px 13px;border:1.5px solid var(--bd);border-radius:var(--rs);font-size:14px;font-family:'DM Sans',sans-serif;color:var(--t1);background:var(--s2);outline:none;transition:all .2s;}
.fi:focus,.fsel:focus,.fta:focus{border-color:var(--p2);background:#fff;box-shadow:0 0 0 3px rgba(26,111,168,.1);}
.fta{resize:vertical;min-height:80px;}
.fsub{width:100%;padding:13px;background:linear-gradient(135deg,var(--p),var(--p2));color:#fff;border:none;border-radius:var(--rs);font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;margin-top:18px;}
.fsub:hover{opacity:.92;transform:translateY(-1px);box-shadow:0 6px 20px rgba(10,61,98,.3);}
.fsucc{text-align:center;padding:40px 24px;}
.fsic{font-size:50px;margin-bottom:14px;}
.fst2{font-size:19px;font-weight:700;color:var(--ok);margin-bottom:7px;}
.fss{font-size:14px;color:var(--t2);margin-bottom:22px;}

/* PAGINATION */
.pg{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:6px;}
.pgb{width:34px;height:34px;border-radius:8px;border:1.5px solid var(--bd);background:#fff;color:var(--t2);font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;font-family:'DM Sans',sans-serif;}
.pgb:hover:not(:disabled){border-color:var(--p);color:var(--p);}
.pgb.on{background:var(--p);color:#fff;border-color:var(--p);}
.pgb:disabled{opacity:.4;cursor:not-allowed;}

/* EMPTY */
.emp{text-align:center;padding:50px 20px;color:var(--t3);}
.empic{font-size:46px;margin-bottom:10px;} .empt{font-size:16px;font-weight:600;color:var(--t2);} .emps{font-size:13px;margin-top:5px;}

/* TOAST */
.toast{position:fixed;bottom:22px;right:22px;background:var(--p);color:#fff;padding:13px 18px;border-radius:10px;font-size:14px;font-weight:500;box-shadow:var(--sh3);z-index:500;animation:fadein .3s ease;display:flex;align-items:center;gap:8px;}
::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:var(--s2);} ::-webkit-scrollbar-thumb{background:var(--bd);border-radius:3px;}
`;

// ── ImagePicker ──────────────────────────────────────────────────────────────
function ImagePicker({ title, onPick, onClose }) {
  const fr = useRef();
  const samples = ["https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80", "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80", "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"];
  return (
    <div className="iov" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="iob">
        <div className="iot">📷 {title}</div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>Sample Images</div>
          <div className="iosam">{samples.map((u, i) => (
            <div key={i} onClick={() => onPick(u)} style={{ borderRadius: 8, overflow: "hidden", cursor: "pointer", height: 56, border: "2px solid transparent", transition: "border .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--p)"} onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
              <img src={u} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="ioopt" onClick={() => fr.current.click()}>
            <span>📁</span>Upload File
            <input ref={fr} type="file" accept="image/*" style={{ display: "none" }}
              onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => onPick(ev.target.result); r.readAsDataURL(f); } }} />
          </div>
          <div className="ioopt" onClick={() => onPick(null)}><span>🎨</span>Use Default</div>
        </div>
        <button className="ioc" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

// ── NGOCard ──────────────────────────────────────────────────────────────────
function NGOCard({ ngo, onClick }) {
  return (
    <div className="nc" onClick={() => onClick(ngo)}>
      <div className="ncb" style={ngo._bi ? {} : { background: gb(ngo.Name) }}>
        {ngo._bi && <img src={ngo._bi} alt="" />}
        <div className="nrk">#{ngo["India Rank"]}</div>
        <div className="nca" style={{ background: ga(ngo.Name) }}>
          {ngo._ai ? <img src={ngo._ai} alt="" /> : gi(ngo.Name)}
        </div>
        {ngo.Verified === "Yes" && <div className="nvb"><span style={{ color: "#27ae60" }}>✓</span>Verified</div>}
      </div>
      <div className="ncbody">
        <div className="nname">{ngo.Name}</div>
        <div className="nmeta">📍 {ngo.City}, {ngo.State}</div>
        <div className="ndom">{DOMAIN_ICONS[ngo.Domain] || "🏢"} {ngo.Domain}</div>
        <div className="ndesc">{ngo.Description}</div>
        <div className="nfoot">
          <div><div className="nsv">{fmt(ngo.Followers)}</div><div className="nsl">Followers</div></div>
          <div><div className="nsv">{ngo["Active Projects"]}</div><div className="nsl">Projects</div></div>
          <div><div className="nsv">{fmt(ngo.Employees)}</div><div className="nsl">Team</div></div>
          <div className="nrat">★ {parseFloat(ngo.Rating).toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
}

// ── NGO Detail Page ───────────────────────────────────────────────────────────
function NGODetail({ ngo, onBack, onNGOUpdate, globalPosts, onPostUpdate, currentUser, showToast }) {
  const [tab, setTab] = useState("about");
  const [following, setFollowing] = useState(false);
  const [follCnt, setFollCnt] = useState(parseInt(ngo.Followers) || 0);
  const [bpicker, setBpicker] = useState(false);
  const [apicker, setApicker] = useState(false);
  const [bImg, setBImg] = useState(ngo._bi || null);
  const [aImg, setAImg] = useState(ngo._ai || null);

  const ngoPosts = globalPosts.filter(p => p.ngoName === ngo.Name);

  const handleFollow = () => {
    const nf = !following; setFollowing(nf); setFollCnt(f => nf ? f + 1 : f - 1);
    showToast(nf ? `✅ Following ${ngo.Name}` : `Unfollowed ${ngo.Name}`);
  };
  const pickBanner = url => { setBImg(url); setBpicker(false); onNGOUpdate(ngo.Name, { _bi: url }); showToast("🖼 Banner updated!"); };
  const pickAvatar = url => { setAImg(url); setApicker(false); onNGOUpdate(ngo.Name, { _ai: url }); showToast("🖼 Profile photo updated!"); };

  return (
    <div className="dp">
      <button className="bk" onClick={onBack}>← Back to Discover</button>
      <div className="dpcard">
        <div className="dphead" style={{ position: "relative" }}>
          <div className="dpbanner">
            {bImg ? <img src={bImg} alt="" /> : <div className="dpbanner-grad" style={{ background: gb(ngo.Name) }} />}
            <button className="dp-edit-banner" onClick={() => setBpicker(true)}>📷 Edit Banner</button>
          </div>
          <div className="dpav-wrap">
            <div className="dpav" style={{ background: ga(ngo.Name) }} onClick={() => setApicker(true)}>
              {aImg ? <img src={aImg} alt="" /> : gi(ngo.Name)}
              <div className="dpav-hover">✏️</div>
            </div>
          </div>
          <div className="dpacts">
            <button className={`mb mb-fol${following ? " on" : ""}`} onClick={handleFollow}>{following ? "✓ Following" : "+ Follow"}</button>
            <button className="mb mb-p">🤝 Partner</button>
          </div>
        </div>

        <div className="dpbody">
          <div className="dpname">
            {ngo.Name}
            {ngo.Verified === "Yes" && <span className="vb">✓ Verified</span>}
            <span style={{ fontSize: 13, color: "var(--t3)", fontWeight: 400 }}>#{ngo["India Rank"]} India</span>
          </div>
          <div className="dpsub">
            <span>{DOMAIN_ICONS[ngo.Domain] || "🏢"} {ngo.Domain} · {ngo.Industry}</span>
            <span>📍 {ngo.City}, {ngo.State}</span>
            <span>🌐 <a href={`https://${ngo.Website}`} target="_blank" rel="noreferrer" style={{ color: "var(--p2)" }}>{ngo.Website}</a></span>
          </div>
          <div className="strow">
            {[{ v: fmt(follCnt), l: "Followers" }, { v: fmt(ngo.Employees), l: "Team" }, { v: ngo["Active Projects"], l: "Projects" }, { v: `${parseFloat(ngo.Rating).toFixed(1)} ★`, l: "Rating" }].map(s => (
              <div className="stb" key={s.l}><div className="stbv">{s.v}</div><div className="stbl">{s.l}</div></div>
            ))}
          </div>
          <div className="dptabs">
            {["about", "posts", "programs", "gallery"].map(t => (
              <button key={t} className={`dtab${tab === t ? " on" : ""}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === "about" && (
            <>
              <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.7, marginBottom: 12 }}>{ngo.Description}</p>
              <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.7, marginBottom: 12 }}><strong>Objective:</strong> {ngo.Objective}</p>
              <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.7, marginBottom: 18 }}><strong>Highlight:</strong> {ngo.Glimpses}</p>
              <div className="igrid">
                {[["Founded", ngo["Founded Year"]], ["Complaints", ngo["Complaints Resolve"]], ["Contact", ngo["Contact No"]], ["Email", ngo["Contact Email"]], ["Address", ngo.Address + ", " + ngo.City], ["Industry", ngo.Industry]].map(([l, v]) => (
                  <div className="ii" key={l}><div className="iil">{l}</div><div className="iiv">{v}</div></div>
                ))}
              </div>
              <div className="tchips">{[ngo.Domain, ngo.Industry, ngo.State, ngo.City, "NGO", "India"].map(t => (<span className="tc" key={t}>{t}</span>))}</div>
            </>
          )}

          {tab === "posts" && (
            <div>
              {ngoPosts.length === 0 && <div className="noc">No posts yet from this NGO.</div>}
              {ngoPosts.map(p => (
                <MiniPost key={p.id} post={p} onUpdate={onPostUpdate} currentUser={currentUser} />
              ))}
            </div>
          )}

          {tab === "programs" && (
            <div>
              {[{ ic: "🚿", n: "Clean Water Access Drive", s: "Active", loc: ngo.State, bg: "#e8f5e9", tc: "#27ae60" }, { ic: "📚", n: "Digital Literacy Program", s: "Active", loc: ngo.City, bg: "#e8f5e9", tc: "#27ae60" }, { ic: "💊", n: "Free Health Camp Initiative", s: "Completed", loc: "Pan India", bg: "#fff3e0", tc: "#e67e22" }, { ic: "🌱", n: "Green Sahara Plantation", s: "Planning", loc: ngo.State, bg: "#e3f2fd", tc: "#1565c0" }, { ic: "👩‍💻", n: "Women Tech Empowerment", s: "Active", loc: ngo.City, bg: "#e8f5e9", tc: "#27ae60" }].map((p, i) => (
                <div key={i} className="prog">
                  <div className="prog-ic" style={{ background: p.bg }}>{p.ic}</div>
                  <div><div className="prog-n">{p.n}</div><div className="prog-m">📍 {p.loc}</div></div>
                  <span className="prog-b" style={{ background: p.bg, color: p.tc, marginLeft: "auto" }}>{p.s}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "gallery" && (
            <div className="ggrid">
              {POST_IMAGES.map((s, i) => (
                <div key={i} className="gi"><img src={s} alt="" /></div>
              ))}
            </div>
          )}
        </div>
      </div>
      {bpicker && <ImagePicker title="Update Banner" onPick={pickBanner} onClose={() => setBpicker(false)} />}
      {apicker && <ImagePicker title="Update Profile Photo" onPick={pickAvatar} onClose={() => setApicker(false)} />}
    </div>
  );
}

// ── MiniPost (inside NGO profile) ────────────────────────────────────────────
function MiniPost({ post, onUpdate, currentUser }) {
  const [ct, setCt] = useState("");
  const send = () => {
    if (!ct.trim()) return;
    onUpdate(post.id, { comments: [...post.comments, { user: currentUser, text: ct.trim(), time: "Just now" }] });
    setCt("");
  };
  return (
    <div style={{ background: "var(--s2)", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.6, marginBottom: 7 }}>{post.text}</div>
      {post.tags.map(t => <span key={t} style={{ fontSize: 12, color: "var(--p2)", fontWeight: 600, marginRight: 7 }}>{t}</span>)}
      {post.image && <img src={post.image} alt="" style={{ width: "100%", borderRadius: 8, marginTop: 8, maxHeight: 160, objectFit: "cover" }} />}
      <div style={{ display: "flex", gap: 14, marginTop: 9, paddingTop: 9, borderTop: "1px solid var(--bd)", alignItems: "center" }}>
        <button onClick={() => onUpdate(post.id, { liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 })}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: post.liked ? "#e74c3c" : "var(--t3)", fontWeight: 600, fontFamily: "DM Sans,sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
          {post.liked ? "❤️" : "🤍"} <b>{post.likes}</b>
        </button>
        <span style={{ fontSize: 13, color: "var(--t3)", display: "flex", alignItems: "center", gap: 4 }}>💬 <b>{post.comments.length}</b></span>
        <span style={{ fontSize: 11, color: "var(--t3)", marginLeft: "auto" }}>{post.date}</span>
      </div>
      {post.comments.length > 0 && <div style={{ marginTop: 7, paddingTop: 7, borderTop: "1px solid var(--bd)" }}>
        {post.comments.map((c, i) => <div key={i} style={{ fontSize: 12, color: "var(--t2)", marginBottom: 3 }}><strong>{c.user}:</strong> {c.text}</div>)}
      </div>}
      <div style={{ display: "flex", gap: 7, marginTop: 9 }}>
        <input style={{ flex: 1, padding: "6px 11px", border: "1.5px solid var(--bd)", borderRadius: 20, fontSize: 12, fontFamily: "DM Sans,sans-serif", outline: "none", background: "#fff" }}
          placeholder="Add a comment..." value={ct} onChange={e => setCt(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button onClick={send} style={{ background: "var(--p)", color: "#fff", border: "none", borderRadius: 50, width: 28, height: 28, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>↑</button>
      </div>
    </div>
  );
}

// ── PostCard (feed) ───────────────────────────────────────────────────────────
function PostCard({ post, onUpdate, currentUser, showToast, onViewNGO }) {
  const [cmt, setCmt] = useState("");
  const [showC, setShowC] = useState(false);
  const [dmOpen, setDmOpen] = useState(false);
  const dmRef = useRef();

  useEffect(() => {
    const h = e => { if (dmRef.current && !dmRef.current.contains(e.target)) setDmOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);

  const sendCmt = () => {
    if (!cmt.trim()) return;
    onUpdate(post.id, { comments: [...post.comments, { user: currentUser, text: cmt.trim(), time: "Just now" }] });
    setCmt(""); setShowC(true);
    showToast("💬 Comment posted!");
  };

  const dms = [
    { ic: "🏢", lb: "View NGO Profile", fn: () => { setDmOpen(false); onViewNGO && onViewNGO(post.ngoName); } },
    { ic: "🔖", lb: "Save Post", fn: () => { showToast("🔖 Post saved!"); setDmOpen(false); } },
    { ic: "🔗", lb: "Copy Link", fn: () => { showToast("🔗 Link copied!"); setDmOpen(false); } },
    { ic: "🔔", lb: "Turn on notifications", fn: () => { showToast("🔔 Notifications on!"); setDmOpen(false); } },
    { ic: "🚩", lb: "Report Post", fn: () => { showToast("🚩 Reported."); setDmOpen(false); }, red: true },
    { ic: "🔕", lb: "Mute NGO", fn: () => { showToast("🔕 Muted."); setDmOpen(false); }, red: true },
  ];

  return (
    <div className="pc">
      <div className="phdr">
        <div className="pav" style={{ background: ga(post.ngoName) }}>{gi(post.ngoName)}</div>
        <div className="pau">
          <div className="pan" onClick={() => onViewNGO && onViewNGO(post.ngoName)}>{post.ngoName}</div>
          <div className="pam">
            <span>{DOMAIN_ICONS[post.ngoDomain] || "🏢"} {post.ngoDomain}</span>
            <span>·</span><span>{post.date}</span>
          </div>
        </div>
        <div style={{ position: "relative" }} ref={dmRef}>
          <button className="pdots" onClick={() => setDmOpen(o => !o)}>⋯</button>
          {dmOpen && (
            <div className="dm">
              {dms.map((d, i) => (
                <div key={i} className={`dmi${d.red ? " red" : ""}`} onClick={d.fn}>
                  <span>{d.ic}</span>{d.lb}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="ptxt">{post.text}</div>
      {post.tags.length > 0 && <div className="ptags">{post.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>}
      {post.image && <img src={post.image} alt="" className="pimg" />}

      <div className="pcnts">
        <div className="pci">{post.liked ? "❤️" : "🤍"} <b>{post.likes}</b> likes</div>
        <div style={{ display: "flex", gap: 14 }}>
          <div className="pci" style={{ cursor: "pointer" }} onClick={() => setShowC(o => !o)}>💬 <b>{post.comments.length}</b> comments</div>
          <div className="pci">↗ <b>{post.shares}</b> shares</div>
        </div>
      </div>

      <div className="pacts">
        <button className={`pa${post.liked ? " liked" : ""}`} onClick={() => onUpdate(post.id, { liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 })}>
          <svg viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          Like <span className="pac">{post.likes}</span>
        </button>
        <button className="pa" onClick={() => setShowC(o => !o)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          Comment <span className="pac">{post.comments.length}</span>
        </button>
        <button className="pa" onClick={() => { onUpdate(post.id, { shares: post.shares + 1 }); showToast("🔗 Shared!"); }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
          Share <span className="pac">{post.shares}</span>
        </button>
        <button className="pa" onClick={() => showToast("🔖 Saved!")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          Save
        </button>
      </div>

      {showC && (
        <div className="csec">
          {post.comments.length === 0 && <div className="noc">No comments yet. Be the first to comment!</div>}
          {post.comments.map((c, i) => (
            <div key={i} className="cr">
              <div className="cmav">{c.user.charAt(0).toUpperCase()}</div>
              <div className="cmb">
                <div className="cmn">{c.user}</div>
                <div className="cmt">{c.text}</div>
                <div className="cmtm">{c.time}</div>
              </div>
            </div>
          ))}
          <div className="cir">
            <input className="ci" placeholder={`Comment as ${currentUser}...`} value={cmt}
              onChange={e => setCmt(e.target.value)} onKeyDown={e => e.key === "Enter" && sendCmt()} />
            <button className="cs" onClick={sendCmt}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Add NGO Form ──────────────────────────────────────────────────────────────
function AddNGOForm({ onSuccess, onBack }) {
  const [f, setF] = useState({ name: "", description: "", objective: "", domain: "", industry: "", foundedYear: "", employees: "", website: "", contactNo: "", contactEmail: "", address: "", city: "", state: "", country: "India", rating: "", verified: "No", activeProjects: "", glimpses: "", complaintsResolve: "" });
  const [done, setDone] = useState(false);
  const h = e => setF(p => ({ ...p, [e.target.name]: e.target.value }));
  const submit = () => {
    if (!f.name || !f.domain || !f.city) return alert("Please fill required fields (Name, Domain, City).");
    setDone(true);
    setTimeout(() => onSuccess({ ...f, Name: f.name, Domain: f.domain, City: f.city, State: f.state, Description: f.description, Rating: f.rating || "4.0", Verified: f.verified, Followers: "0", Employees: f.employees || "0", "Active Projects": f.activeProjects || "0", "India Rank": "N/A", Objective: f.objective, Glimpses: f.glimpses }), 1800);
  };
  const D = ["Education", "Healthcare", "Environment", "Technology", "Agriculture", "Finance", "Social Impact", "Energy", "AI", "Cybersecurity", "Data & Analytics", "Rural Development"];
  const I = ["AgriTech", "Clean Energy", "Data Intelligence", "EdTech", "FinTech", "Healthcare Technology", "Information Technology", "Social Innovation"];
  const S = ["Delhi", "Gujarat", "Karnataka", "Madhya Pradesh", "Maharashtra", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Bihar", "Odisha", "Punjab", "Haryana", "Kerala"];
  const C = ["Ahmedabad", "Bangalore", "Bhopal", "Chennai", "Delhi", "Hyderabad", "Indore", "Jaipur", "Kolkata", "Lucknow", "Mumbai", "Nagpur", "Pune", "Surat", "Chandigarh", "Patna", "Bhubaneswar"];
  if (done) return (<div className="fc"><div className="fsucc"><div className="fsic">🎉</div><div className="fst2">NGO Successfully Registered!</div><div className="fss">Your NGO has been added and is under verification.</div><button className="fsub" style={{ maxWidth: 200, margin: "0 auto" }} onClick={() => setDone(false)}>Add Another</button></div></div>);
  return (
    <div className="fc">
      <div className="fh"><div className="fht">Register Your NGO</div><div className="fhs">Join India's largest NGO discovery platform</div></div>
      <div className="fb">
        <div className="fst">Basic Information</div>
        <div className="fgrid">
          <div className="ff full"><label className="fl">Name <span>*</span></label><input className="fi" name="name" value={f.name} onChange={h} placeholder="e.g. GreenEarth Foundation" /></div>
          <div className="ff full"><label className="fl">Description <span>*</span></label><textarea className="fta" name="description" value={f.description} onChange={h} placeholder="Brief description of your NGO's work..." /></div>
          <div className="ff full"><label className="fl">Objective</label><textarea className="fta" style={{ minHeight: 56 }} name="objective" value={f.objective} onChange={h} placeholder="Primary mission or objective..." /></div>
          <div className="ff"><label className="fl">Domain <span>*</span></label><select className="fsel" name="domain" value={f.domain} onChange={h}><option value="">Select Domain</option>{D.map(d => <option key={d}>{d}</option>)}</select></div>
          <div className="ff"><label className="fl">Industry</label><select className="fsel" name="industry" value={f.industry} onChange={h}><option value="">Select Industry</option>{I.map(i => <option key={i}>{i}</option>)}</select></div>
          <div className="ff"><label className="fl">Founded Year</label><input className="fi" name="foundedYear" type="number" min="1900" max="2025" value={f.foundedYear} onChange={h} placeholder="e.g. 2010" /></div>
          <div className="ff"><label className="fl">Employees</label><input className="fi" name="employees" type="number" value={f.employees} onChange={h} placeholder="e.g. 250" /></div>
          <div className="ff"><label className="fl">Active Projects</label><input className="fi" name="activeProjects" type="number" value={f.activeProjects} onChange={h} placeholder="e.g. 12" /></div>
          <div className="ff"><label className="fl">Verified</label><select className="fsel" name="verified" value={f.verified} onChange={h}><option value="No">No</option><option value="Yes">Yes</option></select></div>
        </div>
        <div className="fst">Contact & Location</div>
        <div className="fgrid">
          <div className="ff"><label className="fl">Website</label><input className="fi" name="website" value={f.website} onChange={h} placeholder="www.yourorg.in" /></div>
          <div className="ff"><label className="fl">Phone</label><input className="fi" name="contactNo" value={f.contactNo} onChange={h} placeholder="+91 XXXXXXXXXX" /></div>
          <div className="ff full"><label className="fl">Email <span>*</span></label><input className="fi" name="contactEmail" type="email" value={f.contactEmail} onChange={h} placeholder="contact@yourorg.in" /></div>
          <div className="ff full"><label className="fl">Address</label><input className="fi" name="address" value={f.address} onChange={h} placeholder="Street address, building number..." /></div>
          <div className="ff"><label className="fl">City / District <span>*</span></label><select className="fsel" name="city" value={f.city} onChange={h}><option value="">Select City</option>{C.map(c => <option key={c}>{c}</option>)}</select></div>
          <div className="ff"><label className="fl">State <span>*</span></label><select className="fsel" name="state" value={f.state} onChange={h}><option value="">Select State</option>{S.map(s => <option key={s}>{s}</option>)}</select></div>
        </div>
        <div className="fst">Additional Details</div>
        <div className="fgrid">
          <div className="ff full"><label className="fl">Key Achievement</label><input className="fi" name="glimpses" value={f.glimpses} onChange={h} placeholder="e.g. Planted 10,000 trees across 5 states" /></div>
          <div className="ff"><label className="fl">Complaints Policy</label><select className="fsel" name="complaintsResolve" value={f.complaintsResolve} onChange={h}><option value="">Select Policy</option><option value="Resolved within 24 hours">Resolved within 24 hours</option><option value="24x7 customer support desk">24x7 Support Desk</option><option value="Email response within 48 hours">Email within 48 hours</option><option value="Dedicated grievance officer">Dedicated Grievance Officer</option></select></div>
          <div className="ff"><label className="fl">Self Rating (1–5)</label><input className="fi" name="rating" type="number" min="1" max="5" step="0.1" value={f.rating} onChange={h} placeholder="e.g. 4.2" /></div>
        </div>
        <button className="fsub" onClick={submit}>🚀 Register NGO on Platform</button>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const CU = "You";
  const [tab, setTab] = useState("discover");
  const [allNGOs, setAllNGOs] = useState(RAW);
  const [search, setSearch] = useState("");
  const [fSt, setFSt] = useState("");
  const [fDist, setFDist] = useState("");
  const [fDom, setFDom] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);
  const [toast, setToast] = useState(null);
  const PER = 12;

  const STATES = useMemo(() => [...new Set(allNGOs.map(n => n.State))].sort(), [allNGOs]);
  const DISTS = useMemo(() => [...new Set(allNGOs.map(n => n.City))].sort(), [allNGOs]);
  const DOMS = useMemo(() => [...new Set(allNGOs.map(n => n.Domain))].sort(), [allNGOs]);

  const [posts, setPosts] = useState(() => RAW.slice(0, 12).flatMap(n => makePosts(n, 2)));

  const updPost = (id, patch) => setPosts(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3200); };

  const filtered = useMemo(() => allNGOs.filter(n => {
    const q = search.toLowerCase();
    return (!q || n.Name.toLowerCase().includes(q) || n.City.toLowerCase().includes(q) || n.Domain.toLowerCase().includes(q) || n.State.toLowerCase().includes(q))
      && (!fSt || n.State === fSt) && (!fDist || n.City === fDist) && (!fDom || n.Domain === fDom);
  }), [allNGOs, search, fSt, fDist, fDom]);

  const totalPgs = Math.ceil(filtered.length / PER);
  const paged = filtered.slice((page - 1) * PER, page * PER);
  const featured = allNGOs.slice(0, 7);
  const topRanked = useMemo(() => [...allNGOs].sort((a, b) => parseInt(a["India Rank"]) - parseInt(b["India Rank"])).slice(0, 6), [allNGOs]);
  const domStats = useMemo(() => DOMS.map(d => ({ d, cnt: allNGOs.filter(n => n.Domain === d).length })).sort((a, b) => b.cnt - a.cnt), [DOMS, allNGOs]);

  const addNGO = ngo => { setAllNGOs(p => [ngo, ...p]); setPosts(p => [...makePosts(ngo, 1), ...p]); setTab("discover"); showToast("✅ NGO registered!"); };
  const updNGO = (name, patch) => { setAllNGOs(p => p.map(n => n.Name === name ? { ...n, ...patch } : n)); if (detail?.Name === name) setDetail(p => ({ ...p, ...patch })); };
  const openByName = name => { const n = allNGOs.find(x => x.Name === name); if (n) { setDetail(n); setTab("discover"); } };
  const clearF = () => { setSearch(""); setFSt(""); setFDist(""); setFDom(""); setPage(1); };



  if (detail) return (
    <>
      <style>{CSS}</style>
      <div className="wrap">

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "22px 20px" }}>
          <NGODetail ngo={detail} onBack={() => setDetail(null)} onNGOUpdate={updNGO}
            globalPosts={posts} onPostUpdate={updPost} currentUser={CU} showToast={showToast} />
        </div>
        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="wrap">


        {tab === "discover" && (
          <div className="hero">
            <div className="htag">India's NGO Discovery Platform</div>
            <h1>Connect. Collaborate. <span>Create Impact.</span></h1>
            <p>Discover {allNGOs.length}+ verified NGOs working across India. Find partners, explore programs, and drive change.</p>
            <div className="hstats">
              <div className="hst"><div className="hst-n">{allNGOs.length}+</div><div className="hst-l">NGOs Listed</div></div>
              <div className="hst"><div className="hst-n">{STATES.length}</div><div className="hst-l">States</div></div>
              <div className="hst"><div className="hst-n">{DOMS.length}</div><div className="hst-l">Domains</div></div>
              <div className="hst"><div className="hst-n">2M+</div><div className="hst-l">Lives Impacted</div></div>
            </div>
          </div>
        )}

        <div className="layout">
          <aside className="sl">
            <div className="sc">
              <div className="stit">Platform Stats</div>
              {[["Total NGOs", allNGOs.length], ["Verified", allNGOs.filter(n => n.Verified === "Yes").length], ["States", STATES.length], ["Total Projects", allNGOs.reduce((s, n) => s + parseInt(n["Active Projects"] || 0), 0)], ["Team Members", allNGOs.reduce((s, n) => s + parseInt(n.Employees || 0), 0).toLocaleString("en-IN")]].map(([l, v]) => (
                <div className="qs" key={l}><span className="qsl">{l}</span><span className="qsv">{v}</span></div>
              ))}
            </div>
            <div className="sc">
              <div className="stit">Top Domains</div>
              {domStats.slice(0, 7).map(({ d, cnt }) => (
                <div key={d} className="ti" onClick={() => { setFDom(d); setTab("search"); setPage(1); }}>
                  <span style={{ fontSize: 14 }}>{DOMAIN_ICONS[d] || "🏢"}</span>
                  <div className="tin">{d}</div>
                  <div className="tib">{cnt}</div>
                </div>
              ))}
            </div>
          </aside>

          <main>
            {tab === "discover" && (
              <>
                <div className="shdr">
                  <div><div className="sh">⭐ Featured NGOs</div><div className="ss">Highlighted organizations making a difference</div></div>
                  <button className="vab" onClick={() => setTab("search")}>View All →</button>
                </div>
                <div className="ng">{featured.map(n => <NGOCard key={n.Name} ngo={n} onClick={setDetail} />)}</div>
                <div className="shdr" style={{ marginTop: 6 }}>
                  <div><div className="sh">📰 Recent Updates</div><div className="ss">Latest from the NGO community</div></div>
                  <button className="vab" onClick={() => setTab("feed")}>Full Feed →</button>
                </div>
                {posts.slice(0, 3).map(p => (
                  <PostCard key={p.id} post={p} onUpdate={updPost} currentUser={CU} showToast={showToast} onViewNGO={openByName} />
                ))}
              </>
            )}

            {tab === "feed" && (
              <div>
                <button className="bk" onClick={() => setTab("discover")}>← Back to Discover</button>
                <div className="shdr">
                  <div><div className="sh">📰 NGO Activity Feed</div><div className="ss">Updates, milestones & stories</div></div>
                </div>
                {posts.map(p => (
                  <PostCard key={p.id} post={p} onUpdate={updPost} currentUser={CU} showToast={showToast} onViewNGO={openByName} />
                ))}
              </div>
            )}

            {tab === "search" && (
              <>
                <button className="bk" onClick={() => setTab("discover")}>← Back to Discover</button>
                <div className="sb">
                  <div className="srow">
                    <div className="siw">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      <input className="si" placeholder="Search by name, domain, city, state..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                    </div>
                    <button className="cb" onClick={clearF}>Clear All</button>
                  </div>
                  <div className="fr">
                    <select className="fs" value={fSt} onChange={e => { setFSt(e.target.value); setPage(1); }}><option value="">All States</option>{STATES.map(s => <option key={s}>{s}</option>)}</select>
                    <select className="fs" value={fDist} onChange={e => { setFDist(e.target.value); setPage(1); }}><option value="">All Districts</option>{DISTS.map(d => <option key={d}>{d}</option>)}</select>
                    <select className="fs" value={fDom} onChange={e => { setFDom(e.target.value); setPage(1); }}><option value="">All Domains</option>{DOMS.map(d => <option key={d}>{DOMAIN_ICONS[d] || ""} {d}</option>)}</select>
                  </div>
                  {(search || fSt || fDist || fDom) && (
                    <div className="ftags">
                      {search && <div className="ftag">🔍 "{search}" <button onClick={() => setSearch("")}>×</button></div>}
                      {fSt && <div className="ftag">📍 {fSt} <button onClick={() => setFSt("")}>×</button></div>}
                      {fDist && <div className="ftag">🏙 {fDist} <button onClick={() => setFDist("")}>×</button></div>}
                      {fDom && <div className="ftag">{DOMAIN_ICONS[fDom]} {fDom} <button onClick={() => setFDom("")}>×</button></div>}
                    </div>
                  )}
                  <div className="ri">Showing {paged.length} of {filtered.length} NGOs</div>
                </div>
                {filtered.length === 0 ? (
                  <div className="emp"><div className="empic">🔍</div><div className="empt">No NGOs found</div><div className="emps">Try adjusting your search or filters</div></div>
                ) : (
                  <>
                    <div className="ng">{paged.map(n => <NGOCard key={n.Name} ngo={n} onClick={setDetail} />)}</div>
                    {totalPgs > 1 && (
                      <div className="pg">
                        <button className="pgb" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                        {Array.from({ length: Math.min(7, totalPgs) }, (_, i) => {
                          let p = i + 1;
                          if (totalPgs > 7) { if (page <= 4) p = i + 1; else if (page >= totalPgs - 3) p = totalPgs - 6 + i; else p = page - 3 + i; }
                          return <button key={p} className={`pgb${page === p ? " on" : ""}`} onClick={() => setPage(p)}>{p}</button>;
                        })}
                        <button className="pgb" onClick={() => setPage(p => Math.min(totalPgs, p + 1))} disabled={page === totalPgs}>›</button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {tab === "add" && (
              <AddNGOForm onSuccess={addNGO} onBack={() => setTab("discover")} />
            )}
          </main>

          <aside className="sr">
            <div className="sc">
              <div className="stit">🏆 Top Ranked</div>
              {topRanked.map((n, i) => (
                <div key={n.Name} className="ti" onClick={() => setDetail(n)}>
                  <div className="tirn">{i + 1}</div>
                  <div className="tin">{n.Name}</div>
                  <div className="tib">#{n["India Rank"]}</div>
                </div>
              ))}
            </div>
            <div className="sc">
              <div className="stit">📍 By State</div>
              {STATES.map(s => (
                <div key={s} className="ti" onClick={() => { setFSt(s); setTab("search"); setPage(1); }}>
                  <span style={{ fontSize: 14 }}>🗺</span>
                  <div className="tin">{s}</div>
                  <div className="tib">{allNGOs.filter(n => n.State === s).length}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}
