export interface IBook {
    id:string,
    volumeInfo:{
    title:string,
    description:string,
    authors?:string[],
    publishedDate?:string,
    categories?:string[]
    }
}