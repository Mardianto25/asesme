export class Jobs {
    id: string;
    title: string;
    position_id: number;
    location: string;
    min_salary: number;
    max_salary: number;
    show_salary: string;
    experience: string;
    education:string;
    type_of_work: string;
    expire_date: string;
    description: string;
    count_view: number;
    count_share: number;
    hrd_id: number;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    slug: string;
    institution_id: number

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}