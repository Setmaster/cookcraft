export type Recipe = {
    Data: {
        Title: string;
        Description: string;
        Ingredients: string[];
        Instructions: string[];
        AdditionalInformation?: {
            PrepTime?: string;
            CookTime?: string;
            TotalTime?: string;
            Yield?: string;
            NutritionInformation?: string;
        };
    };
};
