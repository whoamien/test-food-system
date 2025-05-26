import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { AdminUser } from "./entity/AdminUser";
import { Food } from "./entity/Food";
import { FoodCategory } from "./entity/FoodCategory";
import { Restaurant } from "./entity/Restaurant";
import { OpeningHour } from "./entity/OpeningHour";
import { Cart } from "./entity/Cart";
import { CartItem } from "./entity/CartItem";
import { Reservation } from "./entity/Reservation";
import { Table } from "./entity/Table";
import { Order } from "./entity/Order";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "www.waleservice.com",
  port: 3306,
  username: "test",
  password: "Pass1234+",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [
    User,
    Order,
    AdminUser,
    Food,
    FoodCategory,
    Restaurant,
    OpeningHour,
    Cart,
    CartItem,
    Reservation,
    Table,
  ],
  migrations: [],
  subscribers: [],
});
