import { Recipe } from '../recipes/recipe';

export class User {
    name: string;
    email: string;
    password: string;
    Recipes: Recipe[];
}