//Viết hàm connect tới mongoDB

const mongoose = require('mongoose');

async function connect() {

    try {
        //await mongoose.connect('mongodb+srv://namdone:ANhQ9mhwjv7bUEG@cluster0.b8gjm.mongodb.net/3Block?authSource=admin&replicaSet=atlas-fawitb-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
        await mongoose.connect('mongodb://127.0.0.1:27017/3Block', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        //Không bắn log thì khả năng cao là fail rồi
        console.log('Fail connect');
    }
}

//export function thì gọi chỉ cần gọi function thôi - xem connect trong file index bên ngoài để chi tiết
module.exports = { connect };

//muốn connect thêm database thì tạo thêm 1 function rồi export thôi