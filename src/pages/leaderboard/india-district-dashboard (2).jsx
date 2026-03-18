import { useState, useMemo, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PieChart, Pie, Legend, CartesianGrid } from "recharts";

const RAW = [{ "district": "Mahe", "state": "Puducherry", "sex_ratio": 1184.0, "literacy": 97.87, "growth": 13.54, "score": 98.42 }, { "district": "Champhai", "state": "Mizoram", "sex_ratio": 984.0, "literacy": 95.91, "growth": 16.01, "score": 97.22 }, { "district": "Malappuram", "state": "Kerala", "sex_ratio": 1098.0, "literacy": 93.57, "growth": 13.45, "score": 96.65 }, { "district": "Serchhip", "state": "Mizoram", "sex_ratio": 977.0, "literacy": 97.91, "growth": 20.56, "score": 95.46 }, { "district": "Aizawl", "state": "Mizoram", "sex_ratio": 1009.0, "literacy": 97.89, "growth": 22.92, "score": 95.2 }, { "district": "Kanniyakumari", "state": "Tamil Nadu", "sex_ratio": 1019.0, "literacy": 91.75, "growth": 11.6, "score": 95.0 }, { "district": "Kozhikode", "state": "Kerala", "sex_ratio": 1098.0, "literacy": 95.08, "growth": 7.2, "score": 94.13 }, { "district": "Ernakulam", "state": "Kerala", "sex_ratio": 1027.0, "literacy": 95.89, "growth": 5.69, "score": 93.7 }, { "district": "Karaikal", "state": "Puducherry", "sex_ratio": 1047.0, "literacy": 87.05, "growth": 17.23, "score": 93.7 }, { "district": "Imphal West", "state": "Manipur", "sex_ratio": 1031.0, "literacy": 86.08, "growth": 16.56, "score": 93.65 }, { "district": "Nagpur", "state": "Maharashtra", "sex_ratio": 951.0, "literacy": 88.39, "growth": 14.4, "score": 93.1 }, { "district": "Kangra", "state": "Himachal Pradesh", "sex_ratio": 1012.0, "literacy": 85.67, "growth": 12.77, "score": 93.15 }, { "district": "Una", "state": "Himachal Pradesh", "sex_ratio": 976.0, "literacy": 86.53, "growth": 16.26, "score": 93.02 }, { "district": "Thrissur", "state": "Kerala", "sex_ratio": 1108.0, "literacy": 95.08, "growth": 4.94, "score": 93.0 }, { "district": "Dakshina Kannada", "state": "Karnataka", "sex_ratio": 1020.0, "literacy": 88.57, "growth": 10.11, "score": 92.98 }, { "district": "Kannur", "state": "Kerala", "sex_ratio": 1136.0, "literacy": 95.1, "growth": 4.73, "score": 92.9 }, { "district": "Hamirpur", "state": "Himachal Pradesh", "sex_ratio": 1095.0, "literacy": 88.15, "growth": 10.19, "score": 92.86 }, { "district": "Kasaragod", "state": "Kerala", "sex_ratio": 1080.0, "literacy": 90.09, "growth": 8.58, "score": 92.83 }, { "district": "West Tripura", "state": "Tripura", "sex_ratio": 962.0, "literacy": 88.69, "growth": 12.57, "score": 92.74 }, { "district": "Thoothukkudi", "state": "Tamil Nadu", "sex_ratio": 1023.0, "literacy": 86.16, "growth": 11.32, "score": 92.62 }, { "district": "Imphal East", "state": "Manipur", "sex_ratio": 1017.0, "literacy": 81.95, "growth": 15.51, "score": 92.53 }, { "district": "North Tripura", "state": "Tripura", "sex_ratio": 967.0, "literacy": 87.5, "growth": 17.44, "score": 92.46 }, { "district": "Purba Medinipur", "state": "West Bengal", "sex_ratio": 938.0, "literacy": 87.02, "growth": 15.36, "score": 92.15 }, { "district": "Tiruchirappalli", "state": "Tamil Nadu", "sex_ratio": 1013.0, "literacy": 83.23, "growth": 12.57, "score": 92.08 }, { "district": "Lunglei", "state": "Mizoram", "sex_ratio": 947.0, "literacy": 88.86, "growth": 17.64, "score": 92.1 }, { "district": "Tirunelveli", "state": "Tamil Nadu", "sex_ratio": 1023.0, "literacy": 82.5, "growth": 12.97, "score": 91.98 }, { "district": "Kottayam", "state": "Kerala", "sex_ratio": 1039.0, "literacy": 97.21, "growth": 1.07, "score": 91.92 }, { "district": "Palakkad", "state": "Kerala", "sex_ratio": 1067.0, "literacy": 89.31, "growth": 7.35, "score": 91.9 }, { "district": "Coimbatore", "state": "Tamil Nadu", "sex_ratio": 1000.0, "literacy": 83.98, "growth": 18.56, "score": 91.81 }, { "district": "Bilaspur", "state": "Himachal Pradesh", "sex_ratio": 981.0, "literacy": 84.59, "growth": 12.05, "score": 91.6 }, { "district": "Madurai", "state": "Tamil Nadu", "sex_ratio": 990.0, "literacy": 83.45, "growth": 17.84, "score": 91.56 }, { "district": "South Tripura", "state": "Tripura", "sex_ratio": 957.0, "literacy": 84.66, "growth": 14.15, "score": 91.72 }, { "district": "Gondiya", "state": "Maharashtra", "sex_ratio": 999.0, "literacy": 84.95, "growth": 10.14, "score": 91.51 }, { "district": "Sivaganga", "state": "Tamil Nadu", "sex_ratio": 1003.0, "literacy": 79.85, "growth": 15.9, "score": 91.49 }, { "district": "Akola", "state": "Maharashtra", "sex_ratio": 946.0, "literacy": 88.05, "growth": 11.27, "score": 91.19 }, { "district": "Kollam", "state": "Kerala", "sex_ratio": 1113.0, "literacy": 94.09, "growth": 1.94, "score": 91.11 }, { "district": "Ramanathapuram", "state": "Tamil Nadu", "sex_ratio": 983.0, "literacy": 80.72, "growth": 13.96, "score": 91.09 }, { "district": "Amravati", "state": "Maharashtra", "sex_ratio": 951.0, "literacy": 87.38, "growth": 10.79, "score": 90.89 }, { "district": "Dharwad", "state": "Karnataka", "sex_ratio": 971.0, "literacy": 80.0, "growth": 15.13, "score": 90.78 }, { "district": "Vellore", "state": "Tamil Nadu", "sex_ratio": 1007.0, "literacy": 79.17, "growth": 13.2, "score": 90.77 }, { "district": "North Goa", "state": "Goa", "sex_ratio": 963.0, "literacy": 89.57, "growth": 7.84, "score": 90.77 }, { "district": "Thiruvananthapuram", "state": "Kerala", "sex_ratio": 1087.0, "literacy": 93.02, "growth": 2.07, "score": 90.74 }, { "district": "Darjiling", "state": "West Bengal", "sex_ratio": 970.0, "literacy": 79.56, "growth": 14.77, "score": 90.51 }, { "district": "Wayanad", "state": "Kerala", "sex_ratio": 1035.0, "literacy": 89.03, "growth": 4.71, "score": 90.47 }, { "district": "Dhamtari", "state": "Chhattisgarh", "sex_ratio": 1010.0, "literacy": 78.36, "growth": 13.19, "score": 90.44 }, { "district": "Chennai", "state": "Tamil Nadu", "sex_ratio": 989.0, "literacy": 90.18, "growth": 6.98, "score": 91.62 }, { "district": "Champawat", "state": "Uttarakhand", "sex_ratio": 980.0, "literacy": 79.83, "growth": 15.63, "score": 90.82 }, { "district": "Haora", "state": "West Bengal", "sex_ratio": 939.0, "literacy": 83.31, "growth": 13.5, "score": 90.13 }, { "district": "Yavatmal", "state": "Maharashtra", "sex_ratio": 952.0, "literacy": 82.82, "growth": 12.78, "score": 90.1 }, { "district": "North Twenty Four Parganas", "state": "West Bengal", "sex_ratio": 955.0, "literacy": 84.06, "growth": 12.04, "score": 90.34 }, { "district": "Cuttack", "state": "Orissa", "sex_ratio": 940.0, "literacy": 85.5, "growth": 12.1, "score": 90.35 }, { "district": "Kendrapara", "state": "Orissa", "sex_ratio": 1007.0, "literacy": 85.15, "growth": 10.63, "score": 91.88 }, { "district": "Bhadrak", "state": "Orissa", "sex_ratio": 981.0, "literacy": 82.78, "growth": 12.94, "score": 91.32 }, { "district": "Puri", "state": "Orissa", "sex_ratio": 963.0, "literacy": 84.67, "growth": 13.05, "score": 91.41 }, { "district": "Kamrup Metropolitan", "state": "Assam", "sex_ratio": 936.0, "literacy": 88.71, "growth": 18.34, "score": 91.25 }, { "district": "South Goa", "state": "Goa", "sex_ratio": 986.0, "literacy": 87.59, "growth": 8.73, "score": 91.34 }, { "district": "Mandi", "state": "Himachal Pradesh", "sex_ratio": 1007.0, "literacy": 81.53, "growth": 10.92, "score": 90.57 }, { "district": "East Delhi", "state": "Delhi", "sex_ratio": 884.0, "literacy": 89.31, "growth": 16.79, "score": 90.19 }, { "district": "Cuddalore", "state": "Tamil Nadu", "sex_ratio": 987.0, "literacy": 78.04, "growth": 14.02, "score": 90.21 }, { "district": "Lakshadweep", "state": "Lakshadweep", "sex_ratio": 946.0, "literacy": 91.85, "growth": 6.3, "score": 90.23 }, { "district": "Virudhunagar", "state": "Tamil Nadu", "sex_ratio": 1007.0, "literacy": 80.15, "growth": 10.91, "score": 90.02 }, { "district": "Baleshwar", "state": "Orissa", "sex_ratio": 957.0, "literacy": 79.79, "growth": 14.62, "score": 90.01 }, { "district": "Theni", "state": "Tamil Nadu", "sex_ratio": 991.0, "literacy": 77.26, "growth": 13.89, "score": 89.99 }, { "district": "Kheda", "state": "Gujarat", "sex_ratio": 940.0, "literacy": 82.65, "growth": 13.62, "score": 89.97 }, { "district": "Thanjavur", "state": "Tamil Nadu", "sex_ratio": 1035.0, "literacy": 82.64, "growth": 8.56, "score": 89.84 }, { "district": "Bishnupur", "state": "Manipur", "sex_ratio": 999.0, "literacy": 75.85, "growth": 13.93, "score": 89.77 }, { "district": "Thiruvarur", "state": "Tamil Nadu", "sex_ratio": 1017.0, "literacy": 82.86, "growth": 8.11, "score": 89.7 }, { "district": "Pathanamthitta", "state": "Kerala", "sex_ratio": 1132.0, "literacy": 96.55, "growth": -2.97, "score": 89.64 }, { "district": "Jagatsinghapur", "state": "Orissa", "sex_ratio": 968.0, "literacy": 86.59, "growth": 7.5, "score": 89.61 }, { "district": "Anand", "state": "Gujarat", "sex_ratio": 925.0, "literacy": 84.37, "growth": 12.7, "score": 89.6 }, { "district": "Buldana", "state": "Maharashtra", "sex_ratio": 934.0, "literacy": 83.4, "growth": 15.85, "score": 90.3 }, { "district": "Jabalpur", "state": "Madhya Pradesh", "sex_ratio": 929.0, "literacy": 81.07, "growth": 14.51, "score": 89.34 }, { "district": "Washim", "state": "Maharashtra", "sex_ratio": 930.0, "literacy": 83.25, "growth": 17.34, "score": 89.33 }, { "district": "Paschim Medinipur", "state": "West Bengal", "sex_ratio": 966.0, "literacy": 78.0, "growth": 13.86, "score": 89.27 }, { "district": "Perambalur", "state": "Tamil Nadu", "sex_ratio": 1003.0, "literacy": 74.32, "growth": 14.5, "score": 89.48 }, { "district": "Kolasib", "state": "Mizoram", "sex_ratio": 956.0, "literacy": 93.5, "growth": 27.28, "score": 89.5 }, { "district": "Raigarh", "state": "Maharashtra", "sex_ratio": 959.0, "literacy": 83.14, "growth": 19.31, "score": 89.46 }, { "district": "Namakkal", "state": "Tamil Nadu", "sex_ratio": 986.0, "literacy": 74.63, "growth": 15.61, "score": 88.99 }, { "district": "East Khasi Hills", "state": "Meghalaya", "sex_ratio": 1011.0, "literacy": 84.15, "growth": 24.96, "score": 88.68 }, { "district": "Bharuch", "state": "Gujarat", "sex_ratio": 925.0, "literacy": 81.51, "growth": 13.16, "score": 88.68 }, { "district": "Vadodara", "state": "Gujarat", "sex_ratio": 934.0, "literacy": 78.92, "growth": 14.38, "score": 88.62 }, { "district": "Satara", "state": "Maharashtra", "sex_ratio": 988.0, "literacy": 82.87, "growth": 6.93, "score": 88.63 }, { "district": "Jaunpur", "state": "Uttar Pradesh", "sex_ratio": 1024.0, "literacy": 71.55, "growth": 14.89, "score": 88.56 }, { "district": "Idukki", "state": "Kerala", "sex_ratio": 1006.0, "literacy": 91.99, "growth": -1.79, "score": 88.4 }, { "district": "Golaghat", "state": "Assam", "sex_ratio": 964.0, "literacy": 77.43, "growth": 12.75, "score": 88.41 }, { "district": "Jorhat", "state": "Assam", "sex_ratio": 962.0, "literacy": 82.15, "growth": 9.31, "score": 88.5 }, { "district": "Lakhimpur", "state": "Assam", "sex_ratio": 968.0, "literacy": 77.2, "growth": 17.22, "score": 88.49 }, { "district": "Chamoli", "state": "Uttarakhand", "sex_ratio": 1019.0, "literacy": 82.65, "growth": 5.74, "score": 88.43 }, { "district": "Tiruvannamalai", "state": "Tamil Nadu", "sex_ratio": 994.0, "literacy": 74.21, "growth": 12.75, "score": 88.32 }, { "district": "Kolhapur", "state": "Maharashtra", "sex_ratio": 957.0, "literacy": 81.51, "growth": 10.01, "score": 88.39 }, { "district": "Hugli", "state": "West Bengal", "sex_ratio": 961.0, "literacy": 81.8, "growth": 9.46, "score": 88.39 }, { "district": "Sangli", "state": "Maharashtra", "sex_ratio": 966.0, "literacy": 81.48, "growth": 9.24, "score": 88.35 }, { "district": "Navsari", "state": "Gujarat", "sex_ratio": 961.0, "literacy": 83.88, "growth": 8.15, "score": 88.57 }, { "district": "Jalgaon", "state": "Maharashtra", "sex_ratio": 925.0, "literacy": 78.2, "growth": 14.86, "score": 88.21 }, { "district": "Bhandara", "state": "Maharashtra", "sex_ratio": 982.0, "literacy": 83.76, "growth": 5.65, "score": 88.11 }, { "district": "Deoria", "state": "Uttar Pradesh", "sex_ratio": 1017.0, "literacy": 71.13, "growth": 14.31, "score": 88.11 }, { "district": "Rajnandgaon", "state": "Chhattisgarh", "sex_ratio": 1015.0, "literacy": 75.96, "growth": 19.79, "score": 87.99 }, { "district": "Ahmadnagar", "state": "Maharashtra", "sex_ratio": 939.0, "literacy": 79.05, "growth": 12.44, "score": 87.9 }, { "district": "Sirmaur", "state": "Himachal Pradesh", "sex_ratio": 918.0, "literacy": 78.8, "growth": 15.54, "score": 87.97 }, { "district": "Jalandhar", "state": "Punjab", "sex_ratio": 915.0, "literacy": 82.48, "growth": 11.76, "score": 87.97 }, { "district": "Mysore", "state": "Karnataka", "sex_ratio": 985.0, "literacy": 72.79, "growth": 13.63, "score": 87.83 }, { "district": "Wardha", "state": "Maharashtra", "sex_ratio": 946.0, "literacy": 86.99, "growth": 5.18, "score": 87.73 }, { "district": "Kamrup", "state": "Assam", "sex_ratio": 949.0, "literacy": 75.55, "growth": 15.69, "score": 87.84 }, { "district": "Purbi Singhbhum", "state": "Jharkhand", "sex_ratio": 949.0, "literacy": 75.49, "growth": 15.68, "score": 87.82 }, { "district": "Ludhiana", "state": "Punjab", "sex_ratio": 873.0, "literacy": 82.2, "growth": 15.36, "score": 87.62 }, { "district": "Belgaum", "state": "Karnataka", "sex_ratio": 973.0, "literacy": 73.48, "growth": 13.41, "score": 87.52 }, { "district": "Sabarkantha", "state": "Gujarat", "sex_ratio": 952.0, "literacy": 75.79, "growth": 16.62, "score": 87.59 }, { "district": "Cachar", "state": "Assam", "sex_ratio": 959.0, "literacy": 79.34, "growth": 20.19, "score": 87.5 }, { "district": "South Sikkim", "state": "Sikkim", "sex_ratio": 915.0, "literacy": 81.42, "growth": 11.65, "score": 87.49 }, { "district": "East Siang", "state": "Arunachal Pradesh", "sex_ratio": 980.0, "literacy": 72.54, "growth": 13.52, "score": 87.48 }, { "district": "Jammu", "state": "Jammu and Kashmir", "sex_ratio": 880.0, "literacy": 83.45, "growth": 12.74, "score": 87.45 }, { "district": "Raigarh", "state": "Chhattisgarh", "sex_ratio": 991.0, "literacy": 73.26, "growth": 18.05, "score": 87.42 }, { "district": "Sivasagar", "state": "Assam", "sex_ratio": 954.0, "literacy": 80.41, "growth": 9.44, "score": 87.54 }, { "district": "Azamgarh", "state": "Uttar Pradesh", "sex_ratio": 1019.0, "literacy": 70.93, "growth": 17.11, "score": 87.32 }, { "district": "Viluppuram", "state": "Tamil Nadu", "sex_ratio": 987.0, "literacy": 71.88, "growth": 16.84, "score": 87.31 }, { "district": "West Delhi", "state": "Delhi", "sex_ratio": 875.0, "literacy": 86.98, "growth": 19.46, "score": 87.56 }, { "district": "Mumbai Suburban", "state": "Maharashtra", "sex_ratio": 860.0, "literacy": 89.91, "growth": 8.29, "score": 87.01 }, { "district": "South Twenty Four Parganas", "state": "West Bengal", "sex_ratio": 956.0, "literacy": 77.51, "growth": 18.17, "score": 87.66 }, { "district": "Barddhaman", "state": "West Bengal", "sex_ratio": 945.0, "literacy": 76.21, "growth": 11.92, "score": 86.74 }, { "district": "Nashik", "state": "Maharashtra", "sex_ratio": 934.0, "literacy": 82.31, "growth": 22.3, "score": 86.63 }, { "district": "Solapur", "state": "Maharashtra", "sex_ratio": 938.0, "literacy": 77.02, "growth": 12.16, "score": 86.91 }, { "district": "Nanded", "state": "Maharashtra", "sex_ratio": 943.0, "literacy": 75.45, "growth": 16.86, "score": 86.97 }, { "district": "Junagadh", "state": "Gujarat", "sex_ratio": 953.0, "literacy": 75.8, "growth": 12.05, "score": 86.97 }, { "district": "Rajkot", "state": "Gujarat", "sex_ratio": 927.0, "literacy": 80.96, "growth": 20.02, "score": 86.95 }, { "district": "Koch Bihar", "state": "West Bengal", "sex_ratio": 942.0, "literacy": 74.78, "growth": 13.71, "score": 86.95 }, { "district": "Nayagarh", "state": "Orissa", "sex_ratio": 915.0, "literacy": 80.42, "growth": 11.37, "score": 86.95 }, { "district": "Haveri", "state": "Karnataka", "sex_ratio": 950.0, "literacy": 77.4, "growth": 11.02, "score": 86.97 }, { "district": "Bagalkot", "state": "Karnataka", "sex_ratio": 989.0, "literacy": 68.82, "growth": 14.4, "score": 86.79 }, { "district": "Kolar", "state": "Karnataka", "sex_ratio": 979.0, "literacy": 74.39, "growth": 10.77, "score": 86.8 }, { "district": "Gadag", "state": "Karnataka", "sex_ratio": 982.0, "literacy": 75.12, "growth": 9.54, "score": 86.6 }, { "district": "Osmanabad", "state": "Maharashtra", "sex_ratio": 924.0, "literacy": 78.44, "growth": 11.5, "score": 86.59 }, { "district": "Narsimhapur", "state": "Madhya Pradesh", "sex_ratio": 920.0, "literacy": 75.69, "growth": 14.01, "score": 86.58 }, { "district": "Ujjain", "state": "Madhya Pradesh", "sex_ratio": 955.0, "literacy": 72.34, "growth": 16.12, "score": 86.58 }, { "district": "Birbhum", "state": "West Bengal", "sex_ratio": 956.0, "literacy": 70.68, "growth": 16.15, "score": 85.94 }, { "district": "Ganjam", "state": "Orissa", "sex_ratio": 983.0, "literacy": 71.09, "growth": 11.66, "score": 86.09 }, { "district": "Chandrapur", "state": "Maharashtra", "sex_ratio": 961.0, "literacy": 80.01, "growth": 6.43, "score": 86.16 }, { "district": "Ambedkar Nagar", "state": "Uttar Pradesh", "sex_ratio": 978.0, "literacy": 72.23, "growth": 18.3, "score": 86.36 }, { "district": "South Delhi", "state": "Delhi", "sex_ratio": 862.0, "literacy": 86.57, "growth": 20.51, "score": 86.35 }, { "district": "Dakshin Dinajpur", "state": "West Bengal", "sex_ratio": 956.0, "literacy": 72.82, "growth": 11.52, "score": 85.63 }, { "district": "Bidar", "state": "Karnataka", "sex_ratio": 956.0, "literacy": 70.51, "growth": 13.37, "score": 85.63 }, { "district": "Sikar", "state": "Rajasthan", "sex_ratio": 947.0, "literacy": 71.91, "growth": 17.03, "score": 85.63 }, { "district": "Bankura", "state": "West Bengal", "sex_ratio": 957.0, "literacy": 70.26, "growth": 12.65, "score": 85.21 }, { "district": "Chitradurga", "state": "Karnataka", "sex_ratio": 974.0, "literacy": 73.71, "growth": 9.33, "score": 85.61 }, { "district": "Ahmadabad", "state": "Gujarat", "sex_ratio": 904.0, "literacy": 85.31, "growth": 24.03, "score": 85.77 }, { "district": "Gorakhpur", "state": "Uttar Pradesh", "sex_ratio": 950.0, "literacy": 70.83, "growth": 17.81, "score": 84.93 }, { "district": "Pune", "state": "Maharashtra", "sex_ratio": 915.0, "literacy": 86.15, "growth": 30.37, "score": 83.38 }, { "district": "Patna", "state": "Bihar", "sex_ratio": 897.0, "literacy": 70.68, "growth": 23.73, "score": 79.79 }, { "district": "Lucknow", "state": "Uttar Pradesh", "sex_ratio": 917.0, "literacy": 77.29, "growth": 25.82, "score": 82.19 }, { "district": "Ranchi", "state": "Jharkhand", "sex_ratio": 949.0, "literacy": 76.06, "growth": 23.98, "score": 83.89 }, { "district": "Durg", "state": "Chhattisgarh", "sex_ratio": 988.0, "literacy": 79.06, "growth": 18.98, "score": 89.15 }, { "district": "Raipur", "state": "Chhattisgarh", "sex_ratio": 984.0, "literacy": 75.56, "growth": 34.7, "score": 79.73 }, { "district": "Jaipur", "state": "Rajasthan", "sex_ratio": 910.0, "literacy": 75.51, "growth": 26.19, "score": 81.01 }, { "district": "Thane", "state": "Maharashtra", "sex_ratio": 886.0, "literacy": 84.53, "growth": 36.01, "score": 78.75 }, { "district": "Bangalore", "state": "Karnataka", "sex_ratio": 916.0, "literacy": 87.67, "growth": 47.18, "score": 75.62 }, { "district": "Surat", "state": "Gujarat", "sex_ratio": 787.0, "literacy": 85.53, "growth": 42.24, "score": 72.07 }, { "district": "Allahabad", "state": "Uttar Pradesh", "sex_ratio": 901.0, "literacy": 72.32, "growth": 20.63, "score": 82.15 }, { "district": "Rangareddy", "state": "Andhra Pradesh", "sex_ratio": 961.0, "literacy": 75.87, "growth": 48.16, "score": 72.21 }, { "district": "Purbi Champaran", "state": "Bihar", "sex_ratio": 902.0, "literacy": 55.79, "growth": 29.43, "score": 71.18 }, { "district": "Muzaffarpur", "state": "Bihar", "sex_ratio": 900.0, "literacy": 63.43, "growth": 28.14, "score": 74.8 }, { "district": "Moradabad", "state": "Uttar Pradesh", "sex_ratio": 906.0, "literacy": 56.77, "growth": 25.22, "score": 73.84 }, { "district": "Ghaziabad", "state": "Uttar Pradesh", "sex_ratio": 881.0, "literacy": 78.07, "growth": 42.27, "score": 72.83 }, { "district": "Gaya", "state": "Bihar", "sex_ratio": 937.0, "literacy": 63.67, "growth": 26.43, "score": 77.23 }, { "district": "Sitapur", "state": "Uttar Pradesh", "sex_ratio": 888.0, "literacy": 61.12, "growth": 23.88, "score": 75.53 }, { "district": "Bareilly", "state": "Uttar Pradesh", "sex_ratio": 887.0, "literacy": 58.49, "growth": 22.93, "score": 74.91 }, { "district": "Purnia", "state": "Bihar", "sex_ratio": 921.0, "literacy": 51.08, "growth": 28.33, "score": 70.61 }, { "district": "Katihar", "state": "Bihar", "sex_ratio": 919.0, "literacy": 52.24, "growth": 28.35, "score": 70.98 }, { "district": "Sitamarhi", "state": "Bihar", "sex_ratio": 899.0, "literacy": 52.05, "growth": 27.62, "score": 70.47 }, { "district": "Barmer", "state": "Rajasthan", "sex_ratio": 902.0, "literacy": 56.53, "growth": 32.52, "score": 69.93 }, { "district": "Bikaner", "state": "Rajasthan", "sex_ratio": 905.0, "literacy": 65.13, "growth": 41.19, "score": 69.16 }, { "district": "Gurgaon", "state": "Haryana", "sex_ratio": 854.0, "literacy": 84.7, "growth": 73.96, "score": 68.04 }, { "district": "Bahraich", "state": "Uttar Pradesh", "sex_ratio": 892.0, "literacy": 49.36, "growth": 46.48, "score": 59.68 }, { "district": "Daman", "state": "Daman and Diu", "sex_ratio": 534.0, "literacy": 88.07, "growth": 67.71, "score": 56.59 }, { "district": "Dadra and Nagar Haveli", "state": "Dadra and Nagar Haveli", "sex_ratio": 774.0, "literacy": 76.24, "growth": 55.88, "score": 61.46 }, { "district": "Mon", "state": "Nagaland", "sex_ratio": 899.0, "literacy": 56.99, "growth": 80.36, "score": 58.76 }, { "district": "Senapati", "state": "Manipur", "sex_ratio": 937.0, "literacy": 63.6, "growth": 68.94, "score": 62.92 }, { "district": "Mewat", "state": "Haryana", "sex_ratio": 907.0, "literacy": 54.08, "growth": 37.93, "score": 66.45 }, { "district": "Jaisalmer", "state": "Rajasthan", "sex_ratio": 852.0, "literacy": 57.22, "growth": 31.81, "score": 68.56 }, { "district": "Kupwara", "state": "Jammu and Kashmir", "sex_ratio": 835.0, "literacy": 64.51, "growth": 33.82, "score": 69.79 }, { "district": "Lawngtlai", "state": "Mizoram", "sex_ratio": 945.0, "literacy": 65.88, "growth": 60.14, "score": 64.15 }, { "district": "Tawang", "state": "Arunachal Pradesh", "sex_ratio": 714.0, "literacy": 59.0, "growth": 28.4, "score": 65.46 }, { "district": "Kurung Kumey", "state": "Arunachal Pradesh", "sex_ratio": 1032.0, "literacy": 48.75, "growth": 116.56, "score": 59.5 }];

