import type { Event } from './enjoy.dto';

class TripDto {
  range: { start: string; end: string };
  depart_name: string;
  depart: [number, number];
  arrive_name: string;
  arrive: [number, number];
  routing_type: string;
  activities?: Array<Event>;

  constructor(data: any) {
    this.range = data.range;
    this.depart_name = data.depart_name;
    this.depart = data.depart;
    this.arrive_name = data.arrive_name;
    this.arrive = data.arrive;
    this.routing_type = data.routing_type;
    this.activities = data.activities;
  }
}

export default TripDto;
