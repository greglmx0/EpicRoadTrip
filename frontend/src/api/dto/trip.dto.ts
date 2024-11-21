import type { Event } from './enjoy.dto';

class TripDto {
  range: Array<string>;
  depart: Array<number>;
  arrive: Array<number>;
  routingType: string;
  listActivities?: Array<Event>;

  constructor(data: any) {
    this.range = data.range;
    this.depart = data.depart;
    this.arrive = data.arrive;
    this.routingType = data.routingType;
    this.listActivities = data.listActivities;
  }
}

export default TripDto;
