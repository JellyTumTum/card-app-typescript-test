import { server } from "../src/server"
import request from 'supertest';
import Prisma from "../src/db";

// describe("server test", () => {
//   it("should assert 1 + 1 is 2", () => {
//     expect(1 + 1).toEqual(2);
//   });
// });

describe('GET /get/ - Retrieve all entries', () => {
    it('should return all entries with status code 200', async () => {
        const response = await request("http://localhost:3001")
            .get('/get/');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });
});

describe('GET /get/:id - Retrieve an entry by ID', () => {
    let createdEntryId: string;

    beforeAll(async () => {

        // new entry for testing purposes
        const createdEntryResponse = await request("http://localhost:3001")
            .post('/create/')
            .send({
                title: 'Test Card for a get Test',
                description: 'Test Card for a get Test',
                created_at: new Date().toISOString(),
                scheduled_for: new Date().toISOString()
            });

        createdEntryId = createdEntryResponse.body.id;  // to avoid recreating another if needed
        console.log(createdEntryId)
    });

    afterAll(async () => {
        await Prisma.entry.delete({ where: { id: createdEntryId } });
    });

    it('should return an entry with a valid ID', async () => {
        const response = await request("http://localhost:3001")
            .get(`/get/${createdEntryId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdEntryId);
        expect(response.body).toHaveProperty('title', 'Test Card for a get Test');
        expect(response.body).toHaveProperty('description', 'Test Card for a get Test');
    });

    it('should return status 500 for an invalid ID', async () => {
        const invalidId = 'non-existent-id';

        const response = await request("http://localhost:3001")
            .get(`/get/${invalidId}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('msg', `Error finding entry with id ${invalidId}`);
    });
});

describe('POST /create/ - Create a new card', () => {
    let createdCardId: string;


    afterAll(async () => {
        if (createdCardId) {
            await Prisma.entry.delete({ where: { id: createdCardId } });
        }
    });

    it('should create a new card successfully', async () => {
        const newCard = {
            "title": "Test Card",
            "description": "Test Card",
            "created_at": "2024-10-01T00:00:00.000Z",
            "scheduled_for": "2024-10-01T00:00:00.000Z"
        }
        console.log(newCard.title)

        const response = await request("http://localhost:3001")
            .post('/create/')
            .send(newCard);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title', 'Test Card');
        expect(response.body).toHaveProperty('description', 'Test Card');

        createdCardId = response.body.id;

        // checking database to confirm
        const createdCard = await Prisma.entry.findUnique({ where: { id: createdCardId } });
        expect(createdCard).not.toBeNull();
        expect(createdCard?.title).toBe('Test Card');
    });

    it('should fail when creating a card with missing required fields', async () => {
        const incompleteCard = {
            description: 'Missing title for this card',
            created_at: "2024-10-01",
            scheduled_for: "2024-10-01"
        };

        // missing title (works same as any other missing information)
        const response = await request("http://localhost:3001")
            .post('/create/')
            .send(incompleteCard);
        expect(response.status).toBeGreaterThanOrEqual(400);
    });
});

describe('PUT /update/:id - Editing Scheduling Date', () => {
    let createdEntryId: string;

    beforeAll(async () => {

        const createdEntryResponse = await request("http://localhost:3001")
            .post('/create/')
            .send({
                title: 'Card for the 1st November',
                description: 'I feel it may need to be the 2nd November though...',
                created_at: "2024-11-01",
                scheduled_for: "2024-11-01"
            });

        createdEntryId = createdEntryResponse.body.id;
        console.log(createdEntryId)
    });

    afterAll(async () => {
        await Prisma.entry.delete({ where: { id: createdEntryId } });
    });

    it('should return a succesful message ', async () => {
        const editedCard = {
            id: createdEntryId,
            title: 'Card for the 1st November',
            description: 'I feel it may need to be the 2nd November though...',
            created_at: "2024-11-01",
            scheduled_for: "2024-11-02"
        };
        const response = await request("http://localhost:3001")
            .put(`/update/${createdEntryId}`)
            .send(editedCard);
        
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('msg', "Updated successfully");
    });
});