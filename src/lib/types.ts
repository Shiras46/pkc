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
    showCta?: boolean;
    ctaEyebrow?: string;
    ctaTitle?: string;
    ctaDescription?: string;
    ctaButtonText?: string;
    ctaButtonLink?: string;
    ctaSecondaryText?: string;
    ctaSecondaryLink?: string;
    ctaPhone?: string;
    ctaEmail?: string;
}

