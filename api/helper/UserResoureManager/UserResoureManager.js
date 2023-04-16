const fs = require('fs');
const fsPromise = require('fs/promises');

const UserResoureManager = {
    createUserResoure: async(username) => {
        try {
            const dir_path = `resources/${username}`;
            await fsPromise.access(dir_path);
        } catch (error) {
            if (error.code == "ENOENT") {
                try {
                    await fsPromise.mkdir(dir_path);
                    
                  } catch (err) {
                    throw new Error(`Lỗi tạo thư mục ${dir_path}`);
                  }
            } else {
                throw new Error('Lỗi truy cập vào vào thư mục');
            }
        }
        
    }
}

module.exports = UserResoureManager;