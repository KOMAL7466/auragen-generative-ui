const USERS_KEY = "auraestate_users";
const CURRENT_USER_KEY = "auraestate_current_user";

/* =========================
   USERS
========================= */

export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const registerUser = (user) => {
  const users = getUsers();

  const email = user.email.trim().toLowerCase();

  const exists = users.some(
    (item) => item.email.toLowerCase() === email
  );

  if (exists) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  const newUser = {
    id: Date.now().toString(),
    name: user.name.trim(),
    email,
    phone: user.phone?.trim() || "",
    password: user.password,
    role: "user",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify([...users, newUser])
  );

  return newUser;
};

export const loginUser = (email, password) => {
  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() ===
        email.trim().toLowerCase() &&
      item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );

  return user;
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(
      localStorage.getItem(CURRENT_USER_KEY) || "null"
    );
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const isLoggedIn = () => {
  return !!getCurrentUser();
};


/* =========================
   USER-SPECIFIC STORAGE
========================= */

export const getUserKey = (type) => {
  const user = getCurrentUser();

  if (!user) {
    return `auraestate_${type}_guest`;
  }

  return `auraestate_${type}_${user.email}`;
};

export const getStoredItems = (type) => {
  try {
    return JSON.parse(
      localStorage.getItem(getUserKey(type)) || "[]"
    );
  } catch {
    return [];
  }
};

export const setStoredItems = (type, items) => {
  localStorage.setItem(
    getUserKey(type),
    JSON.stringify(items)
  );
};

export const toggleStoredItem = (type, propertyId) => {
  const items = getStoredItems(type);

  const id = String(propertyId);

  const exists = items.some(
    (item) => String(item) === id
  );

  const updated = exists
    ? items.filter(
        (item) => String(item) !== id
      )
    : [...items, id];

  setStoredItems(type, updated);

  return updated;
};


/* =========================
   ENQUIRIES
========================= */

export const getEnquiries = () => {
  return getStoredItems("enquiries");
};

export const addEnquiry = (enquiry) => {
  const enquiries = getEnquiries();

  const newEnquiry = {
    id: Date.now().toString(),
    ...enquiry,
    createdAt: new Date().toISOString(),
  };

  const updated = [
    ...enquiries,
    newEnquiry,
  ];

  setStoredItems("enquiries", updated);

  return newEnquiry;
};


/* =========================
   PROPERTIES
========================= */

export const getProperties = () => {
  return [
    {
      id: "1",
      title: "Skyline Luxury Apartment",
      location: "Hitech City, Hyderabad",
      price: 12500000,
      type: "Apartment",
      beds: 3,
      baths: 3,
      area: 1850,
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
      featured: true,
    },

    {
      id: "2",
      title: "Modern Villa",
      location: "Kondapur, Hyderabad",
      price: 24500000,
      type: "Villa",
      beds: 4,
      baths: 4,
      area: 3200,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      featured: true,
    },

    {
      id: "3",
      title: "Urban Family Home",
      location: "Gachibowli, Hyderabad",
      price: 9800000,
      type: "Apartment",
      beds: 2,
      baths: 2,
      area: 1450,
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80",
      featured: false,
    },

    {
      id: "4",
      title: "Green Valley Villa",
      location: "Kokapet, Hyderabad",
      price: 18500000,
      type: "Villa",
      beds: 3,
      baths: 3,
      area: 2600,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
      featured: true,
    },

    {
      id: "5",
      title: "Premium City Residence",
      location: "Madhapur, Hyderabad",
      price: 14500000,
      type: "Apartment",
      beds: 3,
      baths: 2,
      area: 1900,
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
      featured: false,
    },

    {
      id: "6",
      title: "Elegant Independent House",
      location: "Jubilee Hills, Hyderabad",
      price: 32000000,
      type: "House",
      beds: 5,
      baths: 5,
      area: 4200,
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=80",
      featured: true,
    },
  ];
};

export const getPropertyById = (id) => {
  return getProperties().find(
    (property) =>
      String(property.id) === String(id)
  );
};