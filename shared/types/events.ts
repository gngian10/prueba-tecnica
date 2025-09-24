export type TvShow = {
    id: number;
    name: string;
    image?: { medium?: string | null; original?: string | null } | null;
    genres?: string[];
    rating?: { average?: number | null } | null;
    summary?: string | null;
    premiered?: string | null;
    language?: string | null;
};
