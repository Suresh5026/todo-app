import { configureStore } from "@reduxjs/toolkit";
import Taskreducer from "./Reducer/Taskreducer";

const store = configureStore({
    reducer : {
        todos : Taskreducer,
    }
})

export default store;