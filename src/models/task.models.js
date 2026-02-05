import mongoose,{Schema} from "mongoose";

import {AvailableTaskStatus,TaskStatusEnum} from "../utils/constants.js"
import { Project } from "./project.models.js";


const taskSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,

    },
    description:String,
    Project:{
        type:Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    assignedTo:{
           type:Schema.Types.ObjectId,
           ref:"User"
    },
    status:{
        type:String,
        enum:AvailableTaskStatus,
        default:TaskStatusEnum.TODO
    },
    attachments:{
        type:[{
            url:String,
            mimetype:String,
            size:Number
        }],
        default: []
    }
})

export const Task = mongoose.model("Task",taskSchema)