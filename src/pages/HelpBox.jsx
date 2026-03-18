import { useState, useEffect } from "react";

const CATEGORIES = [
  { id: "girl_education",    label: "Girl Education",              icon: "📚", desc: "Access to schooling, scholarships & literacy" },
  { id: "child_labour",      label: "Child Labour",                icon: "🚸", desc: "Protection from exploitation & forced work" },
  { id: "financial_condition",label: "Financial Condition",        icon: "💳", desc: "Economic support & livelihood assistance" },
  { id: "girl_empowerment",  label: "Girl Empowerment Campaign",   icon: "✊", desc: "Awareness drives & community programs" },
  { id: "domestic_violence", label: "Domestic Violence",           icon: "🛡️", desc: "Safety, shelter & legal protection" },
  { id: "early_marriage",    label: "Early Marriage Prevention",   icon: "💍", desc: "Rights & freedom from forced marriage" },
  { id: "health_hygiene",    label: "Women Health & Hygiene",      icon: "🏥", desc: "Menstrual health, maternal care & nutrition" },
  { id: "skill_development", label: "Skill Development",           icon: "🛠️", desc: "Vocational training & employment support" },
  { id: "legal_awareness",   label: "Legal Awareness",             icon: "⚖️", desc: "Know your rights & legal aid" },
  { id: "digital_literacy",  label: "Digital Literacy",            icon: "💻", desc: "Tech access & online safety" },
  { id: "mental_health",     label: "Mental Health Support",       icon: "🧠", desc: "Counselling & psychological well-being" },
  { id: "other",             label: "Other",                       icon: "➕", desc: "Any other gender-related concern" },
];

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Other",
];

const URGENCY = [
  "Low – Awareness needed",
  "Medium – Needs attention soon",
  "High – Urgent intervention required",
  "Critical – Immediate action needed",
];

/* ── Category → NGO Domain mapping ── */
const CATEGORY_DOMAIN_MAP = {
  girl_education:     ["Girl Education", "Education"],
  child_labour:       ["Social Impact", "Rural Development"],
  financial_condition:["Finance"],
  girl_empowerment:   ["Social Impact", "Education", "Girl Education"],
  domestic_violence:  ["Social Impact", "Healthcare"],
  early_marriage:     ["Social Impact", "Girl Education", "Rural Development"],
  health_hygiene:     ["Healthcare"],
  skill_development:  ["Education", "Technology", "Rural Development"],
  legal_awareness:    ["Social Impact", "Technology"],
  digital_literacy:   ["Education", "Technology", "AI"],
  mental_health:      ["Healthcare", "Social Impact"],
  other:              ["Social Impact"],
};

