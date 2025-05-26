import { Request, Response } from "express";
import { FoodService } from "../service/FoodService";

export class FoodController {
  private foodService = new FoodService();

  // Public: List all foods (with search & pagination)
  async list(req: Request, res: Response): Promise<Response> {
    const {
      search,
      categoryId,
      restaurantId,
      available,
      minPrice,
      maxPrice,
      status,
      page,
      pageSize,
    } = req.query;

    const result = await this.foodService.getFoodsWithFilter({
      search: search as string,
      categoryId: categoryId ? Number(categoryId) : undefined,
      restaurantId: restaurantId ? Number(restaurantId) : undefined,
      available: available !== undefined ? available === "true" : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      status: (status as "active" | "deleted") || "active",
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 10,
    });
    return res.status(200).json(result);
  }

  // Public: Get food by ID
  async get(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const food = await this.foodService.getFoodById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found." });
    }
    return res.status(200).json(food);
  }

  // Admin only: Create food
  async create(req: Request, res: Response): Promise<Response> {
    if (!(req as any).user || !(req as any).user.username) {
      return res.status(403).json({ message: "Admin authorization required." });
    }
    const {
      name,
      description,
      price,
      categoryId,
      restaurantId,
      image_url,
      available,
    } = req.body;
    const food = await this.foodService.createFood({
      name,
      description,
      price,
      categoryId,
      restaurantId,
      image_url,
      available,
    });
    return res.status(201).json(food);
  }

  // Admin only: Update food
  async update(req: Request, res: Response): Promise<Response> {
    if (!(req as any).user || !(req as any).user.username) {
      return res.status(403).json({ message: "Admin authorization required." });
    }
    const id = Number(req.params.id);
    const {
      name,
      description,
      price,
      categoryId,
      restaurantId,
      image_url,
      available,
      status,
    } = req.body;
    const food = await this.foodService.updateFood(id, {
      name,
      description,
      price,
      categoryId,
      restaurantId,
      image_url,
      available,
      status,
    });
    if (!food) {
      return res.status(404).json({ message: "Food not found." });
    }
    return res.status(200).json(food);
  }

  // Admin only: Delete food (soft delete)
  async delete(req: Request, res: Response): Promise<Response> {
    if (!(req as any).user || !(req as any).user.username) {
      return res.status(403).json({ message: "Admin authorization required." });
    }
    const id = Number(req.params.id);
    const success = await this.foodService.deleteFood(id);
    if (!success) {
      return res.status(404).json({ message: "Food not found." });
    }
    return res.status(204).send();
  }
}
