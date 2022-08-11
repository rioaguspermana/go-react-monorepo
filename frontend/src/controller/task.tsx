import req from "../services/request";

class Task {
    async list() {
        try {
            const res = await req.get("/api/task/");
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async create(data: TTask) {
        try {
            const res = await req.post("/api/task/", data);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async get(id: number) {
        try {
            const res = await req.get("/api/task/" + id);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async update(data: TTask) {
        try {
            const res = await req.put("/api/task/" + data.id, data);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async delete(id: number) {
        try {
            const res = await req.delete("/api/task/" + id);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default Task;
