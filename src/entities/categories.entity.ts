import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Books_Categories from "./books_categories.entity";

@Entity('categories')
class Categories {
    @PrimaryGeneratedColumn()
    id: number;

	@Column({ length: 60 })
    name: string;
    
    @OneToMany(() => Books_Categories, books_categories => books_categories.id)
    books_category: Books_Categories;
}

export default Categories;