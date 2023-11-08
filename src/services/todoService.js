// An updated API service to handle CRUD operations for todos with error handling

const BASE_URL = "https://64407795792fe886a88f6162.mockapi.io/api/todos";

const todoService = {
  // Fetch all todos
  getTodos: async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Error fetching todos");
      }
      return await response.json();
    } catch (error) {
      console.error("getTodos failed:", error);
      // Handle the error according to your app's needs, e.g., show a notification
    }
  },

  // Fetch a single todo by id
  getTodo: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching todo with id ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`getTodo failed for id ${id}:`, error);
      // Handle the error according to your app's needs
    }
  },

  // Create a new todo
  createTodo: async (data) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error creating new todo");
      }
      return await response.json();
    } catch (error) {
      console.error("createTodo failed:", error);
      // Handle the error according to your app's needs
    }
  },

  // Update an existing todo
  updateTodo: async (id, data) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error updating todo with id ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`updateTodo failed for id ${id}:`, error);
      // Handle the error according to your app's needs
    }
  },

  // Delete a todo
  deleteTodo: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting todo with id ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`deleteTodo failed for id ${id}:`, error);
      // Handle the error according to your app's needs
    }
  },
};

export default todoService;
