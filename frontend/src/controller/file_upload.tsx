import req from "../services/request";

interface IFileCreate {
  file?: File;
  type: string;
}

interface IFileUpdate {
  file?: File;
  type: string;
  id: number;
}

class FileUpload {
  async create(fc: IFileCreate, config: object) {
    try {
      let form_data = new FormData();
      Object.entries(fc).forEach((value) => {
        form_data.append(value[0], value[1]);
      });
      const res = await req.post("/api/assist/file/create", form_data, config);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async update(fu: IFileUpdate, config: object) {
    try {
      let form_data = new FormData();
      Object.entries(fu).forEach((value) => {
        form_data.append(value[0], value[1]);
      });
      const res = await req.post("/api/assist/file/update", form_data, config);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default FileUpload;
