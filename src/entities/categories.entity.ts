import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Books_Categories from "./books_categories.entity";

@Entity('categories')
class Categories {
    @PrimaryGeneratedColumn()
    id: number;

	@Column({ length: 60 })
    name: string;
    
    @ManyToOne(() => Books_Categories, books_categories => books_categories.categories)
    books_category: Books_Categories;
}

export default Categories;