const UNIQUE = RAW.filter((v, i, a) => a.findIndex(x => x.district === v.district && x.state === v.state) === i);
const ALL_STATES = ["All States", ...[...new Set(UNIQUE.map(d => d.state))].sort()];
const DANGER = 75;

// ── Color theme ─────────────────────────────────────────────────────────────
const C = {
  primary: "#2563EB",
  primaryLight: "#DBEAFE",
  secondary: "#7C3AED",
  accent: "#F59E0B",
  success: "#059669",
  danger: "#DC2626",
  warning: "#D97706",
  bg: "#F0F4FF",
  bgCard: "#FFFFFF",
  bgHero: "linear-gradient(135deg,#1e40af 0%,#2563eb 40%,#7c3aed 100%)",
  gold: "#F59E0B",
  silver: "#94A3B8",
  bronze: "#CD7F32",
  text: "#0F172A",
  textMuted: "#64748B",
  border: "#E2E8F0",
};

const SCHEMES = [
  { n: "Beti Bachao Beti Padhao", focus: "sex_ratio", pts: "+8", d: "Child sex ratio & girl education", ic: "👧", c: "#EC4899" },
  { n: "Sukanya Samriddhi Yojana", focus: "sex_ratio", pts: "+5", d: "Savings scheme for girl children", ic: "💰", c: "#F43F5E" },
  { n: "Samagra Shiksha Abhiyan", focus: "literacy", pts: "+10", d: "Holistic school education pre-school to Cl.12", ic: "🎒", c: "#2563EB" },
  { n: "PM Kaushal Vikas Yojana", focus: "literacy", pts: "+7", d: "Skill development training for youth", ic: "🛠️", c: "#7C3AED" },
  { n: "National Literacy Mission", focus: "literacy", pts: "+6", d: "Adult literacy for rural populations", ic: "📖", c: "#0891B2" },
  { n: "ASHA Worker Network", focus: "sex_ratio", pts: "+4", d: "Community health workers maternal care", ic: "💊", c: "#059669" },
  { n: "Kasturba Gandhi Vidyalaya", focus: "literacy", pts: "+8", d: "Residential schools for disadvantaged girls", ic: "🏫", c: "#F59E0B" },
  { n: "Mid-Day Meal Scheme", focus: "literacy", pts: "+3", d: "Nutrition support → school attendance", ic: "🍱", c: "#84CC16" },
  { n: "Gender Champions NGO", focus: "sex_ratio", pts: "+5", d: "NGO for grassroots gender equality", ic: "🤝", c: "#A855F7" },
  { n: "Digital Literacy Mission", focus: "literacy", pts: "+6", d: "Digital skills for adults & rural women", ic: "💻", c: "#0EA5E9" },
];

