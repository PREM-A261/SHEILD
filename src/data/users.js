const mockUsers = [
    { id: 1, name: "Priya Sharma", email: "priya@example.com", password: "user123", role: "basic_user" },
    { id: 2, name: "Rajesh Kumar", email: "rajesh@gov.in", password: "admin123", role: "gov_admin", department: "Ministry of Women & Child Development" },
    { id: 3, name: "Anita Desai", email: "anita@ngo.org", password: "ngo123", role: "ngo_user", organization: "Gender Equality Foundation" },
];

export const roleLabels = {
    basic_user: "Basic User",
    gov_admin: "Government Admin",
    ngo_user: "NGO User",
};

export const roleColors = {
    basic_user: "#009688",
    gov_admin: "#3F51B5",
    ngo_user: "#FF9800",
};

export default mockUsers;
