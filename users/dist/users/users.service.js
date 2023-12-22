"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async create(createUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    async findOne(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new common_1.NotFoundException('Invalid id');
        }
        const user = this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.userModel.findById(id);
    }
    async remove(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new common_1.NotFoundException('Invalid id');
        }
        const user = this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.userModel.findByIdAndDelete(id, { new: true });
    }
    async update(id, updateUserDto) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new common_1.NotFoundException('Invalid id');
        }
        const user = this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map