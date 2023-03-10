import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import Books from "./books.entity";

@Entity("pages")
class Pages {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  page: number;

  @Column()
  chapter: number;

  @Column({ default: false })
  isChapter: boolean;

  @Column({ length: 120 })
  chapterTitle: string;

  @Column({ length: 1800 })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Books, (books) => books.pages)
  books: Books;
}

export default Pages;
