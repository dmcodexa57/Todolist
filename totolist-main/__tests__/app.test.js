
const request = require('supertest');
const app = require('../app');

// =====================================
// TEST DE L'API TODO
// =====================================

describe('API TodoList', () => {

    test('GET /todos doit retourner la liste des tâches', async () => {

        const response = await request(app).get('/todos');

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body[0]).toHaveProperty('todolist');

    });

});
test('GET /todos/1 doit retourner une tâche précise', async () => {

    const response = await request(app).get('/todos/1');

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty('id', 1);

    expect(response.body).toHaveProperty('text');

});
test('POST /todos doit créer une nouvelle tâche', async () => {

    const nouvelleTache = {
        text: "Tester Jest",
        Tags: [],
        is_complete: false
    };

    const response = await request(app)
        .post('/todos')
        .send(nouvelleTache);

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty('id');

    expect(response.body.text).toBe("Tester Jest");

});
test('PUT /todos/1 doit modifier une tâche', async () => {

    const modification = {
        text: "Tâche modifiée",
        Tags: [],
        is_complete: true
    };

    const response = await request(app)
        .put('/todos/1')
        .send(modification);

    expect(response.statusCode).toBe(200);

    expect(response.body.text).toBe("Tâche modifiée");

    expect(response.body.is_complete).toBe(true);

});
test('DELETE /todos/1 doit supprimer une tâche', async () => {

    const response = await request(app)
        .delete('/todos/1');

    expect(response.statusCode).toBe(200);

});