/* ── NGO Dataset (500 entries) ── */
const NGO_DATASET = [{"name":"CleanWater Hub 1","domain":"Girl Education","phone":"919325937758"},{"name":"AgriTech Hub 2","domain":"Finance","phone":"917531054074"},{"name":"StartupCatalyst Foundation 3","domain":"Data & Analytics","phone":"917382671931"},{"name":"ImpactSphere Hub 4","domain":"Finance","phone":"919006239897"},{"name":"MedCare Collective 5","domain":"AI","phone":"918796321584"},{"name":"SkillForge Solutions 6","domain":"Cybersecurity","phone":"918657370442"},{"name":"AgriTech Network 7","domain":"Agriculture","phone":"918706135033"},{"name":"SolarRise Program 8","domain":"Agriculture","phone":"917219047665"},{"name":"InnoBridge Trust 9","domain":"AI","phone":"918375693884"},{"name":"SkillForge Hub 10","domain":"Rural Development","phone":"919682514371"},{"name":"HealthBridge Alliance 11","domain":"Data & Analytics","phone":"917502489449"},{"name":"SolarRise Solutions 12","domain":"Cybersecurity","phone":"918623414765"},{"name":"UrbanMobility Program 13","domain":"Healthcare","phone":"919612804096"},{"name":"DataSense Alliance 14","domain":"Education","phone":"918746724313"},{"name":"ImpactSphere Trust 15","domain":"Technology","phone":"919750978001"},{"name":"SolarRise Network 16","domain":"Technology","phone":"917708440355"},{"name":"FutureLabs Program 17","domain":"Data & Analytics","phone":"919384949800"},{"name":"AgriTech Program 18","domain":"AI","phone":"918056641072"},{"name":"CleanWater Hub 19","domain":"Cybersecurity","phone":"919399928588"},{"name":"FoodSecure Network 20","domain":"Cybersecurity","phone":"917438606217"},{"name":"DigitalBharat Network 21","domain":"Healthcare","phone":"917247364279"},{"name":"UrbanMobility Trust 22","domain":"Rural Development","phone":"918463959160"},{"name":"SkillForge Network 23","domain":"Education","phone":"918891314033"},{"name":"ImpactSphere Trust 24","domain":"Agriculture","phone":"918252143325"},{"name":"UrbanMobility Hub 25","domain":"Healthcare","phone":"918781495997"},{"name":"HealthBridge Initiative 26","domain":"Agriculture","phone":"918933043654"},{"name":"TechForGood Alliance 27","domain":"Finance","phone":"918762019116"},{"name":"FoodSecure Trust 28","domain":"AI","phone":"917775360686"},{"name":"EcoGuard Network 29","domain":"Data & Analytics","phone":"917890174883"},{"name":"GreenFuture Hub 30","domain":"Education","phone":"919492607997"},{"name":"StartupCatalyst Network 31","domain":"Technology","phone":"918887052187"},{"name":"SkillForge Program 32","domain":"Cybersecurity","phone":"918042584725"},{"name":"ImpactSphere Labs 33","domain":"AI","phone":"918838112841"},{"name":"DataSense Labs 34","domain":"Rural Development","phone":"919559002580"},{"name":"YouthSpark Program 35","domain":"Finance","phone":"918785452124"},{"name":"GreenFuture Alliance 36","domain":"Finance","phone":"919856879708"},{"name":"ImpactSphere Initiative 37","domain":"Agriculture","phone":"918182935608"},{"name":"ImpactSphere Program 38","domain":"Environment","phone":"918671505676"},{"name":"UrbanMobility Labs 39","domain":"Education","phone":"918399244202"},{"name":"YouthSpark Network 40","domain":"Healthcare","phone":"917270865400"},{"name":"RuralConnect Program 41","domain":"Healthcare","phone":"917222155528"},{"name":"InnoBridge Solutions 42","domain":"Agriculture","phone":"918538352032"},{"name":"FinAccess Program 43","domain":"Finance","phone":"917628207370"},{"name":"NextGen Program 44","domain":"Technology","phone":"918405719854"},{"name":"HealthBridge Foundation 45","domain":"Rural Development","phone":"919374536337"},{"name":"EduNext Initiative 46","domain":"Healthcare","phone":"918170040136"},{"name":"GreenFuture Foundation 47","domain":"Environment","phone":"919438209999"},{"name":"InnoBridge Collective 48","domain":"Education","phone":"919209651772"},{"name":"DigitalBharat Labs 49","domain":"Education","phone":"919181863755"},{"name":"DigitalBharat Collective 50","domain":"Environment","phone":"917604639681"},{"name":"DigitalBharat Network 51","domain":"AI","phone":"918104953242"},{"name":"TechForGood Alliance 52","domain":"Technology","phone":"919288583803"},{"name":"AgriTech Program 53","domain":"Rural Development","phone":"919117090885"},{"name":"NextGen Network 54","domain":"Technology","phone":"919248780081"},{"name":"RuralConnect Trust 55","domain":"Finance","phone":"918971398269"},{"name":"GreenFuture Foundation 56","domain":"Social Impact","phone":"919796725563"},{"name":"GreenFuture Initiative 57","domain":"Cybersecurity","phone":"919169815543"},{"name":"DigitalBharat Alliance 58","domain":"Agriculture","phone":"918384772886"},{"name":"MedCare Program 59","domain":"Social Impact","phone":"918307330701"},{"name":"NextGen Collective 60","domain":"Energy","phone":"919153036089"},{"name":"NextGen Labs 61","domain":"Energy","phone":"918226096019"},{"name":"EduNext Trust 62","domain":"Agriculture","phone":"918809300401"},{"name":"MedCare Network 63","domain":"Healthcare","phone":"918516500570"},{"name":"CleanWater Initiative 64","domain":"Rural Development","phone":"917834134073"},{"name":"GreenFuture Trust 65","domain":"AI","phone":"917663892118"},{"name":"FutureLabs Trust 66","domain":"Agriculture","phone":"919310720834"},{"name":"StartupCatalyst Hub 67","domain":"AI","phone":"919128478318"},{"name":"MedCare Collective 68","domain":"Social Impact","phone":"918689670440"},{"name":"RuralConnect Alliance 69","domain":"Healthcare","phone":"917127473776"},{"name":"StartupCatalyst Initiative 70","domain":"Education","phone":"919220938690"},{"name":"SkillForge Hub 71","domain":"Environment","phone":"917557451348"},{"name":"AgriTech Initiative 72","domain":"Rural Development","phone":"918475931480"},{"name":"CleanWater Foundation 73","domain":"Finance","phone":"919721400814"},{"name":"MedCare Solutions 74","domain":"Education","phone":"919124663130"},{"name":"GreenFuture Solutions 75","domain":"Social Impact","phone":"917303538608"},{"name":"FutureLabs Foundation 76","domain":"Finance","phone":"919823347919"},{"name":"DataSense Solutions 77","domain":"Energy","phone":"918522123304"},{"name":"NextGen Solutions 78","domain":"Agriculture","phone":"917365760626"},{"name":"EduNext Network 79","domain":"Social Impact","phone":"917878784141"},{"name":"ImpactSphere Initiative 80","domain":"AI","phone":"917678929510"},{"name":"FinAccess Network 81","domain":"Education","phone":"919372120351"},{"name":"SmartVillage Solutions 82","domain":"Healthcare","phone":"919538082982"},{"name":"MedCare Program 83","domain":"AI","phone":"917648149825"},{"name":"GreenFuture Foundation 84","domain":"Healthcare","phone":"918701273594"},{"name":"DataSense Program 85","domain":"Education","phone":"917779778763"},{"name":"AgriTech Trust 86","domain":"Finance","phone":"917377951691"},{"name":"InnoBridge Alliance 87","domain":"Finance","phone":"917569858982"},{"name":"UrbanMobility Trust 88","domain":"Social Impact","phone":"918045421062"},{"name":"HealthBridge Labs 89","domain":"Social Impact","phone":"919644944074"},{"name":"RuralConnect Network 90","domain":"Social Impact","phone":"917680777651"},{"name":"CleanWater Foundation 91","domain":"Energy","phone":"919994898913"},{"name":"FinAccess Alliance 92","domain":"Environment","phone":"919366300243"},{"name":"EcoGuard Program 93","domain":"Rural Development","phone":"919211873696"},{"name":"GreenFuture Solutions 94","domain":"Agriculture","phone":"917392524272"},{"name":"SkillForge Alliance 95","domain":"Technology","phone":"918067606265"},{"name":"GreenFuture Hub 96","domain":"Finance","phone":"919786834836"},{"name":"FoodSecure Network 97","domain":"Data & Analytics","phone":"919910925053"},{"name":"ImpactSphere Foundation 98","domain":"AI","phone":"919900552046"},{"name":"FutureLabs Alliance 99","domain":"Energy","phone":"917055276337"},{"name":"MedCare Initiative 100","domain":"Agriculture","phone":"918297195348"},{"name":"RuralConnect Alliance 101","domain":"Education","phone":"918237373071"},{"name":"WomenRise Collective 102","domain":"AI","phone":"919374018186"},{"name":"NextGen Trust 103","domain":"Healthcare","phone":"917269717361"},{"name":"InnoBridge Hub 104","domain":"Education","phone":"918683060439"},{"name":"EcoGuard Labs 105","domain":"Rural Development","phone":"918993291435"},{"name":"ImpactSphere Initiative 106","domain":"Agriculture","phone":"919028161616"},{"name":"UrbanMobility Trust 107","domain":"Data & Analytics","phone":"919157495203"},{"name":"SolarRise Hub 108","domain":"Finance","phone":"919417595794"},{"name":"StartupCatalyst Trust 109","domain":"Agriculture","phone":"917852446382"},{"name":"RuralConnect Solutions 110","domain":"Education","phone":"917361942870"},{"name":"WomenRise Labs 111","domain":"Cybersecurity","phone":"919878359309"},{"name":"YouthSpark Trust 112","domain":"Environment","phone":"917191381165"},{"name":"GreenFuture Trust 113","domain":"Environment","phone":"919797795673"},{"name":"FinAccess Initiative 114","domain":"Energy","phone":"917191317185"},{"name":"SkillForge Network 115","domain":"Healthcare","phone":"918104663828"},{"name":"DigitalBharat Network 116","domain":"Energy","phone":"917612530273"},{"name":"SolarRise Foundation 117","domain":"Technology","phone":"919622245854"},{"name":"SolarRise Collective 118","domain":"Finance","phone":"919436765259"},{"name":"UrbanMobility Collective 119","domain":"Finance","phone":"917713040242"},{"name":"EduNext Hub 120","domain":"Rural Development","phone":"918825769291"},{"name":"FoodSecure Labs 121","domain":"Data & Analytics","phone":"917702374465"},{"name":"CleanWater Collective 122","domain":"AI","phone":"918945465421"},{"name":"SkillForge Trust 123","domain":"Education","phone":"918569479233"},{"name":"FinAccess Alliance 124","domain":"Cybersecurity","phone":"919591277451"},{"name":"DigitalBharat Network 125","domain":"Finance","phone":"918214046068"},{"name":"FoodSecure Labs 126","domain":"Environment","phone":"919590353167"},{"name":"FutureLabs Alliance 127","domain":"Environment","phone":"917138767323"},{"name":"FinAccess Initiative 128","domain":"Energy","phone":"919222213108"},{"name":"ImpactSphere Labs 129","domain":"Education","phone":"919922804378"},{"name":"DataSense Alliance 130","domain":"Energy","phone":"917191939154"},{"name":"FoodSecure Foundation 131","domain":"Environment","phone":"918551773434"},{"name":"RuralConnect Collective 132","domain":"Social Impact","phone":"918651933839"},{"name":"GreenFuture Trust 133","domain":"AI","phone":"917333026711"},{"name":"FoodSecure Program 134","domain":"Healthcare","phone":"918581514067"},{"name":"StartupCatalyst Solutions 135","domain":"Social Impact","phone":"919564536018"},{"name":"AgriTech Program 136","domain":"AI","phone":"917869773363"},{"name":"InnoBridge Foundation 137","domain":"Cybersecurity","phone":"919270629416"},{"name":"RuralConnect Initiative 138","domain":"Cybersecurity","phone":"918699097106"},{"name":"FutureLabs Program 139","domain":"Education","phone":"918566709713"},{"name":"NextGen Foundation 140","domain":"Data & Analytics","phone":"917956714337"},{"name":"EduNext Collective 141","domain":"Cybersecurity","phone":"919273448943"},{"name":"WomenRise Collective 142","domain":"Healthcare","phone":"917019471116"},{"name":"CleanWater Labs 143","domain":"Healthcare","phone":"917734544026"},{"name":"StartupCatalyst Program 144","domain":"Environment","phone":"919057224420"},{"name":"RuralConnect Program 145","domain":"Energy","phone":"919756348220"},{"name":"SmartVillage Labs 146","domain":"Healthcare","phone":"918541959096"},{"name":"DigitalBharat Trust 147","domain":"Social Impact","phone":"918286683082"},{"name":"RuralConnect Solutions 148","domain":"Social Impact","phone":"918573776407"},{"name":"SmartVillage Trust 149","domain":"AI","phone":"919034739436"},{"name":"HealthBridge Labs 150","domain":"Education","phone":"917037767691"},{"name":"EduNext Network 151","domain":"Energy","phone":"918166779968"},{"name":"MedCare Trust 152","domain":"Technology","phone":"917851792135"},{"name":"ImpactSphere Hub 153","domain":"Data & Analytics","phone":"917267931357"},{"name":"HealthBridge Foundation 154","domain":"Agriculture","phone":"917913753574"},{"name":"GreenFuture Foundation 155","domain":"AI","phone":"918024889434"},{"name":"StartupCatalyst Collective 156","domain":"Cybersecurity","phone":"919144751678"},{"name":"InnoBridge Foundation 157","domain":"Education","phone":"918861418769"},{"name":"CleanWater Hub 158","domain":"Data & Analytics","phone":"919990269842"},{"name":"FutureLabs Trust 159","domain":"Finance","phone":"919586661021"},{"name":"SmartVillage Alliance 160","domain":"Environment","phone":"917692761563"},{"name":"DataSense Hub 161","domain":"Finance","phone":"919731427587"},{"name":"EduNext Network 162","domain":"Cybersecurity","phone":"919046624255"},{"name":"DataSense Hub 163","domain":"Energy","phone":"917531607335"},{"name":"CleanWater Collective 164","domain":"Data & Analytics","phone":"919266217431"},{"name":"FinAccess Hub 165","domain":"Social Impact","phone":"918985789023"},{"name":"NextGen Network 166","domain":"Technology","phone":"919600467345"},{"name":"YouthSpark Labs 167","domain":"Energy","phone":"919346905810"},{"name":"FinAccess Collective 168","domain":"Cybersecurity","phone":"918602190558"},{"name":"FinAccess Collective 169","domain":"Finance","phone":"917565845691"},{"name":"UrbanMobility Initiative 170","domain":"Cybersecurity","phone":"918719040255"},{"name":"SolarRise Foundation 171","domain":"Energy","phone":"917526407896"},{"name":"SmartVillage Program 172","domain":"Energy","phone":"917549416999"},{"name":"NextGen Program 173","domain":"Healthcare","phone":"919444147124"},{"name":"FutureLabs Labs 174","domain":"Environment","phone":"917102498173"},{"name":"FoodSecure Labs 175","domain":"Healthcare","phone":"919478194004"},{"name":"AgriTech Hub 176","domain":"Education","phone":"917523419313"},{"name":"DigitalBharat Alliance 177","domain":"Finance","phone":"918689713459"},{"name":"DataSense Solutions 178","domain":"Technology","phone":"917304481515"},{"name":"FutureLabs Solutions 179","domain":"Finance","phone":"917517623287"},{"name":"FinAccess Solutions 180","domain":"Rural Development","phone":"918372351740"},{"name":"TechForGood Program 181","domain":"Energy","phone":"919214309824"},{"name":"HealthBridge Solutions 182","domain":"Energy","phone":"917462078506"},{"name":"AgriTech Alliance 183","domain":"Data & Analytics","phone":"917562038101"},{"name":"ImpactSphere Collective 184","domain":"Rural Development","phone":"918567017642"},{"name":"MedCare Alliance 185","domain":"Environment","phone":"918904505452"},{"name":"HealthBridge Hub 186","domain":"Social Impact","phone":"917981600373"},{"name":"YouthSpark Labs 187","domain":"Finance","phone":"917288585685"},{"name":"FutureLabs Alliance 188","domain":"Cybersecurity","phone":"918924495809"},{"name":"StartupCatalyst Labs 189","domain":"Energy","phone":"919485051303"},{"name":"SolarRise Program 190","domain":"Environment","phone":"918455465421"},{"name":"EcoGuard Solutions 191","domain":"Agriculture","phone":"919835567288"},{"name":"EcoGuard Labs 192","domain":"Energy","phone":"919774869409"},{"name":"DataSense Labs 193","domain":"AI","phone":"917863394640"},{"name":"WomenRise Labs 194","domain":"Data & Analytics","phone":"917825810846"},{"name":"ImpactSphere Alliance 195","domain":"Social Impact","phone":"918227836574"},{"name":"FoodSecure Program 196","domain":"Cybersecurity","phone":"917303620360"},{"name":"EduNext Trust 197","domain":"Energy","phone":"917311087062"},{"name":"YouthSpark Alliance 198","domain":"Environment","phone":"917498506864"},{"name":"EcoGuard Alliance 199","domain":"Finance","phone":"919520309363"},{"name":"HealthBridge Alliance 200","domain":"Finance","phone":"919980839722"},{"name":"CleanWater Hub 201","domain":"Finance","phone":"917563962591"},{"name":"SkillForge Labs 202","domain":"Energy","phone":"917647261836"},{"name":"MedCare Foundation 203","domain":"Data & Analytics","phone":"918244051018"},{"name":"AgriTech Hub 204","domain":"Environment","phone":"919210114563"},{"name":"FoodSecure Alliance 205","domain":"Rural Development","phone":"919293968604"},{"name":"SkillForge Solutions 206","domain":"Healthcare","phone":"919639258558"},{"name":"WomenRise Labs 207","domain":"Environment","phone":"918520397601"},{"name":"FinAccess Initiative 208","domain":"Agriculture","phone":"918750986904"},{"name":"RuralConnect Program 209","domain":"Cybersecurity","phone":"919981281641"},{"name":"DigitalBharat Solutions 210","domain":"Energy","phone":"919421419667"},{"name":"MedCare Labs 211","domain":"Healthcare","phone":"917740537862"},{"name":"SmartVillage Foundation 212","domain":"Environment","phone":"917036024242"},{"name":"StartupCatalyst Solutions 213","domain":"Rural Development","phone":"919986601421"},{"name":"InnoBridge Labs 214","domain":"Social Impact","phone":"919322228813"},{"name":"InnoBridge Hub 215","domain":"Energy","phone":"919960136735"},{"name":"FutureLabs Labs 216","domain":"Social Impact","phone":"919386809581"},{"name":"YouthSpark Labs 217","domain":"Healthcare","phone":"918503860227"},{"name":"MedCare Program 218","domain":"Cybersecurity","phone":"917372028208"},{"name":"GreenFuture Labs 219","domain":"Finance","phone":"917618429511"},{"name":"EcoGuard Trust 220","domain":"AI","phone":"918527114699"},{"name":"TechForGood Network 221","domain":"Cybersecurity","phone":"917619613751"},{"name":"FoodSecure Labs 222","domain":"Social Impact","phone":"917436493786"},{"name":"DataSense Solutions 223","domain":"Social Impact","phone":"919466774063"},{"name":"WomenRise Trust 224","domain":"Energy","phone":"918357613557"},{"name":"FutureLabs Trust 225","domain":"Environment","phone":"918560714811"},{"name":"SmartVillage Initiative 226","domain":"Energy","phone":"918352941609"},{"name":"CleanWater Labs 227","domain":"AI","phone":"917544818902"},{"name":"EcoGuard Collective 228","domain":"Education","phone":"919484785701"},{"name":"RuralConnect Alliance 229","domain":"Cybersecurity","phone":"917449485254"},{"name":"FoodSecure Hub 230","domain":"Finance","phone":"919945086853"},{"name":"DigitalBharat Labs 231","domain":"Social Impact","phone":"919185838219"},{"name":"CleanWater Initiative 232","domain":"Finance","phone":"918184437775"},{"name":"WomenRise Trust 233","domain":"Environment","phone":"918747415683"},{"name":"SmartVillage Alliance 234","domain":"Agriculture","phone":"917278649666"},{"name":"InnoBridge Trust 235","domain":"Environment","phone":"917125719241"},{"name":"RuralConnect Initiative 236","domain":"Energy","phone":"917133198780"},{"name":"FinAccess Foundation 237","domain":"Rural Development","phone":"919533926507"},{"name":"GreenFuture Hub 238","domain":"AI","phone":"919769162741"},{"name":"EcoGuard Trust 239","domain":"Rural Development","phone":"919367188419"},{"name":"DigitalBharat Hub 240","domain":"Energy","phone":"918028078469"},{"name":"YouthSpark Network 241","domain":"AI","phone":"918039239755"},{"name":"DigitalBharat Network 242","domain":"Data & Analytics","phone":"917071260306"},{"name":"NextGen Foundation 243","domain":"Finance","phone":"919342678891"},{"name":"SkillForge Collective 244","domain":"Environment","phone":"918343779452"},{"name":"NextGen Solutions 245","domain":"Social Impact","phone":"919906371278"},{"name":"WomenRise Foundation 246","domain":"Social Impact","phone":"919964578174"},{"name":"SkillForge Network 247","domain":"Healthcare","phone":"918544088345"},{"name":"TechForGood Foundation 248","domain":"Education","phone":"917253830496"},{"name":"FoodSecure Program 249","domain":"Agriculture","phone":"919255968715"},{"name":"MedCare Collective 250","domain":"Cybersecurity","phone":"918932879762"},{"name":"WomenRise Foundation 251","domain":"Agriculture","phone":"919395123951"},{"name":"GreenFuture Alliance 252","domain":"Agriculture","phone":"918536876995"},{"name":"HealthBridge Foundation 253","domain":"Healthcare","phone":"919416995306"},{"name":"FoodSecure Program 254","domain":"AI","phone":"918492555005"},{"name":"InnoBridge Foundation 255","domain":"Cybersecurity","phone":"919426902172"},{"name":"SkillForge Collective 256","domain":"AI","phone":"917193312392"},{"name":"HealthBridge Trust 257","domain":"Energy","phone":"917755523807"},{"name":"EduNext Labs 258","domain":"Energy","phone":"919289561154"},{"name":"UrbanMobility Solutions 259","domain":"Healthcare","phone":"918756778257"},{"name":"FutureLabs Trust 260","domain":"Rural Development","phone":"917996318248"},{"name":"DigitalBharat Foundation 261","domain":"AI","phone":"919998196541"},{"name":"EduNext Collective 262","domain":"AI","phone":"918136240963"},{"name":"HealthBridge Initiative 263","domain":"Social Impact","phone":"919482435078"},{"name":"YouthSpark Program 264","domain":"Finance","phone":"917183181217"},{"name":"WomenRise Hub 265","domain":"Rural Development","phone":"917438575148"},{"name":"FoodSecure Network 266","domain":"Social Impact","phone":"917488511749"},{"name":"UrbanMobility Collective 267","domain":"Rural Development","phone":"918782783359"},{"name":"SkillForge Solutions 268","domain":"Education","phone":"919892637556"},{"name":"DataSense Collective 269","domain":"AI","phone":"917976094421"},{"name":"RuralConnect Trust 270","domain":"Energy","phone":"918876230932"},{"name":"UrbanMobility Labs 271","domain":"Social Impact","phone":"917689930492"},{"name":"CleanWater Labs 272","domain":"Education","phone":"918190241764"},{"name":"HealthBridge Hub 273","domain":"Cybersecurity","phone":"919084057860"},{"name":"AgriTech Hub 274","domain":"Rural Development","phone":"918227572513"},{"name":"HealthBridge Collective 275","domain":"Education","phone":"917192570401"},{"name":"FoodSecure Hub 276","domain":"Education","phone":"919608928635"},{"name":"WomenRise Hub 277","domain":"Energy","phone":"918283150787"},{"name":"YouthSpark Solutions 278","domain":"Data & Analytics","phone":"918081034223"},{"name":"SolarRise Trust 279","domain":"Energy","phone":"918122194839"},{"name":"MedCare Trust 280","domain":"Agriculture","phone":"917435833568"},{"name":"YouthSpark Alliance 281","domain":"Rural Development","phone":"918711991636"},{"name":"FinAccess Program 282","domain":"Technology","phone":"918590964481"},{"name":"FoodSecure Labs 283","domain":"Cybersecurity","phone":"917221250997"},{"name":"YouthSpark Solutions 284","domain":"Technology","phone":"918684958149"},{"name":"HealthBridge Hub 285","domain":"Rural Development","phone":"919705209546"},{"name":"CleanWater Program 286","domain":"Healthcare","phone":"917606138482"},{"name":"HealthBridge Labs 287","domain":"Social Impact","phone":"918823995453"},{"name":"InnoBridge Initiative 288","domain":"Healthcare","phone":"919136212942"},{"name":"FinAccess Alliance 289","domain":"Data & Analytics","phone":"917872923355"},{"name":"DataSense Alliance 290","domain":"Data & Analytics","phone":"917226023035"},{"name":"StartupCatalyst Program 291","domain":"Cybersecurity","phone":"918195860901"},{"name":"HealthBridge Initiative 292","domain":"Technology","phone":"918206797843"},{"name":"YouthSpark Trust 293","domain":"Healthcare","phone":"919856485314"},{"name":"YouthSpark Initiative 294","domain":"Environment","phone":"918406959407"},{"name":"FoodSecure Program 295","domain":"Finance","phone":"917597838037"},{"name":"SmartVillage Foundation 296","domain":"Rural Development","phone":"917439977919"},{"name":"SmartVillage Initiative 297","domain":"Cybersecurity","phone":"917405707670"},{"name":"InnoBridge Collective 298","domain":"Rural Development","phone":"918289604276"},{"name":"CleanWater Foundation 299","domain":"AI","phone":"919361836038"},{"name":"RuralConnect Program 300","domain":"Education","phone":"917127544336"},{"name":"SkillForge Labs 301","domain":"Technology","phone":"918448747719"},{"name":"InnoBridge Foundation 302","domain":"Technology","phone":"917440085650"},{"name":"DataSense Trust 303","domain":"Data & Analytics","phone":"919591367672"},{"name":"GreenFuture Alliance 304","domain":"Cybersecurity","phone":"919022317963"},{"name":"RuralConnect Collective 305","domain":"Environment","phone":"918917917778"},{"name":"DataSense Initiative 306","domain":"Agriculture","phone":"919537699668"},{"name":"ImpactSphere Labs 307","domain":"AI","phone":"918220129928"},{"name":"SolarRise Program 308","domain":"Finance","phone":"919524428161"},{"name":"FutureLabs Foundation 309","domain":"Technology","phone":"919098209505"},{"name":"WomenRise Hub 310","domain":"Finance","phone":"917465236215"},{"name":"ImpactSphere Foundation 311","domain":"Social Impact","phone":"918285792696"},{"name":"StartupCatalyst Collective 312","domain":"Social Impact","phone":"919280889118"},{"name":"SolarRise Collective 313","domain":"Rural Development","phone":"919166837214"},{"name":"FinAccess Collective 314","domain":"Technology","phone":"918035257988"},{"name":"FutureLabs Labs 315","domain":"Rural Development","phone":"917140566109"},{"name":"NextGen Alliance 316","domain":"Cybersecurity","phone":"919308312948"},{"name":"FoodSecure Foundation 317","domain":"Environment","phone":"919447819385"},{"name":"StartupCatalyst Collective 318","domain":"Environment","phone":"919425062565"},{"name":"SmartVillage Solutions 319","domain":"Data & Analytics","phone":"919971308126"},{"name":"StartupCatalyst Trust 320","domain":"Healthcare","phone":"917050504437"},{"name":"DigitalBharat Program 321","domain":"AI","phone":"919706416356"},{"name":"YouthSpark Foundation 322","domain":"Finance","phone":"918280849935"},{"name":"MedCare Foundation 323","domain":"Energy","phone":"918813535272"},{"name":"EcoGuard Network 324","domain":"Data & Analytics","phone":"917080787229"},{"name":"CleanWater Alliance 325","domain":"Cybersecurity","phone":"917811146737"},{"name":"SkillForge Hub 326","domain":"Education","phone":"918099789355"},{"name":"InnoBridge Network 327","domain":"Energy","phone":"919181763423"},{"name":"ImpactSphere Trust 328","domain":"Rural Development","phone":"918482726688"},{"name":"AgriTech Alliance 329","domain":"Data & Analytics","phone":"919946121217"},{"name":"SmartVillage Hub 330","domain":"Cybersecurity","phone":"918442647508"},{"name":"SkillForge Initiative 331","domain":"Education","phone":"919166149536"},{"name":"DigitalBharat Labs 332","domain":"Finance","phone":"917943623246"},{"name":"WomenRise Labs 333","domain":"Environment","phone":"919757379751"},{"name":"FutureLabs Program 334","domain":"Finance","phone":"917464993174"},{"name":"YouthSpark Solutions 335","domain":"AI","phone":"917272918048"},{"name":"TechForGood Labs 336","domain":"Education","phone":"918514137820"},{"name":"NextGen Network 337","domain":"Data & Analytics","phone":"917379396964"},{"name":"StartupCatalyst Hub 338","domain":"Social Impact","phone":"918861468455"},{"name":"SkillForge Program 339","domain":"Agriculture","phone":"919339611622"},{"name":"CleanWater Alliance 340","domain":"Finance","phone":"919890938985"},{"name":"DigitalBharat Trust 341","domain":"Social Impact","phone":"917558076641"},{"name":"NextGen Foundation 342","domain":"Rural Development","phone":"917384537873"},{"name":"WomenRise Alliance 343","domain":"Healthcare","phone":"918591453931"},{"name":"ImpactSphere Alliance 344","domain":"Agriculture","phone":"919172393041"},{"name":"TechForGood Program 345","domain":"AI","phone":"918437164911"},{"name":"NextGen Foundation 346","domain":"Healthcare","phone":"919954424658"},{"name":"RuralConnect Network 347","domain":"AI","phone":"919638433528"},{"name":"EduNext Solutions 348","domain":"Social Impact","phone":"919401030093"},{"name":"StartupCatalyst Foundation 349","domain":"Finance","phone":"919443336701"},{"name":"MedCare Network 350","domain":"Environment","phone":"917174761803"},{"name":"NextGen Initiative 351","domain":"Cybersecurity","phone":"917491393733"},{"name":"TechForGood Program 352","domain":"Rural Development","phone":"917863388333"},{"name":"InnoBridge Labs 353","domain":"Cybersecurity","phone":"919954521829"},{"name":"AgriTech Program 354","domain":"Technology","phone":"917393966336"},{"name":"WomenRise Initiative 355","domain":"Data & Analytics","phone":"919700666006"},{"name":"MedCare Hub 356","domain":"Rural Development","phone":"917336066502"},{"name":"FinAccess Trust 357","domain":"Finance","phone":"919091665070"},{"name":"DataSense Solutions 358","domain":"Rural Development","phone":"917666650874"},{"name":"DataSense Solutions 359","domain":"Rural Development","phone":"919571357209"},{"name":"SmartVillage Initiative 360","domain":"Finance","phone":"919217627427"},{"name":"EcoGuard Alliance 361","domain":"Rural Development","phone":"919949672302"},{"name":"AgriTech Program 362","domain":"Data & Analytics","phone":"917744117975"},{"name":"SolarRise Foundation 363","domain":"Cybersecurity","phone":"919799219312"},{"name":"WomenRise Alliance 364","domain":"Finance","phone":"919421798999"},{"name":"GreenFuture Hub 365","domain":"Education","phone":"919736202503"},{"name":"EduNext Network 366","domain":"Energy","phone":"917106811801"},{"name":"YouthSpark Initiative 367","domain":"Environment","phone":"918129561194"},{"name":"RuralConnect Initiative 368","domain":"Energy","phone":"919837445402"},{"name":"SolarRise Hub 369","domain":"AI","phone":"919058900111"},{"name":"HealthBridge Labs 370","domain":"Data & Analytics","phone":"917402602865"},{"name":"RuralConnect Labs 371","domain":"Finance","phone":"917068656270"},{"name":"GreenFuture Trust 372","domain":"Rural Development","phone":"918443989310"},{"name":"DigitalBharat Foundation 373","domain":"Healthcare","phone":"919388459379"},{"name":"HealthBridge Network 374","domain":"Data & Analytics","phone":"919592133229"},{"name":"FoodSecure Hub 375","domain":"Technology","phone":"919344822406"},{"name":"FoodSecure Collective 376","domain":"Rural Development","phone":"917333778018"},{"name":"DataSense Initiative 377","domain":"Technology","phone":"918402392340"},{"name":"StartupCatalyst Hub 378","domain":"Environment","phone":"919570268123"},{"name":"SkillForge Solutions 379","domain":"Technology","phone":"917309336496"},{"name":"SmartVillage Alliance 380","domain":"Finance","phone":"918552430345"},{"name":"ImpactSphere Foundation 381","domain":"Healthcare","phone":"918905092424"},{"name":"UrbanMobility Network 382","domain":"AI","phone":"917491682267"},{"name":"UrbanMobility Program 383","domain":"Cybersecurity","phone":"919122347507"},{"name":"StartupCatalyst Network 384","domain":"Data & Analytics","phone":"918617573170"},{"name":"StartupCatalyst Program 385","domain":"Education","phone":"917274639561"},{"name":"YouthSpark Hub 386","domain":"Rural Development","phone":"919053647447"},{"name":"WomenRise Labs 387","domain":"Data & Analytics","phone":"918081625539"},{"name":"FutureLabs Collective 388","domain":"Social Impact","phone":"918725156674"},{"name":"DataSense Collective 389","domain":"Cybersecurity","phone":"919985719943"},{"name":"SolarRise Hub 390","domain":"Education","phone":"917280486355"},{"name":"FutureLabs Collective 391","domain":"Finance","phone":"917880294771"},{"name":"DataSense Solutions 392","domain":"Environment","phone":"917036307092"},{"name":"NextGen Hub 393","domain":"Cybersecurity","phone":"919466963245"},{"name":"EduNext Initiative 394","domain":"Cybersecurity","phone":"917481855442"},{"name":"SolarRise Network 395","domain":"Healthcare","phone":"918641687628"},{"name":"YouthSpark Foundation 396","domain":"AI","phone":"919654352686"},{"name":"EduNext Labs 397","domain":"Data & Analytics","phone":"917122794442"},{"name":"SolarRise Initiative 398","domain":"Technology","phone":"919038585484"},{"name":"UrbanMobility Initiative 399","domain":"Education","phone":"918308812933"},{"name":"FutureLabs Solutions 400","domain":"AI","phone":"919315364329"},{"name":"InnoBridge Solutions 401","domain":"Environment","phone":"919927508052"},{"name":"RuralConnect Alliance 402","domain":"Data & Analytics","phone":"918822546871"},{"name":"DataSense Network 403","domain":"Agriculture","phone":"918573307462"},{"name":"ImpactSphere Trust 404","domain":"Environment","phone":"918074087060"},{"name":"FutureLabs Labs 405","domain":"Agriculture","phone":"918371948139"},{"name":"MedCare Program 406","domain":"Cybersecurity","phone":"917508382395"},{"name":"DigitalBharat Program 407","domain":"Healthcare","phone":"917282992482"},{"name":"WomenRise Solutions 408","domain":"Technology","phone":"917950263485"},{"name":"MedCare Alliance 409","domain":"Energy","phone":"919671081982"},{"name":"HealthBridge Collective 410","domain":"Finance","phone":"917573209351"},{"name":"AgriTech Foundation 411","domain":"Social Impact","phone":"919028276887"},{"name":"YouthSpark Labs 412","domain":"Agriculture","phone":"917584153876"},{"name":"SolarRise Hub 413","domain":"Agriculture","phone":"918859089363"},{"name":"NextGen Foundation 414","domain":"Cybersecurity","phone":"917168456619"},{"name":"GreenFuture Alliance 415","domain":"Education","phone":"919006773181"},{"name":"RuralConnect Alliance 416","domain":"Finance","phone":"918167645364"},{"name":"ImpactSphere Foundation 417","domain":"Social Impact","phone":"919792052000"},{"name":"YouthSpark Program 418","domain":"Technology","phone":"919898686860"},{"name":"GreenFuture Alliance 419","domain":"Finance","phone":"918824422754"},{"name":"GreenFuture Program 420","domain":"Finance","phone":"917394173326"},{"name":"CleanWater Foundation 421","domain":"Finance","phone":"918846412081"},{"name":"RuralConnect Hub 422","domain":"Cybersecurity","phone":"918953643974"},{"name":"ImpactSphere Labs 423","domain":"Energy","phone":"918653886302"},{"name":"SolarRise Foundation 424","domain":"Healthcare","phone":"919734378673"},{"name":"WomenRise Hub 425","domain":"Social Impact","phone":"918833203854"},{"name":"SkillForge Labs 426","domain":"Environment","phone":"917077326254"},{"name":"RuralConnect Program 427","domain":"Rural Development","phone":"918566102307"},{"name":"DigitalBharat Program 428","domain":"Social Impact","phone":"919262985793"},{"name":"HealthBridge Collective 429","domain":"Environment","phone":"919652139003"},{"name":"RuralConnect Initiative 430","domain":"Cybersecurity","phone":"919140639539"},{"name":"YouthSpark Solutions 431","domain":"Social Impact","phone":"918264875267"},{"name":"SmartVillage Solutions 432","domain":"Energy","phone":"918423247517"},{"name":"DigitalBharat Collective 433","domain":"Technology","phone":"917319532532"},{"name":"StartupCatalyst Program 434","domain":"Cybersecurity","phone":"917612491781"},{"name":"InnoBridge Labs 435","domain":"Social Impact","phone":"918484979410"},{"name":"SkillForge Solutions 436","domain":"Rural Development","phone":"917740045445"},{"name":"SolarRise Network 437","domain":"Social Impact","phone":"919286958133"},{"name":"NextGen Alliance 438","domain":"Finance","phone":"917245277138"},{"name":"InnoBridge Program 439","domain":"Education","phone":"917309839718"},{"name":"SkillForge Solutions 440","domain":"Cybersecurity","phone":"919913969076"},{"name":"TechForGood Foundation 441","domain":"Cybersecurity","phone":"919549510874"},{"name":"AgriTech Labs 442","domain":"Data & Analytics","phone":"919678955463"},{"name":"EduNext Trust 443","domain":"Social Impact","phone":"919427674349"},{"name":"MedCare Initiative 444","domain":"Energy","phone":"919079653620"},{"name":"AgriTech Solutions 445","domain":"Healthcare","phone":"918217963618"},{"name":"SkillForge Hub 446","domain":"Rural Development","phone":"919915825395"},{"name":"DataSense Hub 447","domain":"Agriculture","phone":"919681307345"},{"name":"CleanWater Labs 448","domain":"Technology","phone":"919480848111"},{"name":"GreenFuture Labs 449","domain":"Data & Analytics","phone":"917104140189"},{"name":"InnoBridge Alliance 450","domain":"Finance","phone":"919325750724"},{"name":"SkillForge Network 451","domain":"Cybersecurity","phone":"918061963081"},{"name":"DigitalBharat Trust 452","domain":"Healthcare","phone":"917067432162"},{"name":"TechForGood Trust 453","domain":"Rural Development","phone":"917683614987"},{"name":"FutureLabs Program 454","domain":"Environment","phone":"917693425545"},{"name":"HealthBridge Trust 455","domain":"Energy","phone":"919956695940"},{"name":"InnoBridge Trust 456","domain":"AI","phone":"917478083145"},{"name":"SmartVillage Collective 457","domain":"Technology","phone":"917711943975"},{"name":"HealthBridge Initiative 458","domain":"AI","phone":"918158572219"},{"name":"SmartVillage Initiative 459","domain":"Energy","phone":"917076477199"},{"name":"TechForGood Network 460","domain":"Education","phone":"919794268232"},{"name":"SmartVillage Initiative 461","domain":"Rural Development","phone":"917390087432"},{"name":"NextGen Network 462","domain":"Technology","phone":"917078017799"},{"name":"NextGen Solutions 463","domain":"Finance","phone":"919902884957"},{"name":"FutureLabs Hub 464","domain":"Rural Development","phone":"919077196250"},{"name":"EduNext Solutions 465","domain":"Rural Development","phone":"917644105737"},{"name":"DataSense Alliance 466","domain":"Energy","phone":"919566636930"},{"name":"EcoGuard Program 467","domain":"Social Impact","phone":"918516804669"},{"name":"StartupCatalyst Program 468","domain":"Healthcare","phone":"919649479143"},{"name":"DataSense Trust 469","domain":"Finance","phone":"917270004462"},{"name":"MedCare Program 470","domain":"Education","phone":"917845296354"},{"name":"NextGen Alliance 471","domain":"Education","phone":"919563920150"},{"name":"FoodSecure Network 472","domain":"Healthcare","phone":"918700064602"},{"name":"TechForGood Initiative 473","domain":"Energy","phone":"918597893514"},{"name":"HealthBridge Hub 474","domain":"Cybersecurity","phone":"917588726459"},{"name":"WomenRise Solutions 475","domain":"Technology","phone":"918615683767"},{"name":"SmartVillage Initiative 476","domain":"Social Impact","phone":"917777104189"},{"name":"SolarRise Hub 477","domain":"Healthcare","phone":"918395424853"},{"name":"YouthSpark Network 478","domain":"Rural Development","phone":"917399469738"},{"name":"AgriTech Initiative 479","domain":"Environment","phone":"917245258912"},{"name":"YouthSpark Labs 480","domain":"Data & Analytics","phone":"917955340659"},{"name":"DataSense Solutions 481","domain":"Healthcare","phone":"919982226643"},{"name":"DataSense Labs 482","domain":"Social Impact","phone":"917380011196"},{"name":"ImpactSphere Trust 483","domain":"Technology","phone":"918934581556"},{"name":"FoodSecure Foundation 484","domain":"Cybersecurity","phone":"917372107882"},{"name":"RuralConnect Labs 485","domain":"AI","phone":"919105573452"},{"name":"AgriTech Alliance 486","domain":"Technology","phone":"919660297939"},{"name":"NextGen Collective 487","domain":"Data & Analytics","phone":"918155488510"},{"name":"AgriTech Labs 488","domain":"Data & Analytics","phone":"919568724806"},{"name":"CleanWater Foundation 489","domain":"Social Impact","phone":"917316585759"},{"name":"RuralConnect Network 490","domain":"Social Impact","phone":"919478422213"},{"name":"SkillForge Program 491","domain":"Data & Analytics","phone":"919095167893"},{"name":"UrbanMobility Network 492","domain":"Social Impact","phone":"917962355883"},{"name":"SkillForge Solutions 493","domain":"Finance","phone":"919817947171"},{"name":"SkillForge Program 494","domain":"Cybersecurity","phone":"919294227230"},{"name":"EduNext Foundation 495","domain":"AI","phone":"919802048771"},{"name":"FoodSecure Network 496","domain":"AI","phone":"917730551821"},{"name":"ImpactSphere Program 497","domain":"Social Impact","phone":"917506738351"},{"name":"SkillForge Collective 498","domain":"Finance","phone":"918539762670"},{"name":"EcoGuard Collective 499","domain":"Social Impact","phone":"919917976446"},{"name":"YouthSpark Program 500","domain":"Finance","phone":"919805205915"}];

