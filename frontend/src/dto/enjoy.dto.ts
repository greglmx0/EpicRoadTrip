class EnjoyDto {
  id: string;
  category: string;
  name: string;
  venue?: string;
  location: string;
  description?: string;
  genre?: string;
  link: string;
  extraLink?: string;
  dateTime: string;
  latitude: string;
  longitude: string;
  picture?: string;
  priceRangeMin?: number;
  priceRangeMax?: number;

  constructor(data: Event) {
    this.id = data.id;
    this.category = 'enjoy';
    this.name = data?.name;
    this.venue = data?._embedded?.venues?.[0]?.name;
    this.location = data?._embedded?.venues?.[0]?.city?.name;
    this.description = data.description;
    this.genre = data.classifications?.[0]?.genre?.name;
    this.link = data.url;
    this.extraLink = data?._embedded?.attractions?.[0]?.url;
    this.dateTime = data.dates?.start?.dateTime;
    this.latitude = data._embedded?.venues?.[0]?.location?.latitude;
    this.longitude = data._embedded?.venues?.[0]?.location?.longitude;
    this.picture = data.images?.[0]?.url;
    this.priceRangeMin = data.priceRanges?.[0]?.min;
    this.priceRangeMax = data.priceRanges?.[0]?.max;
  }
}

export default EnjoyDto;

export interface Event {
  name: string;
  type: string;
  id: string;
  test: boolean;
  description?: string;
  url: string;
  locale: string;
  images: Image[];
  distance: number;
  units: string;
  sales: Sales;
  dates: Dates;
  classifications: Classification[];
  promoter?: Promoter;
  promoters?: Promoter2[];
  priceRanges?: PriceRange[];
  accessibility: Accessibility;
  ticketLimit?: TicketLimit;
  ageRestrictions: AgeRestrictions;
  ticketing: Ticketing;
  _links: Links;
  _embedded: Embedded2;
}

export interface Image {
  ratio?: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface Sales {
  public: Public;
}

export interface Public {
  startDateTime: string;
  startTBD: boolean;
  startTBA: boolean;
  endDateTime: string;
}

export interface Dates {
  start: Start;
  timezone: string;
  status: Status;
  spanMultipleDays: boolean;
}

export interface Start {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

export interface Status {
  code: string;
}

export interface Classification {
  primary: boolean;
  segment: Segment;
  genre: Genre;
  subGenre: SubGenre;
  type: Type;
  subType: SubType;
  family: boolean;
}

export interface Segment {
  id: string;
  name: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface SubGenre {
  id: string;
  name: string;
}

export interface Type {
  id: string;
  name: string;
}

export interface SubType {
  id: string;
  name: string;
}

export interface Promoter {
  id: string;
}

export interface Promoter2 {
  id: string;
}

export interface PriceRange {
  type: string;
  currency: string;
  min: number;
  max: number;
}

export interface Accessibility {
  id?: string;
}

export interface TicketLimit {
  id: string;
}

export interface AgeRestrictions {
  legalAgeEnforced: boolean;
  id?: string;
}

export interface Ticketing {
  safeTix: SafeTix;
  allInclusivePricing: AllInclusivePricing;
  id?: string;
}

export interface SafeTix {
  enabled: boolean;
  inAppOnlyEnabled?: boolean;
}

export interface AllInclusivePricing {
  enabled: boolean;
}

export interface Links {
  self: Self;
  attractions?: Attraction[];
  venues: Venue[];
}

export interface Self {
  href: string;
}

export interface Attraction {
  href: string;
}

export interface Venue {
  href: string;
}

export interface Embedded2 {
  venues: Venue2[];
  attractions?: Attraction2[];
}

export interface Venue2 {
  name?: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  distance: number;
  units: string;
  postalCode: string;
  timezone: string;
  city: City;
  country: Country;
  address: Address;
  location: Location;
  markets: Market[];
  dmas: Dma[];
  upcomingEvents: UpcomingEvents;
  ada?: Ada;
  _links: Links2;
}

export interface City {
  name: string;
}

export interface Country {
  countryCode: string;
}

export interface Address {
  line1: string;
}

export interface Location {
  longitude: string;
  latitude: string;
}

export interface Market {
  id: string;
}

export interface Dma {
  id: number;
}

export interface UpcomingEvents {
  ticketmaster: number;
  _total: number;
  _filtered: number;
}

export interface Ada {}

export interface Links2 {
  self: Self2;
}

export interface Self2 {
  href: string;
}

export interface Attraction2 {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  externalLinks?: ExternalLinks;
  images: Image2[];
  classifications: Classification2[];
  upcomingEvents: UpcomingEvents2;
  _links: Links3;
}

export interface ExternalLinks {
  facebook?: Facebook[];
  musicbrainz?: Musicbrainz[];
  youtube?: Youtube[];
  twitter?: Twitter[];
  itunes?: Itune[];
  spotify?: Spotify[];
  instagram?: Instagram[];
  homepage?: Homepage[];
  wiki?: Wiki[];
  lastfm?: Lastfm[];
}

export interface Facebook {
  url: string;
}

export interface Musicbrainz {
  id: string;
}

export interface Youtube {
  url: string;
}

export interface Twitter {
  url: string;
}

export interface Itune {
  url: string;
}

export interface Spotify {
  url: string;
}

export interface Instagram {
  url: string;
}

export interface Homepage {
  url: string;
}

export interface Wiki {
  url: string;
}

export interface Lastfm {
  url: string;
}

export interface Image2 {
  ratio?: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface Classification2 {
  primary: boolean;
  segment: Segment2;
  genre: Genre2;
  subGenre: SubGenre2;
  type: Type2;
  subType: SubType2;
  family: boolean;
}

export interface Segment2 {
  id: string;
  name: string;
}

export interface Genre2 {
  id: string;
  name: string;
}

export interface SubGenre2 {
  id: string;
  name: string;
}

export interface Type2 {
  id: string;
  name: string;
}

export interface SubType2 {
  id: string;
  name: string;
}

export interface UpcomingEvents2 {
  universe?: number;
  ticketmaster: number;
  _total: number;
  _filtered: number;
  'mfx-dk'?: number;
  ticketnet?: number;
  'mfx-se'?: number;
  ticketweb?: number;
  'mfx-nl'?: number;
  'mfx-pl'?: number;
  'mfx-be'?: number;
  'mfx-no'?: number;
  tmr?: number;
  'mfx-cz'?: number;
}

export interface Links3 {
  self: Self3;
}

export interface Self3 {
  href: string;
}
