import req from "../services/request";

class Dashboard {
    async dashboard() {
        try {
            const res = await req.get("/api/dashboard/");
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default Dashboard;
