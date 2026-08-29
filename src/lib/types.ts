export interface Blog {
    id: string;
    title: string;
    slug: string;
    category: "Wedding Planning Tips" | "Catering & Menu Guides" | "Event Trends";
    content: string;
    image: string;
    author: string;
    date: string;
    published: boolean;
    metaTitle?: string;
    metaDescription?: string;
}
