import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import Books from "./books.entity";

@Entity('pages')
class Pages {
    @PrimaryGeneratedColumn('uuid')
    id: string;

	@Column()
    page: number;

    @Column()
    chapter: number;

    @Column({default: false})
    isChapter: boolean;

    @Column({ length: 120 })
    chapterTitle: 280;
	
	@CreateDateColumn()
    createdAt: Date;

	@OneToMany(() => Books, books => books.id)
    books: Books;
}

export default Pages;