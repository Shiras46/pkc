export interface Blog {
    id: string;
    _id?: string;
    title: string;
    slug: string;
    category: string;
    content: string;
    image: string;
    author?: string;
    date: string;
    published?: boolean;
    metaTitle?: string;
    metaDescription?: string;
}
