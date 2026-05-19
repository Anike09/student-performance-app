import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    enrolledCourses: [{
        courseId: {
            type: String,
            required: true
        },
        grade: {
            type: String,
            required: false
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Student = model('Student', studentSchema);

export default Student;