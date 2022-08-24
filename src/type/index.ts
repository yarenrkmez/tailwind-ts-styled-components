export type Product = {
    id: number,
    name: string,
    image: string,
    disabled: boolean,
    price: number,
    discount_percentage: number,
    brand: string,
    discounted_price?: number
}

export type TableItem = {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    user_name: string,
    create_date: string,
    update_date: string,
    status: string,
    role: string,
    user_id: string
}