import { iBooksData, IListBooksResponse } from "../../../interfaces/books.interface";

export class ListBooksMapper {
  static func(data: iBooksData): IListBooksResponse {
    const category = data.books_categories.map((el) => el.categories.name);

    return {
      id: data.id,
      title: data.title,
      about: data.about,
      category,
      coverUrl: data.coverUrl,
      author: {
        id: data.author.id,
        email: data.author.email,
        name: data.author.name,
        city: data.author.city,
        country: data.author.country,
      },
    };
  }
}