/* ── shared input style (light theme) ── */
const inputBase = {
  width: "100%", padding: "10px 14px", borderRadius: "8px",
  background: "#f9fafb", border: "1px solid #e5e7eb",
  color: "#111827", fontSize: "13px", outline: "none",
  transition: "border-color 0.2s", boxSizing: "border-box",
  fontFamily: "'Segoe UI', system-ui, sans-serif",
};

const selectBase = {
  ...inputBase,
  appearance: "none", WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239ca3af'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
  backgroundSize: "auto",
  cursor: "pointer",
};

/* ── sub-components ── */
function SectionTitle({ children, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
      <div style={{ width: "3px", height: "16px", background: accent, borderRadius: "2px", flexShrink: 0 }} />
      <h3 style={{ color: "#374151", fontSize: "11px", fontWeight: "700", margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>
        {children}
      </h3>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label style={{ color: "#6b7280", fontSize: "12px", fontWeight: "500", display: "block", marginBottom: "5px" }}>
        {label}
      </label>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputBase}
      />
    </div>
  );
}

function NavButtons({ onBack, onNext, canNext, accent, isLast }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
      {onBack && (
        <button onClick={onBack} style={{
          padding: "11px 22px", borderRadius: "8px",
          background: "#fff", border: "1px solid #e5e7eb",
          color: "#374151", fontSize: "13px", fontWeight: "600", cursor: "pointer",
        }}>
          ← Back
        </button>
      )}
      <button onClick={onNext} disabled={!canNext} style={{
        flex: 1, padding: "12px", borderRadius: "8px", border: "none",
        background: canNext ? accent : "#f3f4f6",
        color: canNext ? "#fff" : "#9ca3af",
        fontSize: "13px", fontWeight: "700",
        cursor: canNext ? "pointer" : "not-allowed",
        transition: "all 0.2s",
      }}>
        {isLast ? "Submit & Generate Report →" : "Continue →"}
      </button>
    </div>
  );
}

