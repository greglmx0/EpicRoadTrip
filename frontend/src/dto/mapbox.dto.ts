export interface MapBoxTrip {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

export interface Waypoint {
  distance: number;
  name: string;
  location: number[];
}

export interface Route {
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
}

export interface Geometry {
  coordinates: number[][];
  type: string;
}

interface Leg {
  via_waypoints: any[];
  admins: Admin[];
  weight: number;
  duration: number;
  steps: Step[];
  distance: number;
  summary: string;
}

interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

interface Step {
  intersections: Intersection[];
  maneuver: Maneuver;
  name: string;
  duration: number;
  distance: number;
  driving_side: string;
  weight: number;
  mode: string;
  geometry: Geometry;
  ref?: string;
  destinations?: string;
  exits?: string;
  rotary_name?: string;
}

interface Intersection {
  bearings: number[];
  entry: boolean[];
  mapbox_streets_v8?: MapboxStreetsV8;
  is_urban?: boolean;
  admin_index: number;
  out?: number;
  geometry_index: number;
  location: number[];
  in?: number;
  turn_weight?: number;
  turn_duration?: number;
  duration?: number;
  weight?: number;
  stop_sign?: boolean;
  yield_sign?: boolean;
  lanes?: Lane[];
  traffic_signal?: boolean;
  classes?: string[];
  toll_collection?: TollCollection;
}

interface MapboxStreetsV8 {
  class: string;
}

interface Lane {
  indications: string[];
  valid_indication?: string;
  valid: boolean;
  active: boolean;
}

interface TollCollection {
  name: string;
  type: string;
}

interface Maneuver {
  type: string;
  instruction: string;
  bearing_after: number;
  bearing_before: number;
  location: number[];
  modifier?: string;
  exit?: number;
}
