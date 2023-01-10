import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import Author from "./author.entity";
import Books_Categories from "./books_categories.entity";
import Pages from "./pages.entity";

@Entity('books')
class Books {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length:100, unique: true })
    title: string;

    @Column({ length: 120 })
    about: 280;

    @Column({ length: 350 })
    coverUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Author, author => author.id)
    author: Author;

	@OneToMany(() => Pages, pages => pages.books)
    pages: Pages;

    @OneToMany(() => Books_Categories, books_categories => books_categories.id)
    books_categories: Books_Categories;
}

export default Books;