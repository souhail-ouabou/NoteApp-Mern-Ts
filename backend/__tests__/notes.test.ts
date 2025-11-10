import app from "../src/app";
import NoteModel from '../src/models/note';
import mongoose from "mongoose";
import request from "supertest";    

const testUserId = new mongoose.Types.ObjectId();

// Mock the auth middleware BEFORE importing the app
jest.mock("../middelware/auth", () => ({
  requiresAuth: (req: any, res: any, next: any) => {
    req.session = {
      userId: testUserId,
      destroy: jest.fn((cb) => cb && cb()),
      reload: jest.fn((cb) => cb && cb()),
      save: jest.fn((cb) => cb && cb()),
      touch: jest.fn(),
      regenerate: jest.fn((cb) => cb && cb()),
      cookie: {
        originalMaxAge: 3600000,
        maxAge: 3600000,
        secure: false,
        httpOnly: true,
        path: '/',
      },
    };
    next();
  },
}));

describe("Notes API", () => {
  beforeEach(async () => {
    // Ensure clean state before each test
    await NoteModel.deleteMany({});
  });

  it("should create a note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .send({ title: "Test note", text: "Note content" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test note");
    expect(res.body.text).toBe("Note content");
  });

  it("should fetch notes for the user", async () => {
    // Create a note first
    await NoteModel.create({
      userId: testUserId,
      title: "Fetched note",
      text: "Will be fetched",
    });

    const res = await request(app).get("/api/notes");
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Fetched note");
  });

  it("should update a note", async () => {
    const note = await NoteModel.create({
      userId: testUserId,
      title: "Old title",
      text: "Old text",
    });

    const res = await request(app)
      .patch(`/api/notes/${note._id}`)
      .send({ title: "Updated title", text: "New text" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated title");
    expect(res.body.text).toBe("New text");
  });

  it("should delete a note", async () => {
    const note = await NoteModel.create({
      userId: testUserId,
      title: "To delete",
      text: "Bye",
    });

    const res = await request(app).delete(`/api/notes/${note._id}`);
    
    expect(res.status).toBe(204);
    
    // Verify deletion
    const deletedNote = await NoteModel.findById(note._id);
    expect(deletedNote).toBeNull();
  });
});