const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')



const Schema = mongoose.Schema;

// Tạo 1 model mới - có temple
//Create Time và update Time nó tự tạo - thêm đối số thứ 2
const Course = new Schema({
    URL: { type: String},
    level: { type: String },
    //Slug tự động thêm
    flag: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
})//trong model này có nhiều loại ràng buộc có thể set thêm

//Khu vực add Plugin

mongoose.plugin(slug);
//đối số thứ 2 là ghi override hết - đối số thứ 3 là thêm trường xóa lúc nào vào DB
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})


//export model ra - nếu trg DB chưa có thì khi gọi Model này thì cũng sẽ tạo thêm dựa trên temple của model đó
module.exports = mongoose.model('course', Course);
//Thêm một tiền tố thứ 3 để chỉ định Collection
//Tiền tố thứ 1 dùng để chỉ định Collection nào đc map tới Model đó (đéo hiểu sao ko có s vẫn đúng)
//Tiền tố thứ 1 cũng chẳng phân biệt hoa thường