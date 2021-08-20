export interface ICentre {
    _id?: any;
    name: string;
    address: string;
    vaccination_duration: number; //the needed time to complete vaccination for each person (in minutes)
}