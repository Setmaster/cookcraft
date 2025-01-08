export interface Recipe {
    id: number;
    userId: number;
    Title: string;
    Description: string;
    imageUrl?: string;
    Ingredients: string[];
    Instructions: string[];
    AdditionalInformation?: {
        PrepTime?: string;
        CookTime?: string;
        TotalTime?: string;
        Yield?: string;
        CaloriesPerServing?: string;
    };
    dateCreated?: Date;
}