/* ── main component ── */
export default function GenderGapPortal() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [mode,      setMode]      = useState(null);   // 'help' | 'complaint'
  const [step,      setStep]      = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [ticketId,  setTicketId]  = useState("");
  const [animateIn, setAnimateIn] = useState(false);
  const [copied,    setCopied]    = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [matchedNGOs,  setMatchedNGOs]  = useState([]);

  const [form, setForm] = useState({
    name: "", gender: "", age: "", email: "", mobile: "",
    state: "", district: "", village: "",
    categories: [], urgency: "", description: "",
    anonymous: false, consent: false,
    helpType: "",
    complaintAgainst: "", relationship: "", incidentDate: "",
  });

  useEffect(() => {
    if (isOpen) setTimeout(() => setAnimateIn(true), 10);
    else setAnimateIn(false);
  }, [isOpen]);

  const open = (selectedMode) => {
    setMode(selectedMode); setIsOpen(true);
    setStep(1); setSubmitted(false); setCopied(false); setWhatsappSent(false); setMatchedNGOs([]);
  };

  const close = () => {
    setIsOpen(false); setMode(null); setStep(1);
    setSubmitted(false); setCopied(false); setWhatsappSent(false); setMatchedNGOs([]);
    setForm({
      name: "", gender: "", age: "", email: "", mobile: "",
      state: "", district: "", village: "",
      categories: [], urgency: "", description: "",
      anonymous: false, consent: false,
      helpType: "", complaintAgainst: "", relationship: "", incidentDate: "",
    });
    setGeneratedMessage("");
  };

  const toggleCategory = (id) =>
    setForm(f => ({
      ...f,
      categories: f.categories.includes(id)
        ? f.categories.filter(c => c !== id)
        : [...f.categories, id],
    }));

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const generateMessage = () => {
    const catLabels = form.categories.map(c => CATEGORIES.find(x => x.id === c)?.label).join(", ");
    const dateStr   = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
    const tid       = "BGG-" + Date.now().toString(36).toUpperCase();
    setTicketId(tid);

    const block = (title, value) => `${title.padEnd(15)}: ${value}`;

    if (mode === "help") {
      setGeneratedMessage(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        BRIDGING THE GENDER GAP — HELP REGISTRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${block("TICKET ID", tid)}
${block("DATE", dateStr)}
${block("TYPE", "Help / Support Request")}

── REGISTRANT DETAILS ──────────────────────────────
${block("Name", form.anonymous ? "Anonymous" : form.name || "Not provided")}
${block("Gender", form.gender || "Not specified")}
${block("Age", form.age || "Not specified")}
${block("Mobile", form.mobile || "Not provided")}
${block("Email", form.email || "Not provided")}

── LOCATION ────────────────────────────────────────
${block("State", form.state || "Not specified")}
${block("District", form.district || "Not specified")}
${block("Village/Area", form.village || "Not specified")}

── ISSUE CATEGORIES ────────────────────────────────
${catLabels || "Not specified"}

── URGENCY LEVEL ───────────────────────────────────
${form.urgency || "Not specified"}

── TYPE OF HELP SOUGHT ─────────────────────────────
${form.helpType || "Not specified"}

── DESCRIPTION OF NEED ─────────────────────────────
${form.description || "No additional details provided."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This request will be forwarded to relevant NGOs and
local authorities matching the issue categories.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`.trim());
    } else {
      setGeneratedMessage(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     BRIDGING THE GENDER GAP — COMPLAINT REGISTRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${block("TICKET ID", tid)}
${block("DATE", dateStr)}
${block("TYPE", "Formal Complaint")}

── COMPLAINANT DETAILS ─────────────────────────────
${block("Name", form.anonymous ? "Anonymous (Identity Protected)" : form.name || "Not provided")}
${block("Gender", form.gender || "Not specified")}
${block("Age", form.age || "Not specified")}
${block("Mobile", form.mobile || "Not provided")}
${block("Email", form.email || "Not provided")}

── LOCATION OF INCIDENT ────────────────────────────
${block("State", form.state || "Not specified")}
${block("District", form.district || "Not specified")}
${block("Village/Area", form.village || "Not specified")}

── COMPLAINT CATEGORIES ────────────────────────────
${catLabels || "Not specified"}

── URGENCY LEVEL ───────────────────────────────────
${form.urgency || "Not specified"}

── COMPLAINT AGAINST ───────────────────────────────
${block("Against", form.complaintAgainst || "Not specified")}
${block("Relationship", form.relationship || "Not specified")}
${block("Incident Date", form.incidentDate || "Not specified")}

── DESCRIPTION OF COMPLAINT ────────────────────────
${form.description || "No additional details provided."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This complaint will be forwarded to relevant local
authorities and NGOs for immediate review and action.
All personal information will be handled with strict
confidentiality as per applicable law.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`.trim());
    }
    setSubmitted(true);
    setStep(4);
  };

  const sendToWhatsApp = (message) => {
    // Collect all target domains for selected categories
    const targetDomains = new Set();
    form.categories.forEach(catId => {
      (CATEGORY_DOMAIN_MAP[catId] || []).forEach(d => targetDomains.add(d));
    });

    // Find all matching NGOs
    const matches = NGO_DATASET.filter(ngo => targetDomains.has(ngo.domain));

    if (matches.length === 0) {
      alert("No matching NGOs found for the selected categories.");
      return;
    }

    setMatchedNGOs(matches);
    const encoded = encodeURIComponent(message);

    // Open WhatsApp for each match (browsers may block popups after the first)
    matches.forEach((ngo, i) => {
      setTimeout(() => {
        window.open(`https://wa.me/${ngo.phone}?text=${encoded}`, "_blank");
      }, i * 400); // stagger to reduce popup blocking
    });

    setWhatsappSent(true);
  };

  /* ── derived theme colours ── */
  const accent    = mode === "complaint" ? "#dc2626" : "#059669";
  const accentBg  = mode === "complaint" ? "#fef2f2" : "#f0fdf4";
  const accentBorder = mode === "complaint" ? "#fecaca" : "#bbf7d0";

  const canProceed1 = form.categories.length > 0 && form.urgency;
  const canProceed2 = form.anonymous || (form.name && form.mobile);
  const canProceed3 = form.state && form.description && form.consent;

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        input::placeholder,textarea::placeholder { color:#d1d5db; }
        input:focus,textarea:focus,select:focus   { border-color:#6b7280 !important; background:#fff !important; }
        option { background:#fff; color:#111827; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#f3f4f6; }
        ::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:3px; }
      `}</style>

      {/* ══ TRIGGER SECTION ══ */}
      <div style={{
        background: "#ffffff", padding: "48px 24px",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif", gap: "16px",
        marginTop: "150px"
      }}>
        <p style={{ margin: 0, color: "#6b7280", fontSize: "13px", fontWeight: "500", letterSpacing: "0.3px" }}>
          Bridging the Gender Gap Initiative
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => open("complaint")}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "translateY(0)"; }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "12px 26px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: "#dc2626", color: "#fff",
              fontSize: "14px", fontWeight: "700",
              boxShadow: "0 2px 8px rgba(220,38,38,0.25)",
              transition: "opacity 0.2s, transform 0.2s",
            }}>
            🚨 Register Complaint
          </button>
          <button
            onClick={() => open("help")}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.transform = "translateY(0)"; }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "12px 26px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: "#059669", color: "#fff",
              fontSize: "14px", fontWeight: "700",
              boxShadow: "0 2px 8px rgba(5,150,105,0.25)",
              transition: "opacity 0.2s, transform 0.2s",
            }}>
            🤝 Register Help
          </button>
        </div>
      </div>

      {/* ══ MODAL OVERLAY ══ */}
      {isOpen && (
        <div
          onClick={e => e.target === e.currentTarget && close()}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(17,24,39,0.45)",
            backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
            opacity: animateIn ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        >
          <div style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "20px",
            width: "100%", maxWidth: "740px",
            maxHeight: "92vh", overflowY: "auto",
            boxShadow: "0 24px 64px rgba(0,0,0,0.14), 0 1px 0 rgba(0,0,0,0.04)",
            transform: animateIn ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}>

            {/* ── Modal Header ── */}
            <div style={{
              padding: "24px 28px 16px",
              borderBottom: "1px solid #f3f4f6",
              position: "sticky", top: 0, zIndex: 10,
              background: "#ffffff",
              borderRadius: "20px 20px 0 0",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: accentBg, border: `1px solid ${accentBorder}`,
                    borderRadius: "100px", padding: "4px 12px", marginBottom: "8px",
                  }}>
                    <span style={{ fontSize: "11px", color: accent, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                      {mode === "complaint" ? "🚨 Complaint Registration" : "🤝 Help Registration"}
                    </span>
                  </div>
                  <h2 style={{ color: "#111827", fontSize: "18px", fontWeight: "700", margin: 0 }}>
                    {mode === "complaint" ? "File a Formal Complaint" : "Register a Help Request"}
                  </h2>
                </div>
                <button onClick={close} style={{
                  background: "#f9fafb", border: "1px solid #e5e7eb",
                  borderRadius: "8px", width: "34px", height: "34px", flexShrink: 0,
                  color: "#6b7280", cursor: "pointer", fontSize: "15px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>✕</button>
              </div>

              {/* Step progress */}
              {!submitted && (
                <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                  {["Issue Details", "Personal Info", "Location & Details"].map((label, i) => (
                    <div key={i} style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                        <div style={{
                          width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                          background: step > i + 1 ? accent : step === i + 1 ? accent : "#f3f4f6",
                          border: `2px solid ${step >= i + 1 ? accent : "#e5e7eb"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "9px", fontWeight: "800",
                          color: step >= i + 1 ? "#fff" : "#9ca3af",
                        }}>
                          {step > i + 1 ? "✓" : i + 1}
                        </div>
                        <span style={{
                          fontSize: "11px", fontWeight: step === i + 1 ? "600" : "400",
                          color: step >= i + 1 ? "#374151" : "#9ca3af",
                        }}>
                          {label}
                        </span>
                      </div>
                      <div style={{
                        height: "3px", borderRadius: "2px",
                        background: step > i + 1 ? accent : step === i + 1 ? accent : "#f3f4f6",
                        opacity: step > i + 1 ? 1 : step === i + 1 ? 0.5 : 1,
                      }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Modal Body ── */}
            <div style={{ padding: "24px 28px 28px" }}>

              {/* ═ STEP 1 ═ */}
              {step === 1 && (
                <div style={{ animation: "fadeUp 0.3s ease" }}>
                  <SectionTitle accent={accent}>Select Issue Categories</SectionTitle>
                  <p style={{ color: "#9ca3af", fontSize: "12px", marginBottom: "14px", marginTop: "-4px" }}>
                    Select all relevant categories — your submission will be routed to matching NGOs & authorities
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(186px,1fr))", gap: "8px", marginBottom: "22px" }}>
                    {CATEGORIES.map(cat => {
                      const sel = form.categories.includes(cat.id);
                      return (
                        <button key={cat.id} onClick={() => toggleCategory(cat.id)} style={{
                          background: sel ? accentBg : "#f9fafb",
                          border: `1.5px solid ${sel ? accent : "#e5e7eb"}`,
                          borderRadius: "10px", padding: "11px 12px",
                          cursor: "pointer", textAlign: "left", transition: "all 0.18s",
                        }}>
                          <div style={{ fontSize: "17px", marginBottom: "4px" }}>{cat.icon}</div>
                          <div style={{ color: sel ? accent : "#1f2937", fontSize: "12px", fontWeight: "600" }}>{cat.label}</div>
                          <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "2px", lineHeight: "1.4" }}>{cat.desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  <SectionTitle accent={accent}>Urgency Level</SectionTitle>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "4px" }}>
                    {URGENCY.map(u => (
                      <button key={u} onClick={() => update("urgency", u)} style={{
                        background: form.urgency === u ? accentBg : "#f9fafb",
                        border: `1.5px solid ${form.urgency === u ? accent : "#e5e7eb"}`,
                        borderRadius: "8px", padding: "10px 12px",
                        cursor: "pointer", textAlign: "left", transition: "all 0.18s",
                        color: form.urgency === u ? accent : "#374151",
                        fontSize: "12px", fontWeight: "500",
                      }}>
                        {u}
                      </button>
                    ))}
                  </div>

                  {/* Complaint-specific */}
                  {mode === "complaint" && (
                    <div style={{ marginTop: "20px" }}>
                      <SectionTitle accent={accent}>Complaint Details</SectionTitle>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <Field label="Complaint Against" value={form.complaintAgainst} onChange={v => update("complaintAgainst", v)} placeholder="Person / Institution / Authority" />
                        <Field label="Your Relationship to Them" value={form.relationship} onChange={v => update("relationship", v)} placeholder="e.g. Family, Employer, Stranger" />
                        <Field label="Date of Incident" type="date" value={form.incidentDate} onChange={v => update("incidentDate", v)} />
                      </div>
                    </div>
                  )}

                  {/* Help-specific */}
                  {mode === "help" && (
                    <div style={{ marginTop: "20px" }}>
                      <SectionTitle accent={accent}>Type of Help Sought</SectionTitle>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(148px,1fr))", gap: "8px" }}>
                        {["NGO Intervention","Awareness Campaign","Legal Aid","Financial Support","Medical Help","Counselling","Skill Training","Government Scheme","Shelter & Safety","Other"].map(h => (
                          <button key={h} onClick={() => update("helpType", h)} style={{
                            background: form.helpType === h ? accentBg : "#f9fafb",
                            border: `1.5px solid ${form.helpType === h ? accent : "#e5e7eb"}`,
                            borderRadius: "8px", padding: "9px 10px",
                            cursor: "pointer", transition: "all 0.18s",
                            color: form.helpType === h ? accent : "#374151",
                            fontSize: "12px", fontWeight: "500",
                          }}>
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <NavButtons onNext={() => setStep(2)} canNext={canProceed1} accent={accent} />
                </div>
              )}

              {/* ═ STEP 2 ═ */}
              {step === 2 && (
                <div style={{ animation: "fadeUp 0.3s ease" }}>
                  {/* Anonymous toggle */}
                  <div style={{
                    background: "#f9fafb", border: "1px solid #e5e7eb",
                    borderRadius: "12px", padding: "14px 16px", marginBottom: "20px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ color: "#111827", fontSize: "13px", fontWeight: "600" }}>Submit Anonymously</div>
                      <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "2px" }}>Your identity will be completely protected</div>
                    </div>
                    <div onClick={() => update("anonymous", !form.anonymous)} style={{
                      width: "42px", height: "23px", borderRadius: "12px",
                      background: form.anonymous ? accent : "#d1d5db",
                      position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0,
                    }}>
                      <div style={{
                        width: "17px", height: "17px", borderRadius: "50%", background: "#fff",
                        position: "absolute", top: "3px",
                        left: form.anonymous ? "22px" : "3px",
                        transition: "left 0.2s",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                      }} />
                    </div>
                  </div>

                  {!form.anonymous && (
                    <>
                      <SectionTitle accent={accent}>Personal Information</SectionTitle>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                        <Field label="Full Name *" value={form.name} onChange={v => update("name", v)} placeholder="Your full name" />
                        <Field label="Mobile Number *" value={form.mobile} onChange={v => update("mobile", v)} placeholder="+91 XXXXX XXXXX" />
                        <Field label="Email Address" value={form.email} onChange={v => update("email", v)} placeholder="your@email.com" />
                        <Field label="Age" value={form.age} onChange={v => update("age", v)} placeholder="Your age" />
                        <div style={{ gridColumn: "1/-1" }}>
                          <label style={{ color: "#6b7280", fontSize: "12px", fontWeight: "500", display: "block", marginBottom: "6px" }}>Gender</label>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {["Female", "Male", "Non-binary", "Prefer not to say"].map(g => (
                              <button key={g} onClick={() => update("gender", g)} style={{
                                flex: 1, minWidth: "110px", padding: "9px 8px",
                                borderRadius: "8px",
                                border: `1.5px solid ${form.gender === g ? accent : "#e5e7eb"}`,
                                background: form.gender === g ? accentBg : "#f9fafb",
                                color: form.gender === g ? accent : "#374151",
                                fontSize: "12px", fontWeight: "500", cursor: "pointer", transition: "all 0.18s",
                              }}>
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} canNext={canProceed2} accent={accent} />
                </div>
              )}

              {/* ═ STEP 3 ═ */}
              {step === 3 && (
                <div style={{ animation: "fadeUp 0.3s ease" }}>
                  <SectionTitle accent={accent}>Location Details</SectionTitle>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                    <div>
                      <label style={{ color: "#6b7280", fontSize: "12px", fontWeight: "500", display: "block", marginBottom: "5px" }}>State *</label>
                      <select value={form.state} onChange={e => update("state", e.target.value)} style={selectBase}>
                        <option value="">Select State</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <Field label="District" value={form.district} onChange={v => update("district", v)} placeholder="Your district" />
                    <div style={{ gridColumn: "1/-1" }}>
                      <Field label="Village / Town / Locality" value={form.village} onChange={v => update("village", v)} placeholder="Specific area or landmark" />
                    </div>
                  </div>

                  <SectionTitle accent={accent}>
                    {mode === "complaint" ? "Describe the Complaint *" : "Describe the Situation / Need *"}
                  </SectionTitle>
                  <textarea
                    value={form.description}
                    onChange={e => update("description", e.target.value)}
                    placeholder={mode === "complaint"
                      ? "Describe the incident clearly — what happened, when, what action you expect from authorities or NGOs..."
                      : "Describe who needs help, the challenges they face, and what kind of support would make a real difference..."
                    }
                    rows={5}
                    style={{ ...inputBase, resize: "vertical", lineHeight: "1.65", marginBottom: "16px" }}
                  />

                  {/* Consent */}
                  <div
                    onClick={() => update("consent", !form.consent)}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: "12px",
                      padding: "13px 15px", borderRadius: "10px", cursor: "pointer",
                      background: form.consent ? accentBg : "#f9fafb",
                      border: `1.5px solid ${form.consent ? accentBorder : "#e5e7eb"}`,
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{
                      width: "17px", height: "17px", borderRadius: "4px", flexShrink: 0, marginTop: "1px",
                      background: form.consent ? accent : "#fff",
                      border: `2px solid ${form.consent ? accent : "#d1d5db"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                    }}>
                      {form.consent && <span style={{ color: "#fff", fontSize: "10px", fontWeight: "800" }}>✓</span>}
                    </div>
                    <span style={{ color: "#6b7280", fontSize: "12px", lineHeight: "1.6" }}>
                      I confirm the information provided is accurate to the best of my knowledge. I consent to sharing this with relevant NGOs and local authorities for follow-up action. *
                    </span>
                  </div>

                  <NavButtons onBack={() => setStep(2)} onNext={generateMessage} canNext={canProceed3} accent={accent} isLast />
                </div>
              )}

              {/* ═ STEP 4: SUCCESS ═ */}
              {step === 4 && submitted && (
                <div style={{ animation: "fadeUp 0.3s ease" }}>
                  <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <div style={{
                      width: "64px", height: "64px", borderRadius: "50%",
                      background: accentBg, border: `2px solid ${accentBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "28px", margin: "0 auto 14px",
                    }}>
                      {mode === "complaint" ? "🚨" : "✅"}
                    </div>
                    <h3 style={{ color: "#111827", fontSize: "19px", fontWeight: "700", margin: "0 0 6px" }}>
                      {mode === "complaint" ? "Complaint Successfully Registered" : "Help Request Successfully Submitted"}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <span style={{ color: "#9ca3af", fontSize: "13px" }}>Ticket ID:</span>
                      <span style={{
                        color: accent, fontWeight: "700", fontSize: "13px",
                        background: accentBg, border: `1px solid ${accentBorder}`,
                        borderRadius: "6px", padding: "2px 10px",
                      }}>{ticketId}</span>
                    </div>
                  </div>

                  {/* Forwarding panel */}
                  <div style={{
                    background: "#f9fafb", border: "1px solid #e5e7eb",
                    borderRadius: "12px", padding: "14px 16px", marginBottom: "20px",
                  }}>
                    <div style={{ color: "#9ca3af", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                      Will be forwarded to
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {(mode === "complaint"
                        ? ["Relevant NGOs", "District Magistrate", "Child Welfare Committee", "State Women Commission", "Local Police (if critical)"]
                        : ["Relevant NGOs", "District Authority", "State Social Welfare Dept", "Community Mobilisers", "Voluntary Organisations"]
                      ).map(a => (
                        <div key={a} style={{
                          background: accentBg, border: `1px solid ${accentBorder}`,
                          borderRadius: "100px", padding: "3px 12px",
                          color: accent, fontSize: "11px", fontWeight: "500",
                        }}>{a}</div>
                      ))}
                    </div>
                  </div>

                  {/* Generated message */}
                  <SectionTitle accent={accent}>Generated Report Message</SectionTitle>
                  <div style={{
                    background: "#f9fafb", border: "1px solid #e5e7eb",
                    borderRadius: "10px", padding: "14px 16px",
                    fontFamily: "'Courier New', monospace", fontSize: "11px",
                    color: "#374151", whiteSpace: "pre-wrap",
                    lineHeight: "1.75", maxHeight: "280px", overflowY: "auto",
                    marginBottom: "16px",
                  }}>
                    {generatedMessage}
                  </div>

                  {/* WhatsApp NGO Routing */}
                  <div style={{
                    background: whatsappSent ? "#f0fdf4" : "#fff",
                    border: `1px solid ${whatsappSent ? "#bbf7d0" : "#e5e7eb"}`,
                    borderRadius: "12px", padding: "14px 16px", marginBottom: "16px",
                    transition: "all 0.3s",
                  }}>
                    <div style={{ color: "#9ca3af", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
                      📲 Send Report to Matching NGOs via WhatsApp
                    </div>
                    {!whatsappSent ? (
                      <>
                        <p style={{ color: "#6b7280", fontSize: "12px", margin: "0 0 10px", lineHeight: "1.6" }}>
                          This will open WhatsApp for each NGO that matches your selected categories and send them this report.
                        </p>
                        <button
                          onClick={() => sendToWhatsApp(generatedMessage)}
                          style={{
                            width: "100%", padding: "11px", borderRadius: "8px", border: "none",
                            background: "#25D366", color: "#fff",
                            fontSize: "13px", fontWeight: "700", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                          }}>
                          <span style={{ fontSize: "16px" }}>💬</span> Send to Matching NGOs via WhatsApp
                        </button>
                      </>
                    ) : (
                      <>
                        <div style={{ color: "#059669", fontWeight: "700", fontSize: "13px", marginBottom: "8px" }}>
                          ✅ Sent to {matchedNGOs.length} NGO{matchedNGOs.length !== 1 ? "s" : ""}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", maxHeight: "120px", overflowY: "auto" }}>
                          {matchedNGOs.map(ngo => (
                            <div key={ngo.phone} style={{
                              background: "#dcfce7", border: "1px solid #bbf7d0",
                              borderRadius: "100px", padding: "3px 10px",
                              color: "#059669", fontSize: "11px", fontWeight: "500",
                            }}>
                              {ngo.name} <span style={{ opacity: 0.6 }}>({ngo.domain})</span>
                            </div>
                          ))}
                        </div>
                        <p style={{ color: "#9ca3af", fontSize: "11px", margin: "8px 0 0", lineHeight: "1.5" }}>
                          WhatsApp tabs have opened for each NGO. If any were blocked by your browser, allow popups and try again.
                        </p>
                      </>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(generatedMessage);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      style={{
                        flex: 1, padding: "11px", borderRadius: "8px",
                        border: `1.5px solid ${accentBorder}`, background: accentBg,
                        color: accent, fontSize: "13px", fontWeight: "600", cursor: "pointer",
                      }}>
                      {copied ? "✓ Copied!" : "📋 Copy Message"}
                    </button>
                    <button onClick={close} style={{
                      flex: 1, padding: "11px", borderRadius: "8px", border: "none",
                      background: accent, color: "#fff",
                      fontSize: "13px", fontWeight: "700", cursor: "pointer",
                    }}>
                      Done ✓
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}