import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

// Prepare to the database running on Mongodb cloud.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to the database.
const db = mongoose.connection;

// The open event is called when the connection is succsesfully opened.
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


// Defines the Schema.
const projectSchema = mongoose.Schema({
    name: {type: String, required: true},
    status: {type: String, required: true},
    description: {type: String, required: true}, 
    link: {type: String, required: false},
    date: {type: String, required: true}
});

// Mongoose Model that creates the Javascript class Project.
const Project = mongoose.model("Project", projectSchema);

/**
* Create an Project
* @param {String} name
* @param {String} status
* @param {String} description
* @param {String} link
* @param {String} date
* @returns A promise. Resolves to the JavaScript  for the document created by calling save.
*/
const createProject = async(name, status, description, link, date) => {
    // Call the constructor to create an instance of the model class Project
    const project = new Project({name: name, status: status, description: description, link: link, date: date});
    // Call save to persist this object as a document in MongoDB
    return project.save();
};

const findProjects = async(filter) => {
    const query = Project.find(filter);
    return query.exec();
};

const findProjectById = async (_id) => {
    const query = Project.findById(_id);
    return query.exec();
}

/**
* Replace the name, reps, weight, unit,  and date properties of the Exercise with the id value provided.
* @param {String} _id
* @param {String} name
* @param {Number} status
* @param {Number} description
* @param {String} link
* @param {String} date
* @returns A promise. Resolves to the JavaScript  for the document created by calling save.
*/
const replaceProject = async (_id, name, status, description, link, date) => {
    const result = await Project.replaceOne({ _id: _id}, { name: name, status: status, description: description, link: link, date: date });
    return result.modifiedCount;
}

const deleteById = async (_id) => {
    const result = await Project.deleteOne({ _id: _id });
    return result.deletedCount;
}

export {createProject, findProjects, findProjectById, replaceProject, deleteById};