export type PowerValuationDetailsModel = {
    response: string,
    data:Data[],

}


export type Data = {

    id:number;
    trade:number;
    begtime:Date;
    endtime:Date;
}