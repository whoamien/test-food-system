import { AppDataSource } from "../data-source"; // Adjust the path to your data source file
import { FoodCategory } from "../entity/FoodCategory";

export class FoodCategoryService {
    private foodCategoryRepository = AppDataSource.getRepository(FoodCategory);

    // Create a new FoodCategory
    async createFoodCategory(name: string): Promise<FoodCategory> {
        const foodCategory = this.foodCategoryRepository.create({ name });
        return await this.foodCategoryRepository.save(foodCategory);
    }

    // Get all FoodCategories
    async getAllFoodCategories(): Promise<FoodCategory[]> {
        return await this.foodCategoryRepository.find();
    }

    // Get a FoodCategory by ID
    async getFoodCategoryById(id: number): Promise<FoodCategory | undefined> {
        return await this.foodCategoryRepository.findOneBy({ id });
    }

    // Update a FoodCategory by ID
    async updateFoodCategory(id: number, name: string): Promise<FoodCategory | null> {
        const foodCategory = await this.foodCategoryRepository.findOneBy({ id });
        if (!foodCategory) {
            return null;
        }
        foodCategory.name = name;
        return await this.foodCategoryRepository.save(foodCategory);
    }

    // Delete a FoodCategory by ID
    async deleteFoodCategory(id: number): Promise<boolean> {
        const result = await this.foodCategoryRepository.delete(id);
        return result.affected !== 0;
    }
}