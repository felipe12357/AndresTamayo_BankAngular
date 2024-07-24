export type Product ={
    id:string,
    name:string,
    description:string;
    logo:string;
    date_release:Date;
    date_revision:Date
}

export type ProductsDTO = {
    data:Product[]
}