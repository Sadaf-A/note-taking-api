const request = require("supertest");
const { app } = require("./app");

describe("API Endpoints", () => {
  let noteId;

  it("should create a new note", async () => {
    const response = await request(app)
      .post("/api/notes")
      .auth("user", "password")
      .send({
        title: "Test Note",
        content: "This is a test note.",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Test Note");
    expect(response.body.content).toBe("This is a test note.");
    noteId = response.body._id;
  });

  it("should get all notes", async () => {
    const response = await request(app)
      .get("/api/notes/get")
      .auth("user", "password"); 

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should update a note", async () => {
    const response = await request(app)
      .put(`/api/notes/${noteId}`)
      .auth("user", "password")
      .send({
        title: "Updated Test Note",
        content: "This is the updated test note.",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Updated Test Note");
    expect(response.body.content).toBe("This is the updated test note.");
  });

  it("should delete a note", async () => {
    const response = await request(app)
      .delete(`/api/notes/${noteId}`)
      .auth("user", "password"); 

    expect(response.statusCode).toBe(200);
  });
});