const REWARDS = [
  { rank: 1, title: "Presidential Excellence Award", prize: "₹50 Lakh + Gold Medal", perk: "Free central schemes 2 years", badge: "🥇", glow: "#F59E0B", bg: "linear-gradient(135deg,#FFFBEB,#FEF3C7,#FDE68A)", border: "#F59E0B", tc: "#78350F", ringColor: "rgba(245,158,11,0.5)" },
  { rank: 2, title: "National Development Award", prize: "₹25 Lakh + Silver Medal", perk: "Priority infra budget allocation", badge: "🥈", glow: "#94A3B8", bg: "linear-gradient(135deg,#F8FAFC,#F1F5F9,#E2E8F0)", border: "#94A3B8", tc: "#334155", ringColor: "rgba(148,163,184,0.5)" },
  { rank: 3, title: "State Achiever Award", prize: "₹10 Lakh + Bronze Medal", perk: "NGO partnership facilitation", badge: "🥉", glow: "#CD7F32", bg: "linear-gradient(135deg,#FFF7ED,#FFEDD5,#FED7AA)", border: "#CD7F32", tc: "#7C2D12", ringColor: "rgba(205,127,50,0.5)" },
];

const EMOJIS = ["👨‍💼", "👩‍💼", "🧑‍💼", "👨‍🏫", "👩‍🏫", "🧑‍🔬", "👨‍⚕️", "👩‍⚕️", "🧑‍💻", "👨‍🎓", "👩‍🎓", "🧑‍🌾", "👮", "👩‍🚒", "🎓"];
const em = n => EMOJIS[n.charCodeAt(0) % EMOJIS.length];
const avg = (arr, k) => arr.length ? (arr.reduce((s, d) => s + d[k], 0) / arr.length).toFixed(1) : "—";

