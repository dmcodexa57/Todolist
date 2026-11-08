
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const path = require('path');

// =====================================
// CONFIGURATION SWAGGER
// =====================================

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo List API (Learning campus)',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'https://todolist-pied-alpha-78.vercel.app',
                description: 'API en production sur Vercel'
            }
        ]
    },
    apis: [path.join(__dirname, 'app.js')]
};

const openapiSpecification = swaggerJsdoc(options);

// =====================================
// CRÉATION DE L'APPLICATION
// =====================================

const app = express();

app.use(cors());
app.use(bodyParser.json());

// =====================================
// CONFIGURATION SWAGGER UI
// =====================================

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(openapiSpecification)
);

// =====================================
// LISTE DES TÂCHES
// =====================================

const todos = [
    {
        todolist: [
            {
                id: 1,
                text: "Learn about Polymer",
                created_at: "Mon Apr 26 06:01:55 +0000 2015",
                Tags: ["Web Development", "Web Components"],
                is_complete: true
            },
            {
                id: 2,
                text: "Watch Pluralsight course on Docker",
                created_at: "Tue Mar 02 07:01:55 +0000 2015",
                Tags: ["Devops", "Docker"],
                is_complete: true
            },
            {
                id: 3,
                text: "Complete presentation prep for Aurelia presentation",
                created_at: "Wed Mar 05 10:01:55 +0000 2015",
                Tags: ["Presentation", "Aureia"],
                is_complete: false
            },
            {
                id: 4,
                text: "Instrument creation of development environment with Puppet",
                created_at: "Fri June 30 13:00:00 +0000 2015",
                Tags: ["Devops", "Puppet"],
                is_complete: false
            },
            {
                id: 5,
                text: "Transition code base to ES6",
                created_at: "Mon Aug 01 10:00:00 +0000 2015",
                Tags: ["ES6", "Web Development"],
                is_complete: false
            },
            {
                id: 6,
                text: "Daploy website",
                created_at: "Mon Aug 01 10:00:00 +0000 2015",
                Tags: ["ES6", "Web Development"],
                is_complete: false
            },
            {
                id: 7,
                text: "Make all testing",
                created_at: "Mon Aug 01 10:00:00 +0000 2015",
                Tags: ["ES6", "Web Development"],
                is_complete: false
            },
            {
                id: 8,
                text: "Send messages to run Team",
                created_at: "Mon Aug 01 10:00:00 +0000 2015",
                Tags: ["ES6", "Web Development"],
                is_complete: false
            },
            {
                id: 9,
                text: "Close Project",
                created_at: "Mon Aug 01 10:00:00 +0000 2015",
                Tags: ["ES6", "Web Development"],
                is_complete: false
            }
        ]
    }
];

// =====================================
// ROUTE GET : RÉCUPÉRER LES TÂCHES
// =====================================

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Récupérer toutes les tâches
 *     responses:
 *       200:
 *         description: Liste des tâches récupérée avec succès
 */

app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

// =====================================
// ROUTE POST : CRÉER UNE TÂCHE
// =====================================

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Créer une nouvelle tâche
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               Tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               is_complete:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 */

app.post('/todos', (req, res) => {
    const newTodo = {
        id: Math.max(0, ...todos[0].todolist.map(t => t.id)) + 1,
        text: req.body.text,
        created_at: new Date().toISOString(),
        Tags: req.body.Tags || [],
        is_complete: req.body.is_complete || false
    };

    todos[0].todolist.push(newTodo);

    res.status(201).json(newTodo);
});

// =====================================
// ROUTE GET : RÉCUPÉRER UNE TÂCHE PAR ID
// =====================================

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Récupérer une tâche par son identifiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tâche récupérée avec succès
 *       404:
 *         description: Tâche introuvable
 */

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todo = todos[0].todolist.find(t => t.id === id);

    if (!todo) {
        return res.status(404).send('Todo not found');
    }

    res.status(200).json(todo);
});

// =====================================
// ROUTE PUT : MODIFIER UNE TÂCHE
// =====================================

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Modifier une tâche
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               Tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               is_complete:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tâche modifiée avec succès
 *       404:
 *         description: Tâche introuvable
 */

app.put('/todos/:id', (req, res) => {
    const index = todos[0].todolist.findIndex(
        t => t.id == req.params.id
    );

    if (index >= 0) {
        todos[0].todolist[index] = {
            ...todos[0].todolist[index],
            ...req.body
        };

        res.status(200).json(todos[0].todolist[index]);
    } else {
        res.status(404).send("Todo not found");
    }
});

// =====================================
// ROUTE DELETE : SUPPRIMER UNE TÂCHE
// =====================================

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Supprimer une tâche
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tâche supprimée avec succès
 *       404:
 *         description: Tâche introuvable
 */

app.delete('/todos/:id', (req, res) => {
    const index = todos[0].todolist.findIndex(
        t => t.id == req.params.id
    );

    if (index >= 0) {
        todos[0].todolist.splice(index, 1);

        res.status(200).send("Todo deleted successfully");
    } else {
        res.status(404).send("Todo not found");
    }
});

// =====================================
// EXPORTER L'APPLICATION POUR JEST
// =====================================

module.exports = app;

// =====================================
// DÉMARRER LE SERVEUR
// =====================================

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}
