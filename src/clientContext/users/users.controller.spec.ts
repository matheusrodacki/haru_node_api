import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = new User();
  mockUser.id = 1;
  mockUser.name = 'Test User';
  mockUser.email = 'test@example.com';

  const usersServiceMock = {
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockUser]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a user by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockUser);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      organizationId: 1,
    };
    const result = await controller.create(createUserDto);
    expect(result).toEqual(mockUser);
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });

  // Adicione testes para os métodos update e remove
});