// ── Confetti ────────────────────────────────────────────────────────────────
function Confetti({ active, fullPage = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const cv = ref.current, ctx = cv.getContext("2d");
    cv.width = cv.offsetWidth; cv.height = cv.offsetHeight;
    const W = cv.width, H = cv.height;
    const pal = ["#F59E0B", "#2563EB", "#EF4444", "#059669", "#7C3AED", "#06B6D4", "#F43F5E", "#84CC16", "#EC4899", "#FFFFFF", "#FBBF24", "#34D399", "#FB923C", "#FDE68A", "#C4B5FD"];
    const pieces = Array.from({ length: fullPage ? 300 : 200 }, () => ({
      x: Math.random() * W,
      y: fullPage ? -80 - Math.random() * 200 : -50 - Math.random() * 150,
      w: 6 + Math.random() * 10, h: 3 + Math.random() * 7,
      col: pal[Math.floor(Math.random() * pal.length)],
      vx: -4 + Math.random() * 8, vy: 2 + Math.random() * 5,
      rot: Math.random() * 360, rv: -6 + Math.random() * 12,
      alpha: 1, shape: Math.random() > 0.5 ? "circle" : "rect",
    }));
    let raf, t0 = Date.now();
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const el = Date.now() - t0;
      pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.rv;
        if (el > 1500) p.alpha = Math.max(0, p.alpha - 0.015);
        ctx.save(); ctx.globalAlpha = p.alpha;
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.fillStyle = p.col;
        if (p.shape === "circle") { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.beginPath(); try { ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2); } catch { ctx.rect(-p.w / 2, -p.h / 2, p.w, p.h); } ctx.fill(); }
        ctx.restore();
      });
      if (el < 2800) raf = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, W, H);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active, fullPage]);
  return (
    <canvas ref={ref} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 50
    }} />
  );
}

