import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Books from "./books.entity";
import Categories from "./categories.entity";

@Entity('books_categories')
class Books_Categories {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Books, books => books.id)
    books: Books;

    @ManyToOne(() => Categories, categories => categories.id)
    categories: Categories;
}

export default Books_Categories;