export interface IBook {
    id:number,
    volumeInfo:{
        title:string,
    description:string,
    authors:string[],
    publishedDate:string,
    categories:string[]
    }
}