// ── Top3 Rewards Showcase ────────────────────────────────────────────────────
function Top3Rewards({ top3, onSelect }) {
  const [confettiActive, setConfettiActive] = useState(false);
  useEffect(() => {
    setConfettiActive(true);
    const t = setTimeout(() => setConfettiActive(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd
  const podiumHeights = [120, 160, 90];
  const podiumRanks = [2, 1, 3];

  return (
    <div style={{
      background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4c1d95 100%)",
      borderRadius: 24, padding: "32px 24px 24px", marginBottom: 20,
      position: "relative", overflow: "hidden",
      boxShadow: "0 20px 60px rgba(124,58,237,0.3)"
    }}>
      <Confetti active={confettiActive} />

      {/* Sparkles bg */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#FDE68A" : i % 3 === 1 ? "#C4B5FD" : "#FFFFFF",
            opacity: 0.4 + Math.random() * 0.6,
            animation: `twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 2}s`,
          }} />
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: 28, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 36, marginBottom: 6 }}>🏆</div>
        <div style={{
          fontFamily: "'Georgia', serif",
          fontSize: 22, fontWeight: 900,
          color: "#FDE68A",
          letterSpacing: "0.04em",
          textShadow: "0 2px 12px rgba(253,230,138,0.5)"
        }}>National Top 3 — Champion Districts</div>
        <div style={{ color: "rgba(196,181,253,0.85)", fontSize: 13, marginTop: 4 }}>
          Recipients of India's highest district governance honors
        </div>
      </div>

      {/* Podium visual */}
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        gap: 16, position: "relative", zIndex: 1, marginBottom: 24
      }}>
        {podiumOrder.map((d, idx) => {
          if (!d) return null;
          const rank = podiumRanks[idx];
          const rew = REWARDS[rank - 1];
          const h = podiumHeights[idx];
          return (
            <div key={d.district} onClick={() => onSelect(d)}
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", width: 140 }}>
              {/* Crown/Badge */}
              {rank === 1 && <div style={{ fontSize: 28, marginBottom: 4, filter: "drop-shadow(0 0 12px #F59E0B)" }}>👑</div>}

              {/* Avatar */}
              <div style={{
                width: rank === 1 ? 80 : 65,
                height: rank === 1 ? 80 : 65,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${rew.border}44 0%, ${rew.border}11 100%)`,
                border: `3px solid ${rew.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: rank === 1 ? 36 : 28,
                marginBottom: 8,
                boxShadow: `0 0 0 4px ${rew.ringColor}, 0 8px 24px ${rew.border}66`,
                transition: "transform 0.2s ease",
              }}>{em(d.district)}</div>

              {/* Name */}
              <div style={{
                color: "#FFFFFF", fontWeight: 800,
                fontSize: rank === 1 ? 14 : 12,
                textAlign: "center", marginBottom: 4, lineHeight: 1.3
              }}>{d.district}</div>
              <div style={{ color: "rgba(196,181,253,0.7)", fontSize: 10, marginBottom: 8, textAlign: "center" }}>{d.state}</div>
              <div style={{
                background: `linear-gradient(135deg, ${rew.border}33, ${rew.border}11)`,
                border: `1px solid ${rew.border}55`,
                borderRadius: 8, padding: "3px 10px",
                color: rew.border, fontWeight: 800, fontSize: 13, marginBottom: 8
              }}>{d.score.toFixed(1)}</div>

              {/* Podium block */}
              <div style={{
                width: "100%", height: h,
                background: `linear-gradient(180deg, ${rew.border}55 0%, ${rew.border}22 100%)`,
                borderRadius: "8px 8px 0 0",
                border: `2px solid ${rew.border}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: rank === 1 ? 32 : 24,
              }}>{rew.badge}</div>
            </div>
          );
        })}
      </div>

      {/* Rewards cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, position: "relative", zIndex: 1 }}>
        {REWARDS.map(rew => (
          <div key={rew.rank} style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${rew.border}44`,
            borderRadius: 14, padding: "14px",
            borderTop: `3px solid ${rew.border}`
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>{rew.badge}</span>
              <span style={{ color: rew.border, fontWeight: 800, fontSize: 12 }}>{rew.title}</span>
            </div>
            <div style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 14, marginBottom: 4 }}>{rew.prize}</div>
            <div style={{ color: "rgba(196,181,253,0.7)", fontSize: 11 }}>🎁 {rew.perk}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Award Zone (Top 5) with Confetti ─────────────────────────────────────────
function AwardZoneSection({ top5, sortBy, onSelect }) {
  const [confetti, setConfetti] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [top5]);

  const triggerConfetti = () => {
    setConfetti(false);
    setTimeout(() => setConfetti(true), 50);
    setTimeout(() => setConfetti(false), 3100);
  };

  const rankConfigs = [
    { sz: 72, fnt: 32, mt: 0, ring: "#F59E0B", bg: "linear-gradient(145deg,#FFFBEB,#FDE68A)", crown: true },
    { sz: 60, fnt: 26, mt: 20, ring: "#94A3B8", bg: "linear-gradient(145deg,#F8FAFC,#E2E8F0)", crown: false },
    { sz: 54, fnt: 22, mt: 30, ring: "#CD7F32", bg: "linear-gradient(145deg,#FFF7ED,#FED7AA)", crown: false },
  ];
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div ref={sectionRef} style={{
      background: "linear-gradient(135deg,#FFFBEB 0%,#FEF9C3 50%,#FFF7ED 100%)",
      borderRadius: 24, overflow: "hidden", marginBottom: 20,
      border: "2px solid #FDE68A",
      boxShadow: "0 8px 40px rgba(245,158,11,0.15)",
      position: "relative",
    }}>
      <Confetti active={confetti} />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#F59E0B,#D97706,#B45309)",
        padding: "18px 24px",
        display: "flex", alignItems: "center", gap: 12
      }}>
        <span style={{ fontSize: 28 }}>🏆</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, color: "#FFFFFF", fontSize: 16 }}>AWARD ZONE — Top 5 Districts</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>Excellence in governance · Government award eligible</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 20, padding: "3px 14px", color: "#FFF", fontWeight: 800, fontSize: 12 }}>
          {top5.length} Districts
        </div>
        <button onClick={triggerConfetti} style={{
          background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: 10, padding: "6px 12px", color: "#FFF",
          fontSize: 12, fontWeight: 700, cursor: "pointer"
        }}>🎉 Celebrate</button>
      </div>

      {/* Podium Top 3 */}
      <div style={{
        padding: "20px 24px 12px",
        display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 16
      }}>
        {[top5[1], top5[0], top5[2]].map((d, i) => {
          if (!d) return null;
          const rank = [2, 1, 3][i];
          const cfg = rankConfigs[rank - 1];
          return (
            <div key={d.district} onClick={() => onSelect(d)}
              style={{
                cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", flex: rank === 1 ? "0 0 130px" : "0 0 100px",
                transform: "translateY(0)", transition: "transform 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px) scale(1.04)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}
            >
              {cfg.crown && <div style={{ fontSize: 24, marginBottom: 4, filter: "drop-shadow(0 2px 6px rgba(245,158,11,0.8))" }}>👑</div>}
              <div style={{
                width: cfg.sz, height: cfg.sz, borderRadius: "50%",
                background: cfg.bg,
                border: `3px solid ${cfg.ring}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: cfg.fnt,
                boxShadow: `0 0 0 3px white, 0 6px 20px ${cfg.ring}55`
              }}>{em(d.district)}</div>
              <div style={{
                marginTop: 8, textAlign: "center",
                fontWeight: 800, fontSize: rank === 1 ? 14 : 12, color: "#1E293B",
              }}>{d.district}</div>
              <div style={{ fontSize: 10, color: C.textMuted, marginTop: 1, textAlign: "center" }}>{d.state}</div>
              <div style={{ fontSize: 11, color: cfg.ring, fontWeight: 900, marginTop: 4 }}>{medals[rank - 1]} {d[sortBy]?.toFixed(sortBy === "sex_ratio" ? 0 : 1)}</div>
              {/* Podium step */}
              <div style={{
                marginTop: 10, width: "100%",
                height: [100, 140, 75][rank - 1],
                background: `linear-gradient(180deg,${cfg.ring}44,${cfg.ring}11)`,
                borderRadius: "8px 8px 0 0",
                border: `2px solid ${cfg.ring}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 22, color: cfg.ring
              }}>{rank}</div>
            </div>
          );
        })}
      </div>

      {/* 4th & 5th */}
      {top5.slice(3).map((d, i) => (
        <div key={d.district} onClick={() => onSelect(d)} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 24px",
          background: i === 0 ? "rgba(253,230,138,0.3)" : "rgba(253,230,138,0.15)",
          borderTop: "1px solid rgba(245,158,11,0.2)",
          cursor: "pointer",
          transition: "background 0.15s"
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = i === 0 ? "rgba(253,230,138,0.3)" : "rgba(253,230,138,0.15)"}
        >
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(245,158,11,0.15)",
            border: "2px solid rgba(245,158,11,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18
          }}>{em(d.district)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: "#1E293B", fontSize: 14 }}>{d.district}</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>{d.state}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 900, fontSize: 16, color: "#D97706" }}>
              {d[sortBy]?.toFixed(sortBy === "sex_ratio" ? 0 : 1)}
            </div>
            <div style={{ fontSize: 10, color: C.textMuted }}>#{4 + i} nationally</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Shared Components ─────────────────────────────────────────────────────────
function Chip({ label, color, bg }) {
  return (
    <span style={{
      background: bg, color, padding: "4px 12px", borderRadius: 20,
      fontSize: 12, fontWeight: 700, border: `1px solid ${color}44`
    }}>{label}</span>
  );
}

