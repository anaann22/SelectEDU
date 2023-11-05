const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
         required: true,
    },
    y2s1: {
        type: Boolean, // 0 -> nu are optionala ......... if (y1s1 == 0) nu afiseaza 
    },
    y2s2: {
        type: Boolean,
    },
    y3s1: {
        type: Boolean, // 0 -> nu are optionala ......... if (y1s1 == 0) nu afiseaza 
    },
    y3s2: {
        type: Boolean,
    }
})