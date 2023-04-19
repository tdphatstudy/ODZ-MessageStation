const fs = require('fs');
const fsPromise = require('fs/promises');

const UserResoureManager = {
    createUserResoureDirectory: async(username) => {
        const dir_path = `resources/${username}`;
        try {
            await fsPromise.access(dir_path);
        } catch (error) {
            if (error.code == "ENOENT") {
                try {
                    await fsPromise.mkdir(dir_path);
                    
                  } catch (err) {
                    console.log(err)
                    throw new Error(`Lỗi tạo thư mục ${dir_path}`);
                  }
            } else {
                throw new Error('Lỗi truy cập vào vào thư mục');
            }
        }
        
    }
}

module.exports = UserResoureManager;