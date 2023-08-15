export interface GraphReadDto {
  water: number;
  humidity: {
    sensor1: number;
    sensor2: number;
    date: Date;
  }[];
}
