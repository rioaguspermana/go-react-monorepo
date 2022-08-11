import req from "../services/request";

class Employee {
    async list() {
        try {
            const res = await req.get("/api/employee/");
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async create(data: TEmployee) {
        try {
            const res = await req.post("/api/employee/", data);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async get(id: number) {
        try {
            const res = await req.get("/api/employee/" + id);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async update(data: TEmployee) {
        try {
            const res = await req.put("/api/employee/" + data.id, data);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async delete(id: number) {
        try {
            const res = await req.delete("/api/employee/" + id);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default Employee;
