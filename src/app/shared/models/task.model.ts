export class Task {
    id?: number;
    description: string;
    position: number;
    label: string;
    createdDate: Date;
    updatedDate?: Date;
    isActive: boolean;
}