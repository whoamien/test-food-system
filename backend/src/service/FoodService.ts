import { AppDataSource } from "../data-source";
import { Food } from "../entity/Food";
import { FoodCategory } from "../entity/FoodCategory";
import { Restaurant } from "../entity/Restaurant";

export class FoodService {
  private foodRepository = AppDataSource.getRepository(Food);
  private categoryRepository = AppDataSource.getRepository(FoodCategory);
  private restaurantRepository = AppDataSource.getRepository(Restaurant);

  // Create a new Food
  async createFood(data: {
    name: string;
    description?: string;
    price: number;
    categoryId?: number;
    restaurantId?: number;
    image_url?: string;
    available?: boolean;
  }): Promise<Food> {
    const food = new Food();
    food.name = data.name;
    food.description = data.description || "";
    food.price = data.price;
    food.image_url = data.image_url || "";
    food.available = data.available !== undefined ? data.available : true;
    food.status = "active";

    if (data.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: data.categoryId,
      });
      if (category) food.category = category;
    }
    if (data.restaurantId) {
      const restaurant = await this.restaurantRepository.findOneBy({
        id: data.restaurantId,
      });
      if (restaurant) food.restaurant = restaurant;
    }

    return await this.foodRepository.save(food);
  }

  // Get Foods with search and pagination
  async getFoodsWithFilter(options: {
    search?: string;
    categoryId?: number;
    restaurantId?: number;
    available?: boolean;
    minPrice?: number;
    maxPrice?: number;
    status?: "active" | "deleted";
    page?: number;
    pageSize?: number;
  }): Promise<{
    data: Food[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const {
      search,
      categoryId,
      restaurantId,
      available,
      minPrice,
      maxPrice,
      status = "active",
      page = 1,
      pageSize = 10,
    } = options;

    const qb = this.foodRepository
      .createQueryBuilder("food")
      .leftJoinAndSelect("food.category", "category")
      .leftJoinAndSelect("food.restaurant", "restaurant")
      .where("food.status = :status", { status });

    if (search) {
      qb.andWhere("(food.name LIKE :search OR food.description LIKE :search)", {
        search: `%${search}%`,
      });
    }
    if (categoryId) {
      qb.andWhere("food.category = :categoryId", { categoryId });
    }
    if (restaurantId) {
      qb.andWhere("food.restaurant = :restaurantId", { restaurantId });
    }
    if (available !== undefined) {
      qb.andWhere("food.available = :available", { available });
    }
    if (minPrice !== undefined) {
      qb.andWhere("food.price >= :minPrice", { minPrice });
    }
    if (maxPrice !== undefined) {
      qb.andWhere("food.price <= :maxPrice", { maxPrice });
    }

    const take = Math.max(1, Number(pageSize));
    const skip = (Math.max(1, Number(page)) - 1) * take;

    qb.skip(skip).take(take);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      page: Number(page),
      pageSize: take,
      totalPages: Math.ceil(total / take),
    };
  }

  // Get Food by ID
  async getFoodById(id: number): Promise<Food | null> {
    return await this.foodRepository.findOne({
      where: { id },
      relations: ["category", "restaurant"],
    });
  }

  // Update Food by ID
  async updateFood(
    id: number,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      categoryId: number;
      restaurantId: number;
      image_url: string;
      available: boolean;
      status: "active" | "deleted";
    }>,
  ): Promise<Food | null> {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food) return null;

    if (data.name !== undefined) food.name = data.name;
    if (data.description !== undefined) food.description = data.description;
    if (data.price !== undefined) food.price = data.price;
    if (data.image_url !== undefined) food.image_url = data.image_url;
    if (data.available !== undefined) food.available = data.available;
    if (data.status !== undefined) food.status = data.status;

    if (data.categoryId !== undefined) {
      const category = await this.categoryRepository.findOneBy({
        id: data.categoryId,
      });
      if (category) food.category = category;
    }
    if (data.restaurantId !== undefined) {
      const restaurant = await this.restaurantRepository.findOneBy({
        id: data.restaurantId,
      });
      if (restaurant) food.restaurant = restaurant;
    }

    return await this.foodRepository.save(food);
  }

  // "Delete" Food by ID (soft delete)
  async deleteFood(id: number): Promise<boolean> {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food) return false;
    food.status = "deleted";
    await this.foodRepository.save(food);
    return true;
  }
}
