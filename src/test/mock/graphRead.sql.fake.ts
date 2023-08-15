import { GraphRead } from 'src/graphRead/domain/entities/graphRead.type';

export const graphReadDataFake: GraphRead = {
  water: 80,
  humidity: [
    {
      sensor1: 10,
      sensor2: 3,
      date: new Date(),
    },
    {
      sensor1: 20,
      sensor2: 34,
      date: new Date(),
    },
    {
      sensor1: 4,
      sensor2: 2,
      date: new Date(),
    },
    {
      sensor1: 43,
      sensor2: 222,
      date: new Date(),
    },
  ],
};
