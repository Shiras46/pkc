export const galleryCategories = [
    "All",
    "Catering Setups",
    "Decorations",
    "Events & Celebrations",
] as const;

export type GalleryCategory = string;

export type GalleryItem = {
    id?: number | string;
    _id?: string;
    category: string;
    src: string;
    alt?: string;
};

export const galleryItems: GalleryItem[] = [
    { id: 1, category: "Catering Setups", src: "/image/gallery/catering section/DSC01918.webp" },
    { id: 2, category: "Catering Setups", src: "/image/gallery/catering section/DSC01931.webp" },
    { id: 3, category: "Catering Setups", src: "/image/gallery/catering section/DSC01952.webp" },
    { id: 4, category: "Catering Setups", src: "/image/gallery/catering section/DSC01977.webp" },
    { id: 5, category: "Catering Setups", src: "/image/gallery/catering section/DSC01979.webp" },
    { id: 6, category: "Catering Setups", src: "/image/gallery/catering section/DSC02202.webp" },
    { id: 7, category: "Catering Setups", src: "/image/gallery/catering section/PMU05304.webp" },
    { id: 8, category: "Catering Setups", src: "/image/gallery/catering section/PMU05320.webp" },
    { id: 9, category: "Decorations", src: "/image/gallery/decoration/a65sqsjlwtcvds0jlbtg.webp" },
    { id: 10, category: "Decorations", src: "/image/gallery/decoration/erkqiziwwjiquypin6j2.webp" },
    { id: 11, category: "Decorations", src: "/image/gallery/decoration/jdwoka4a7nrarxb2xb7r.webp" },
    { id: 12, category: "Decorations", src: "/image/gallery/decoration/vy8zosgf1unuxey8akxu.webp" },
    { id: 13, category: "Decorations", src: "/image/gallery/decoration/wxgtk3kbupudkt80tl0l.webp" },
    { id: 14, category: "Decorations", src: "/image/gallery/decoration/x8fnzaqes2fybbmwvsyv.webp" },
    { id: 15, category: "Decorations", src: "/image/gallery/decoration/xvkpwclut7bfbu7qg7hr.webp" },
    { id: 16, category: "Events & Celebrations", src: "/image/gallery/event and celebration/ARU00286.webp" },
    { id: 17, category: "Events & Celebrations", src: "/image/gallery/event and celebration/ARU00399.webp" },
    { id: 18, category: "Events & Celebrations", src: "/image/gallery/event and celebration/ARU00550.webp" },
    { id: 19, category: "Events & Celebrations", src: "/image/gallery/event and celebration/ARU00604.webp" },
    { id: 20, category: "Events & Celebrations", src: "/image/gallery/event and celebration/DSC02054.webp" },
    { id: 21, category: "Events & Celebrations", src: "/image/gallery/event and celebration/DSC02817.webp" },
    { id: 22, category: "Events & Celebrations", src: "/image/gallery/event and celebration/DSC05902.webp" },
    { id: 23, category: "Events & Celebrations", src: "/image/gallery/event and celebration/DSC06009.webp" },
    { id: 24, category: "Events & Celebrations", src: "/image/gallery/event and celebration/DSC06291.webp" },
    { id: 25, category: "Events & Celebrations", src: "/image/gallery/event and celebration/DSC06939.webp" },
    { id: 26, category: "Events & Celebrations", src: "/image/gallery/event and celebration/DSC07971.webp" },
    { id: 27, category: "Events & Celebrations", src: "/image/gallery/event and celebration/DSC09437.webp" },
    { id: 28, category: "Events & Celebrations", src: "/image/gallery/event and celebration/KLN00695.webp" },
    { id: 29, category: "Events & Celebrations", src: "/image/gallery/event and celebration/KLN01987.webp" },
];
