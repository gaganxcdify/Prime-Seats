import { configureStore, createSlice } from "@reduxjs/toolkit";

const personSlice = createSlice({
    name: "login",
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            sessionStorage.removeItem("customerId");
            sessionStorage.removeItem("token");
            state.isLoggedIn = false;
        }
    }
});

export const personActions = personSlice.actions;

const adminSlice = createSlice({
    name: "admin",
    initialState: { isAdmin: false },
    reducers: {
        setlogin(state) {
            state.isAdmin = true;
        },
        setlogout(state) {
            sessionStorage.removeItem("adminId");
            sessionStorage.removeItem("token");
            state.isAdmin = false;
        }
    }
});

export const adminActions = adminSlice.actions;


const homePageSlice = createSlice({
    name: "homepage",
    initialState: { isHomePage: false },
    reducers: {
        homePage(state) {
            state.isHomePage = true;
        },
        notHomePage(state) {
            state.isHomePage = false;
        }
    }
});

export const homePageActions = homePageSlice.actions;



const citySlice = createSlice({
    name: "city",
    initialState: { cityName: "" },
    reducers: {
        setCity(state, action) {
            state.cityName = action.payload;
        }
    }
});

export const cityActions = citySlice.actions;



export const store = configureStore({
    reducer: {
        login: personSlice.reducer,
        setlogin: adminSlice.reducer,
        homePage: homePageSlice.reducer,
        city: citySlice.reducer,
    },
});

