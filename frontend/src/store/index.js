// import { configureStore, createSlice } from "@reduxjs/toolkit"

// const personSlice = createSlice({
//     name: "login",
//     initialState: { isLoggedIn: false },
//     reducers: {
//         login(state) {
//             state.isLoggedIn = true;
//         },
//         logout(state) {
//             sessionStorage.removeItem("userId");
//             state.isLoggedIn = false;
//         }
//     }
// })
// export const personActions = personSlice.actions;



// const adminSlice = createSlice({
//     name: "admin",
//     initialState: { isAdmin: false },
//     reducers: {
//         setlogin(state) {
//             state.isAdmin = true;
//         },
//         setlogout(state) {
//             sessionStorage.removeItem("adminId");
//             sessionStorage.removeItem("token");
//             state.isAdmin = false;
//         }
//     }
// })
// export const adminActions = adminSlice.actions;


// export const store = configureStore({
//     reducer: {
//         login: personSlice.reducer,
//         setlogin: adminSlice.reducer,
//     },
// })


import { configureStore, createSlice } from "@reduxjs/toolkit";

const personSlice = createSlice({
    name: "login",
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            sessionStorage.removeItem("userId"); // Change sessionStorage to sessionStorage
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
            sessionStorage.removeItem("adminId"); // Change sessionStorage to sessionStorage
            sessionStorage.removeItem("token"); // Change sessionStorage to sessionStorage
            state.isAdmin = false;
        }
    }
});

export const adminActions = adminSlice.actions;

export const store = configureStore({
    reducer: {
        login: personSlice.reducer,
        setlogin: adminSlice.reducer,
    },
});
