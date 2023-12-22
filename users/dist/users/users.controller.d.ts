import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./entity/users.interface").IUser[]>;
    create(createUserDto: CreateUserDto): Promise<import("./entity/users.interface").IUser>;
    findOne(id: string): Promise<import("./entity/users.interface").IUser>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entity/users.interface").IUser>;
    remove(id: string): Promise<import("./entity/users.interface").IUser>;
}