function StatCard({ icon, label, value, sub, color, trend }) {
  return (
    <div style={{
      background: C.bgCard, borderRadius: 16, padding: "18px 16px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      borderLeft: `4px solid ${color}`,
      transition: "transform 0.15s, box-shadow 0.15s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: C.text }}>{value}</div>
          {sub && <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>{sub}</div>}
        </div>
        <div style={{ fontSize: 26, background: `${color}15`, borderRadius: 12, padding: "8px 10px" }}>{icon}</div>
      </div>
      {trend !== undefined && (
        <div style={{ marginTop: 10, height: 3, borderRadius: 2, background: "#F1F5F9" }}>
          <div style={{ height: "100%", borderRadius: 2, background: color, width: `${Math.min(100, Math.max(0, trend))}%`, transition: "width 0.8s ease" }} />
        </div>
      )}
    </div>
  );
}

function ListRow({ d, rank, onClick, danger }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "12px 18px",
        background: hov ? (danger ? "#FFF5F5" : "#F0F7FF") : "transparent",
        borderBottom: `1px solid ${C.border}`,
        cursor: "pointer", transition: "background 0.12s"
      }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
        background: danger ? "#FEE2E2" : "#DBEAFE",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: 11, color: danger ? "#991B1B" : "#1D4ED8"
      }}>{rank}</div>
      <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{em(d.district)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, color: C.text, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.district}</div>
        <div style={{ fontSize: 10, color: C.textMuted }}>{d.state}</div>
      </div>
      <div style={{ display: "flex", gap: 14, textAlign: "right", flexShrink: 0 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 15, color: danger ? "#DC2626" : C.primary }}>{d.score.toFixed(1)}</div>
          <div style={{ fontSize: 9, color: C.textMuted }}>Score</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 12, color: d.sex_ratio < 900 ? "#DC2626" : "#059669" }}>{d.sex_ratio}</div>
          <div style={{ fontSize: 9, color: C.textMuted }}>Ratio</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 12, color: d.literacy < 60 ? "#DC2626" : "#059669" }}>{d.literacy}%</div>
          <div style={{ fontSize: 9, color: C.textMuted }}>Lit.</div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selDist, setSelDist] = useState(null);
  const [lbState, setLbState] = useState("All States");
  const [lbMode, setLbMode] = useState("national");
  const [sortBy, setSortBy] = useState("score");
  const [dashState, setDashState] = useState("All States");
  const [dashDistrict, setDashDistrict] = useState("All Districts");
  const [searchQ, setSearchQ] = useState("");

  const sorted = useMemo(() => [...UNIQUE].sort((a, b) => b.score - a.score), []);

  const lbData = useMemo(() => {
    let pool = lbMode === "national" ? sorted : sorted.filter(d => d.state === lbState);
    return [...pool].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [sorted, lbMode, lbState, sortBy]);

  const top5 = lbData.slice(0, 5);
  const bottom10 = lbMode === "national"
    ? [...UNIQUE].sort((a, b) => a.score - b.score).slice(0, 10)
    : sorted.filter(d => d.state === lbState).sort((a, b) => a.score - b.score).slice(0, 5);

  const dashDists = useMemo(() => {
    if (dashState === "All States") return ["All Districts"];
    return ["All Districts", ...UNIQUE.filter(d => d.state === dashState).map(d => d.district).sort()];
  }, [dashState]);

  const dashData = useMemo(() => {
    let pool = dashState === "All States" ? UNIQUE : UNIQUE.filter(d => d.state === dashState);
    if (dashDistrict !== "All Districts") pool = pool.filter(d => d.district === dashDistrict);
    if (searchQ) pool = pool.filter(d => d.district.toLowerCase().includes(searchQ.toLowerCase()) || d.state.toLowerCase().includes(searchQ.toLowerCase()));
    return [...pool].sort((a, b) => b.score - a.score);
  }, [dashState, dashDistrict, searchQ]);

  const stateAvg = useMemo(() => {
    const map = {};
    UNIQUE.forEach(d => {
      if (!map[d.state]) map[d.state] = { state: d.state, score: [], literacy: [], sex_ratio: [], growth: [] };
      map[d.state].score.push(d.score);
      map[d.state].literacy.push(d.literacy);
      map[d.state].sex_ratio.push(d.sex_ratio);
      map[d.state].growth.push(d.growth);
    });
    return Object.values(map).map(s => ({
      state: s.state.length > 10 ? s.state.slice(0, 10) + "…" : s.state,
      fullState: s.state,
      score: parseFloat((s.score.reduce((a, b) => a + b, 0) / s.score.length).toFixed(1)),
      literacy: parseFloat((s.literacy.reduce((a, b) => a + b, 0) / s.literacy.length).toFixed(1)),
      sex_ratio: parseFloat((s.sex_ratio.reduce((a, b) => a + b, 0) / s.sex_ratio.length).toFixed(0)),
      growth: parseFloat((s.growth.reduce((a, b) => a + b, 0) / s.growth.length).toFixed(1)),
      count: s.score.length,
    })).sort((a, b) => b.score - a.score);
  }, []);

  const scoreDist = useMemo(() => {
    const bins = [56, 60, 65, 70, 75, 80, 85, 90, 95, 101];
    return bins.slice(0, -1).map((lo, i) => ({
      r: `${lo}-${bins[i + 1] - 1}`,
      count: dashData.filter(d => d.score >= lo && d.score < bins[i + 1]).length,
      lo
    }));
  }, [dashData]);

  const zonePie = useMemo(() => [
    { name: "Excellent ≥90", value: dashData.filter(d => d.score >= 90).length, color: "#059669" },
    { name: "Good 80-90", value: dashData.filter(d => d.score >= 80 && d.score < 90).length, color: "#2563EB" },
    { name: "Average 75-80", value: dashData.filter(d => d.score >= 75 && d.score < 80).length, color: "#F59E0B" },
    { name: "Danger <75", value: dashData.filter(d => d.score < 75).length, color: "#DC2626" },
  ], [dashData]);

  const scatter = useMemo(() => dashData.filter((_, i) => i % 3 === 0), [dashData]);

  const goD = d => { setSelDist(d); setPage("district"); };
  const nav = p => setPage(p);

  // ── NAVBAR ─────────────────────────────────────────────────────────────────
  const NavBar = () => (
    <div style={{
      padding: "0 24px", display: "flex", alignItems: "center",
      height: 80,
      position: "sticky", top: 0, zIndex: 100
    }}>
      <button onClick={() => nav("home")} style={{
        display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "8px 20px"
      }}>


      </button>
      <div style={{ flex: 1 }} />

    </div>
  );

  // ── HOME ───────────────────────────────────────────────────────────────────
  if (page === "home") return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 20px 60px" }}>
        {/* Hero */}
        <div style={{
          background: C.bgHero, borderRadius: 28, padding: "52px 48px",
          marginBottom: 32, color: "#FFF", position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🇮🇳</div>
            <h1 style={{ fontSize: 36, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.2 }}>India District<br />Governance Portal</h1>
            <p style={{ fontSize: 16, opacity: 0.85, margin: "0 0 28px", maxWidth: 480, lineHeight: 1.6 }}>
              Comprehensive analytics across {UNIQUE.length} districts in {ALL_STATES.length - 1} states — tracking sex ratio, literacy, growth, and composite governance scores.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => nav("leaderboard")} style={{
                padding: "12px 28px", borderRadius: 12,
                background: "#FFFFFF", color: "#2563EB",
                fontWeight: 800, fontSize: 14, border: "none", cursor: "pointer"
              }}>🏆 View Leaderboard</button>
              <button onClick={() => nav("dashboard")} style={{
                padding: "12px 28px", borderRadius: 12,
                background: "rgba(255,255,255,0.15)", color: "#FFFFFF",
                fontWeight: 800, fontSize: 14, border: "2px solid rgba(255,255,255,0.3)", cursor: "pointer"
              }}>📊 Explore Dashboard</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
          {[
            ["🗺️", "Districts", UNIQUE.length, "total analyzed", "#2563EB", 100],
            ["🏛️", "States", ALL_STATES.length - 1, "coverage", "#7C3AED", 100],
            ["🏆", "Award Zones", sorted.filter(d => d.score >= 90).length, "score ≥ 90", "#059669", sorted.filter(d => d.score >= 90).length / UNIQUE.length * 100],
            ["🚨", "Danger Zones", UNIQUE.filter(d => d.score < DANGER).length, "score < 75", "#DC2626", UNIQUE.filter(d => d.score < DANGER).length / UNIQUE.length * 100],
          ].map(([ic, l, v, s, c, t]) => (
            <StatCard key={l} icon={ic} label={l} value={v} sub={s} color={c} trend={t} />
          ))}
        </div>

        {/* Top 3 National */}
        <Top3Rewards top3={sorted.slice(0, 3)} onSelect={goD} />

        <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13 }}>
          Click any district card to view detailed analytics and scheme recommendations
        </div>
      </div>
    </div>
  );

  // ── LEADERBOARD ────────────────────────────────────────────────────────────
  if (page === "leaderboard") return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 18px 60px" }}>

        {/* Controls */}
        <div style={{
          background: C.bgCard, borderRadius: 18, padding: "16px 20px", marginBottom: 20,
          boxShadow: "0 2px 14px rgba(37,99,235,0.08)",
          display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center",
          border: `1.5px solid ${C.border}`
        }}>
          <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 10, padding: 3, gap: 3 }}>
            {["national", "statewise"].map(m => (
              <button key={m} onClick={() => setLbMode(m)} style={{
                padding: "7px 16px", borderRadius: 8, border: "none",
                background: lbMode === m ? C.primary : "transparent",
                color: lbMode === m ? "#FFF" : C.textMuted,
                fontWeight: 700, fontSize: 12, cursor: "pointer"
              }}>{m === "national" ? "🌐 National" : "🏛️ State-wise"}</button>
            ))}
          </div>
          {lbMode === "statewise" && (
            <select value={lbState} onChange={e => setLbState(e.target.value)} style={{
              background: "#F8FAFF", color: C.text, border: `2px solid ${C.primaryLight}`,
              padding: "8px 12px", borderRadius: 10, fontSize: 13, fontWeight: 600, flex: 1, minWidth: 160
            }}>
              {ALL_STATES.slice(1).map(s => <option key={s}>{s}</option>)}
            </select>
          )}
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            {["score", "sex_ratio", "literacy"].map(k => (
              <button key={k} onClick={() => setSortBy(k)} style={{
                padding: "7px 13px", borderRadius: 9, border: "none",
                background: sortBy === k ? "linear-gradient(135deg,#2563EB,#7C3AED)" : "#F1F5F9",
                color: sortBy === k ? "#FFF" : C.textMuted,
                fontWeight: 700, fontSize: 12, cursor: "pointer"
              }}>
                {k === "score" ? "⭐ Score" : k === "sex_ratio" ? "♀ Sex Ratio" : "📚 Literacy"}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Rewards on Leaderboard */}
        <Top3Rewards top3={lbData.slice(0, 3)} onSelect={goD} />

        {/* Award Zone Top 5 with confetti */}
        <AwardZoneSection top5={top5} sortBy={sortBy} onSelect={goD} />

        {/* Danger Zone */}
        <div style={{
          background: C.bgCard, borderRadius: 24, overflow: "hidden", marginBottom: 20,
          border: "2px solid #FEE2E2",
          boxShadow: "0 4px 20px rgba(220,38,38,0.1)"
        }}>
          <div style={{
            background: "linear-gradient(90deg,#DC2626,#EF4444)",
            padding: "16px 20px", display: "flex", alignItems: "center", gap: 10
          }}>
            <span style={{ fontSize: 22 }}>🚨</span>
            <div>
              <div style={{ fontWeight: 900, color: "#FFF", fontSize: 14 }}>DANGER ZONE — Priority Districts</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Score below {DANGER} · Immediate intervention needed</div>
            </div>
            <div style={{ marginLeft: "auto", background: "rgba(255,255,255,0.25)", borderRadius: 20, padding: "3px 12px", color: "#FFF", fontWeight: 800, fontSize: 12 }}>{bottom10.length}</div>
          </div>
          {bottom10.map((d, i) => <ListRow key={d.district + d.state} d={d} rank={i + 1} onClick={() => goD(d)} danger />)}
        </div>

        {/* Schemes */}
        <div style={{ background: C.bgCard, borderRadius: 20, padding: "22px", boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}>
          <div style={{ fontWeight: 900, fontSize: 15, color: C.text, marginBottom: 16 }}>💡 Government Schemes — Boost District Scores</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 10 }}>
            {SCHEMES.map(s => (
              <div key={s.n} style={{
                background: `${s.c}08`, border: `1.5px solid ${s.c}25`,
                borderRadius: 12, padding: "11px 13px", borderLeft: `4px solid ${s.c}`
              }}>
                <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 3 }}>
                  <span style={{ fontSize: 16 }}>{s.ic}</span>
                  <span style={{ fontWeight: 700, fontSize: 12, color: C.text, flex: 1, lineHeight: 1.3 }}>{s.n}</span>
                  <span style={{ fontWeight: 900, fontSize: 12, color: "#059669", background: "#DCFCE7", padding: "1px 7px", borderRadius: 6 }}>{s.pts}</span>
                </div>
                <div style={{ fontSize: 11, color: C.textMuted, paddingLeft: 23 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── DISTRICT DETAIL ────────────────────────────────────────────────────────
  if (page === "district" && selDist) {
    const d = selDist;
    const sds = UNIQUE.filter(x => x.state === d.state).sort((a, b) => b.score - a.score);
    const sr = sds.findIndex(x => x.district === d.district) + 1;
    const nr = sorted.findIndex(x => x.district === d.district && x.state === d.state) + 1;
    const rew = nr <= 3 ? REWARDS[nr - 1] : null;
    const rel = SCHEMES.filter(s => d.sex_ratio < 950 ? s.focus === "sex_ratio" : s.focus === "literacy").slice(0, 4);
    const rad = [
      { m: "Sex Ratio", v: Math.min((d.sex_ratio / 1100) * 100, 100) },
      { m: "Literacy", v: d.literacy },
      { m: "Growth", v: Math.max(0, 100 - Math.abs(d.growth - 15) * 2) },
      { m: "Score", v: d.score }
    ];
    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
        <NavBar />
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "22px 18px 60px" }}>
          <button onClick={() => nav("leaderboard")} style={{
            background: C.bgCard, border: `2px solid ${C.primaryLight}`, color: C.primary,
            padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            cursor: "pointer", marginBottom: 18, display: "flex", alignItems: "center", gap: 6
          }}>← Back to Leaderboard</button>

          {/* Hero */}
          <div style={{
            background: C.bgHero, borderRadius: 22, padding: "28px",
            marginBottom: 18, color: "#FFF", position: "relative", overflow: "hidden"
          }}>
            {rew && <Confetti active />}
            <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, border: "3px solid rgba(255,255,255,0.35)", flexShrink: 0
              }}>{em(d.district)}</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 24 }}>{d.district}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>{d.state}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                  <Chip label={`Nat. #${nr}`} color="#FDE68A" bg="rgba(253,230,138,0.2)" />
                  <Chip label={`State #${sr}/${sds.length}`} color="#BAE6FD" bg="rgba(186,230,253,0.2)" />
                  {d.score >= 90 && <Chip label="🏆 Award Zone" color="#6EE7B7" bg="rgba(110,231,183,0.2)" />}
                  {d.score < DANGER && <Chip label="🚨 Danger Zone" color="#FCA5A5" bg="rgba(252,165,165,0.2)" />}
                </div>
              </div>
            </div>
          </div>

          {/* Reward card */}
          {rew && (
            <div style={{
              background: rew.bg, border: `2px solid ${rew.border}55`,
              borderRadius: 18, padding: "22px", marginBottom: 18,
              boxShadow: `0 8px 32px ${rew.glow}33`
            }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ fontSize: 56 }}>{rew.badge}</div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 17, color: rew.tc }}>{rew.title}</div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: rew.tc, margin: "6px 0" }}>{rew.prize}</div>
                  <div style={{ fontSize: 13, color: rew.tc, opacity: 0.8 }}>🎁 {rew.perk}</div>
                </div>
              </div>
            </div>
          )}

          {/* KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
            {[
              ["⭐", "Score", d.score.toFixed(1), "composite", "#2563EB", d.score],
              ["♀", "Sex Ratio", d.sex_ratio, "per 1000", "#EC4899", d.sex_ratio / 1200 * 100],
              ["📚", "Literacy", d.literacy + "%", "literate", "#7C3AED", d.literacy],
              ["📈", "Growth", d.growth + "%", "decadal", "#059669", Math.min(100, d.growth)],
            ].map(([ic, l, v, s, c, t]) => (
              <StatCard key={l} icon={ic} label={l} value={v} sub={s} color={c} trend={t} />
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            {/* Radar */}
            <div style={{ background: C.bgCard, borderRadius: 14, padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 8 }}>Performance Radar</div>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={rad}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="m" tick={{ fill: C.textMuted, fontSize: 10 }} />
                  <Radar dataKey="v" fill={C.primary} fillOpacity={0.2} stroke={C.primary} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Rankings */}
            <div style={{ background: C.bgCard, borderRadius: 14, padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 12 }}>Rankings & Status</div>
              {[
                ["National Rank", `#${nr} / ${sorted.length}`, nr <= 50 ? "#059669" : C.text],
                ["State Rank", `#${sr} / ${sds.length}`, sr <= 5 ? "#059669" : C.text],
                ["Score Band", d.score >= 90 ? "🏆 Excellent" : d.score >= 80 ? "✅ Good" : d.score >= DANGER ? "⚠️ Average" : "🚨 Danger",
                  d.score >= 90 ? "#059669" : d.score < DANGER ? "#DC2626" : "#F59E0B"],
                ["Sex Ratio Band", d.sex_ratio >= 950 ? "✅ Healthy" : d.sex_ratio < 850 ? "⚠️ Critical" : "😐 Moderate",
                  d.sex_ratio >= 950 ? "#059669" : d.sex_ratio < 850 ? "#DC2626" : "#F59E0B"],
                ["Literacy Band", d.literacy >= 85 ? "✅ High" : d.literacy < 60 ? "🚨 Low" : "📗 Moderate",
                  d.literacy >= 85 ? "#059669" : d.literacy < 60 ? "#DC2626" : "#F59E0B"],
              ].map(([l, v, c]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 12, color: C.textMuted }}>{l}</span>
                  <span style={{ fontWeight: 800, fontSize: 12, color: c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schemes */}
          <div style={{ background: C.bgCard, borderRadius: 14, padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 12 }}>💡 Recommended Schemes for {d.district}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {rel.map(s => (
                <div key={s.n} style={{
                  background: `${s.c}08`, border: `1.5px solid ${s.c}25`,
                  borderRadius: 11, padding: "11px", borderLeft: `4px solid ${s.c}`
                }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                    <span>{s.ic}</span>
                    <span style={{ fontWeight: 700, fontSize: 12, color: C.text, flex: 1 }}>{s.n}</span>
                    <span style={{ color: "#059669", fontWeight: 900, fontSize: 12 }}>{s.pts}</span>
                  </div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  if (page === "dashboard") return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px 60px" }}>

        {/* ── TOP FILTER BAR ── */}
        <div style={{
          background: "linear-gradient(135deg,#1e40af,#2563eb,#7c3aed)",
          borderRadius: 20, padding: "20px 24px", marginBottom: 20,
          boxShadow: "0 8px 32px rgba(37,99,235,0.25)",
          position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ fontWeight: 900, color: "#FFF", fontSize: 16, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span>🔍</span> Filter & Explore Districts
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: "1 1 220px" }}>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 600, marginBottom: 5 }}>SELECT STATE</div>
              <select value={dashState} onChange={e => { setDashState(e.target.value); setDashDistrict("All Districts"); setSearchQ(""); }} style={{
                width: "100%", background: "rgba(255,255,255,0.12)", color: "#FFF",
                border: "2px solid rgba(255,255,255,0.3)",
                padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                outline: "none"
              }}>
                {ALL_STATES.map(s => <option key={s} style={{ color: "#1E293B", background: "#FFF" }}>{s}</option>)}
              </select>
            </div>
            <div style={{ flex: "1 1 220px" }}>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 600, marginBottom: 5 }}>SELECT DISTRICT</div>
              <select value={dashDistrict} onChange={e => setDashDistrict(e.target.value)}
                disabled={dashState === "All States"} style={{
                  width: "100%",
                  background: dashState === "All States" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)",
                  color: dashState === "All States" ? "rgba(255,255,255,0.4)" : "#FFF",
                  border: "2px solid rgba(255,255,255,0.3)",
                  padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                  outline: "none", opacity: dashState === "All States" ? 0.6 : 1
                }}>
                {dashDists.map(d => <option key={d} style={{ color: "#1E293B", background: "#FFF" }}>{d}</option>)}
              </select>
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 600, marginBottom: 5 }}>SEARCH</div>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Search district or state…" style={{
                  width: "100%", background: "rgba(255,255,255,0.12)", color: "#FFF",
                  border: "2px solid rgba(255,255,255,0.3)",
                  padding: "10px 14px", borderRadius: 10, fontSize: 13,
                  outline: "none", boxSizing: "border-box"
                }} />
            </div>
            <div style={{ flex: "0 0 auto", paddingTop: 20 }}>
              <button onClick={() => { setDashState("All States"); setDashDistrict("All Districts"); setSearchQ(""); }} style={{
                background: "rgba(255,255,255,0.2)", color: "#FFF",
                border: "2px solid rgba(255,255,255,0.35)",
                padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer"
              }}>↺ Reset</button>
            </div>
          </div>
          <div style={{ marginTop: 12, color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
            Showing <strong style={{ color: "#FDE68A" }}>{dashData.length}</strong> district{dashData.length !== 1 ? "s" : ""}
            {dashState !== "All States" ? ` in ${dashState}` : " across all states"}
          </div>
        </div>

        {/* ── KPI ROW ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, marginBottom: 18 }}>
          {[
            ["🗺️", "Districts", dashData.length, "total shown", "#2563EB", 100],
            ["⭐", "Avg Score", avg(dashData, "score"), "composite", "#F59E0B", parseFloat(avg(dashData, "score"))],
            ["♀", "Sex Ratio", avg(dashData, "sex_ratio"), "per 1000", "#EC4899", parseFloat(avg(dashData, "sex_ratio")) / 1200 * 100],
            ["📚", "Literacy", avg(dashData, "literacy") + "%", "avg", "#7C3AED", parseFloat(avg(dashData, "literacy"))],
            ["🏆", "Award Zones", dashData.filter(d => d.score >= 90).length, "score ≥ 90", "#059669", dashData.filter(d => d.score >= 90).length / Math.max(1, dashData.length) * 100],
            ["🚨", "Danger Zones", dashData.filter(d => d.score < DANGER).length, "score < 75", "#DC2626", dashData.filter(d => d.score < DANGER).length / Math.max(1, dashData.length) * 100],
          ].map(([ic, l, v, s, c, t]) => (
            <StatCard key={l} icon={ic} label={l} value={v} sub={s} color={c} trend={t} />
          ))}
        </div>

        {/* ── Single district view ── */}
        {dashDistrict !== "All Districts" && dashData.length === 1 && (() => {
          const d = dashData[0];
          const nr = sorted.findIndex(x => x.district === d.district && x.state === d.state) + 1;
          const sds = UNIQUE.filter(x => x.state === d.state).sort((a, b) => b.score - a.score);
          const sr = sds.findIndex(x => x.district === d.district) + 1;
          const rad = [
            { m: "Sex Ratio", v: Math.min((d.sex_ratio / 1100) * 100, 100) },
            { m: "Literacy", v: d.literacy },
            { m: "Growth Score", v: Math.max(0, 100 - Math.abs(d.growth - 15) * 2) },
            { m: "Composite", v: d.score },
          ];
          return (
            <div style={{ background: C.bgCard, borderRadius: 20, padding: 22, marginBottom: 18, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: `2px solid ${C.primaryLight}` }}>
              <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 18 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.bgHero, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>{em(d.district)}</div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: C.text }}>{d.district}</div>
                  <div style={{ color: C.textMuted, fontSize: 13 }}>{d.state} · National #{nr} · State #{sr}/{sds.length}</div>
                </div>
                <button onClick={() => goD(d)} style={{ marginLeft: "auto", background: C.bgHero, color: "#FFF", border: "none", padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>View Full Detail →</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={rad}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="m" tick={{ fill: C.textMuted, fontSize: 11 }} />
                    <Radar dataKey="v" fill={C.primary} fillOpacity={0.2} stroke={C.primary} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
                  {[["Sex Ratio", d.sex_ratio, "per 1000 males", "#EC4899"], ["Literacy", d.literacy + "%", "literate", "#7C3AED"], ["Growth", d.growth + "%", "decadal growth", "#059669"], ["Score", d.score.toFixed(1), "composite", "#2563EB"]].map(([l, v, s, c]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: `${c}08`, borderRadius: 9, borderLeft: `3px solid ${c}` }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 12, color: C.text }}>{l}</div>
                        <div style={{ fontSize: 10, color: C.textMuted }}>{s}</div>
                      </div>
                      <div style={{ fontWeight: 900, fontSize: 18, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── Charts Row 1 ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ background: C.bgCard, borderRadius: 16, padding: "18px", boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 14 }}>🏛️ Top States by Avg Score</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stateAvg.slice(0, 15)} layout="vertical" margin={{ left: 90, right: 16 }}>
                <XAxis type="number" domain={[65, 100]} tick={{ fill: "#94A3B8", fontSize: 10 }} />
                <YAxis type="category" dataKey="state" tick={{ fill: C.textMuted, fontSize: 9 }} width={90} />
                <Tooltip contentStyle={{ background: "#FFF", border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {stateAvg.slice(0, 15).map((e, i) => (
                    <Cell key={i} fill={e.score >= 90 ? "#059669" : e.score >= 85 ? "#2563EB" : "#F59E0B"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: C.bgCard, borderRadius: 16, padding: "18px", boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 14 }}>📊 Zone Distribution</div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={zonePie} cx="50%" cy="44%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value">
                  {zonePie.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "#FFF", border: `1px solid ${C.border}`, borderRadius: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Charts Row 2 ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ background: C.bgCard, borderRadius: 16, padding: "18px", boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 14 }}>📈 Score Distribution</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={scoreDist}>
                <XAxis dataKey="r" tick={{ fill: "#94A3B8", fontSize: 10 }} />
                <YAxis tick={{ fill: "#94A3B8", fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "#FFF", border: `1px solid ${C.border}`, borderRadius: 10 }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {scoreDist.map((e, i) => <Cell key={i} fill={e.lo < 75 ? "#DC2626" : e.lo >= 90 ? "#059669" : "#2563EB"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: C.bgCard, borderRadius: 16, padding: "18px", boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 14 }}>🔵 Sex Ratio vs Literacy</div>
            <ResponsiveContainer width="100%" height={220}>
              <ScatterChart margin={{ top: 5, right: 10, bottom: 22, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis type="number" dataKey="sex_ratio" domain={[500, 1200]} tick={{ fill: "#94A3B8", fontSize: 10 }}
                  label={{ value: "Sex Ratio", position: "insideBottom", offset: -10, fill: "#94A3B8", fontSize: 11 }} />
                <YAxis type="number" dataKey="literacy" domain={[30, 100]} tick={{ fill: "#94A3B8", fontSize: 10 }} />
                <Tooltip content={({ active, payload }) => active && payload?.length ? (
                  <div style={{ background: "#FFF", border: `1px solid ${C.border}`, padding: "9px 12px", borderRadius: 10, fontSize: 12 }}>
                    <div style={{ fontWeight: 700, color: C.text }}>{payload[0]?.payload?.district}</div>
                    <div style={{ color: C.textMuted, fontSize: 11 }}>{payload[0]?.payload?.state}</div>
                    <div style={{ color: C.primary, fontWeight: 700 }}>Score: {payload[0]?.payload?.score}</div>
                  </div>
                ) : null} />
                <Scatter data={scatter} fillOpacity={0.8}>
                  {scatter.map((d, i) => <Cell key={i} fill={d.score >= 90 ? "#059669" : d.score >= 80 ? "#2563EB" : d.score >= DANGER ? "#F59E0B" : "#DC2626"} />)}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 6, flexWrap: "wrap" }}>
              {[["#059669", "≥90"], ["#2563EB", "80-90"], ["#F59E0B", "75-80"], ["#DC2626", "<75"]].map(([c, l]) => (
                <span key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.textMuted }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }} />
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Multi-metric state comparison ── */}
        <div style={{ background: C.bgCard, borderRadius: 16, padding: "18px", marginBottom: 16, boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 14 }}>📊 Top States: Score vs Literacy vs Sex Ratio</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stateAvg.slice(0, 12)} margin={{ left: 0, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F8FAFC" />
              <XAxis dataKey="state" tick={{ fill: "#94A3B8", fontSize: 9 }} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 10 }} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: "#FFF", border: `1px solid ${C.border}`, borderRadius: 10 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="score" fill={C.primary} name="Avg Score" radius={[4, 4, 0, 0]} />
              <Bar dataKey="literacy" fill="#7C3AED" name="Avg Literacy%" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Growth rate chart ── */}
        <div style={{ background: C.bgCard, borderRadius: 16, padding: "18px", marginBottom: 16, boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 14 }}>📉 Avg Growth Rate by State (Top 15)</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stateAvg.slice(0, 15).sort((a, b) => b.growth - a.growth)} layout="vertical" margin={{ left: 90, right: 16 }}>
              <XAxis type="number" tick={{ fill: "#94A3B8", fontSize: 10 }} />
              <YAxis type="category" dataKey="state" tick={{ fill: C.textMuted, fontSize: 9 }} width={90} />
              <Tooltip contentStyle={{ background: "#FFF", border: `1px solid ${C.border}`, borderRadius: 10 }} />
              <Bar dataKey="growth" radius={[0, 6, 6, 0]} name="Growth %">
                {stateAvg.slice(0, 15).sort((a, b) => b.growth - a.growth).map((e, i) => (
                  <Cell key={i} fill={e.growth > 25 ? "#DC2626" : e.growth > 15 ? "#F59E0B" : "#059669"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Sex Ratio heatmap by state ── */}
        <div style={{ background: C.bgCard, borderRadius: 16, padding: "18px", marginBottom: 16, boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 14 }}>♀ Sex Ratio Rankings by State</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 8 }}>
            {stateAvg.sort((a, b) => b.sex_ratio - a.sex_ratio).map(s => {
              const pct = Math.min(100, ((s.sex_ratio - 700) / 600) * 100);
              const col = s.sex_ratio >= 1000 ? "#059669" : s.sex_ratio >= 950 ? "#2563EB" : s.sex_ratio >= 900 ? "#F59E0B" : "#DC2626";
              return (
                <div key={s.state} style={{
                  padding: "10px 12px", borderRadius: 10,
                  background: `${col}10`, border: `1.5px solid ${col}30`
                }}>
                  <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.fullState || s.state}</div>
                  <div style={{ fontWeight: 900, fontSize: 16, color: col }}>{s.sex_ratio}</div>
                  <div style={{ height: 3, borderRadius: 2, background: "#E2E8F0", marginTop: 4 }}>
                    <div style={{ height: "100%", borderRadius: 2, background: col, width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── District table (when state selected) ── */}
        {dashState !== "All States" && (
          <div style={{ background: C.bgCard, borderRadius: 16, padding: "18px", boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 14 }}>
              📋 {dashState} — All Districts
              <span style={{ marginLeft: 8, background: C.primaryLight, color: C.primary, padding: "2px 10px", borderRadius: 12, fontSize: 12, fontWeight: 700 }}>{dashData.length}</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#F8FAFF" }}>
                    {["#", "District", "Score", "Sex Ratio", "Literacy", "Growth", "Nat. Rank", "Zone"].map(h => (
                      <th key={h} style={{
                        padding: "10px 12px", textAlign: "left",
                        color: C.textMuted, fontWeight: 700, fontSize: 11,
                        textTransform: "uppercase", letterSpacing: "0.05em",
                        borderBottom: `2px solid ${C.border}`, whiteSpace: "nowrap"
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dashData.map((d, i) => {
                    const nr = sorted.findIndex(x => x.district === d.district && x.state === d.state) + 1;
                    return (
                      <tr key={d.district} onClick={() => goD(d)} style={{ cursor: "pointer", borderBottom: `1px solid ${C.border}`, transition: "background 0.12s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#F0F7FF"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "10px 12px", color: "#94A3B8", fontWeight: 700 }}>{i + 1}</td>
                        <td style={{ padding: "10px 12px" }}>
                          <div style={{ fontWeight: 700, color: C.text, display: "flex", alignItems: "center", gap: 7 }}>
                            <span style={{ fontSize: 16 }}>{em(d.district)}</span>{d.district}
                          </div>
                        </td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{ fontWeight: 900, fontSize: 15, color: d.score >= 90 ? "#059669" : d.score >= 80 ? C.primary : d.score < DANGER ? "#DC2626" : "#F59E0B" }}>
                            {d.score.toFixed(1)}
                          </span>
                        </td>
                        <td style={{ padding: "10px 12px", fontWeight: 600, color: d.sex_ratio >= 950 ? "#059669" : d.sex_ratio < 850 ? "#DC2626" : C.text }}>{d.sex_ratio}</td>
                        <td style={{ padding: "10px 12px", fontWeight: 600, color: d.literacy >= 85 ? "#059669" : d.literacy < 60 ? "#DC2626" : C.text }}>{d.literacy}%</td>
                        <td style={{ padding: "10px 12px", color: C.textMuted }}>{d.growth}%</td>
                        <td style={{ padding: "10px 12px", color: nr <= 10 ? "#059669" : C.textMuted, fontWeight: 700 }}>#{nr}</td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{
                            background: d.score >= 90 ? "#DCFCE7" : d.score >= 80 ? "#DBEAFE" : d.score >= DANGER ? "#FEF9C3" : "#FEE2E2",
                            color: d.score >= 90 ? "#166534" : d.score >= 80 ? "#1D4ED8" : d.score >= DANGER ? "#854D0E" : "#991B1B",
                            padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap"
                          }}>
                            {d.score >= 90 ? "🏆 Excellent" : d.score >= 80 ? "✅ Good" : d.score >= DANGER ? "⚠️ Average" : "🚨 Danger"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return null;
}
