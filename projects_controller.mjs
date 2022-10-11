import 'dotenv/config';
import * as projects from './projects_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
 * Create a new project with the name, status, description, link, and date provided in the body
 */
app.post('/projects', (req, res) => {
    const validStatus = ["In Progress", "Completed"]
    if (validStatus.includes(req.body.status) !== true || isDateValid(req.body.date) !== true) {
        console.log.error
        res.status(400).json({ Error: 'Invalid request'});
    }
    else {
        projects.createProject(req.body.name, req.body.status, req.body.description, req.body.link, req.body.date)
            .then(project => {
                res.status(201).json(project);
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: 'Invalid request'});
            });
    }
});


/**
 * Retrive the project corresponding to the ID provided in the URL.
 */
app.get('/projects/:_id', (req, res) => {
    const projectId = req.params._id;
    projects.findProjectById(projectId)
        .then(project => {
            if (project !== null) {
                res.json(project)
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid request'});
        });
});

/**
 * Retrieve projects. 
 */
app.get('/projects', (req, res) => {
    const filter = {};
    if (req.query.name !== undefined){
        filter.name = (req.query.name)
    };
    if (req.query.status !== undefined){
        filter.status = (req.query.status)
    };
    if (req.query.description !== undefined){
        filter.description = (req.query.description)
    };
    if (req.query.link !== undefined){
        filter.link = (req.query.link)
    };
    if (req.query.date !== undefined){
        filter.date = (req.query.date)
    };

    projects.findProjects(filter)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Invalid request'});
    });
});

/**
 * Update the project whose id is provided in the path parameter and set
 * it to the values provided in the body.
 */
 app.put('/projects/:_id', (req, res) => {
    const validStatus = ["In Progress", "Completed"]
    if (typeof(req.body.name) !== "string" || (typeof(req.body.description) !== "string" || typeof(req.body.link) !== "string" || validStatus.includes(req.body.status) !== true || isDateValid(req.body.date) !== true)) {
        console.log.error
        res.status(400).json({ Error: 'Invalid request'});
    }
    else {
    projects.replaceProject(req.params._id, req.body.name, req.body.status, req.body.description, req.body.link, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, status: req.body.status, description: req.body.description, link: req.body.link, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Not found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid request'});
        });
    }
});

/**
 * Delete the project whose id is provided in the query parameters
 */
 app.delete('/projects/:_id', (req, res) => {
    projects.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Invalid request' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);

app.get('/', (req, res) => {
    res.send('App is running.');
})
});