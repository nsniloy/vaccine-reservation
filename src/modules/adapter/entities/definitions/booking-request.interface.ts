export class IBookingPayload {
    _id?: any;
    IPAddress: string;
    TokenId: string;
    ResultId: string;
    TrackingId: string;
    Itinerary: IItinerary
}

export class IItinerary {
    Segments: IBookingPayloadSegment[];
    Passenger: IPayloadPassenger[];
    ValidatingAirlineCode: string;
    JourneyType: number;
    Destination: string;
    Origin: string;
    LastTicketDate?: string;
    TravelDate?: string;
    CreatedOn?: string;
    SearchType: number;
    NonRefundable: boolean;
    AgentRefNo: string;
    IsDomestic: boolean;
    IsLcc: boolean;
    AirlineRemark?: string;
    EarnedLoyaltyPoints?: string;
    StaffRemarks?: string;
    PointOfSale: string;
    RequestOrigin: string;
    UserData: string
}

export class IPayloadPassenger {
    Title: string;
    FirstName: string;
    LastName: string;
    Type: string;
    DateOfBirth: Date;
    Gender: string;
    PassportNo: string;
    PassportExpiry: Date;
    AddressLine1: string;
    AddressLine2?: string;
    Nationality: {
        CountryCode: string;
        CountryName: string;
    };
    Country: {
        CountryCode: string;
        CountryName: string;
    };
    City: {
        CountryCode: string;
        CityCode: string;
        CityName: string;
    };
    Meal?: {
        Code: string;
        Description: string
    };
    Seat?: string;
    Mobile1: string;
    Mobile1CountryCode: string;
    Email: string;
    IsLeadPax: boolean;
    FFAirline?: string;
    FFNumber?: string;
    Fare: IFare
}

export class IFare {
    TotalFare: number;
    OtherCharges: number;
    AgentMarkup: number;
    ServiceFee: number;
    BaseFare: number;
    Tax: number
}

export interface Origin {
    AirportCode: string;
    AirportName: string;
    CityCode: string;
    CityName: string;
    CountryCode: string;
    CountryName: string;
    Terminal: string;
}

export interface Destination {
    AirportCode: string;
    AirportName: string;
    CityCode: string;
    CityName: string;
    CountryCode: string;
    CountryName: string;
    Terminal: string;
}

export interface AirlineDetails {
    AirlineCode: string;
    FlightNumber: string;
    Craft: string;
    AirlineName: string;
    OperatingCarrier: string;
    AllianceInfo?: any;
}


export class IBookingPayloadSegment{
    NoOfSeatAvailable: number;
    AllianceInfo?: any;
    FlightInfoIndex?: any;
    OperatingCarrier: string;
    SegmentIndicator: number;
    Airline: string;
    Origin: Origin;
    Destination: Destination;
    FlightNumber: string;
    DepartureTime: Date;
    ArrivalTime: Date;
    BookingClass: string;
    AvailabiLity?: any;
    FlightStatus: number;
    Status?: any;
    MealType?: any;
    ETicketEligible: boolean;
    AirlinePNR: string;
    Craft: string;
    StopOver: boolean;
    Stops: number;
    Mile: number;
    Duration: string;
    GroundTime: string;
    AccumulatedDuration: string;
    StopPoint: string;
    StopPointArrivalTime: Date;
    StopPointDepartureTime: Date;
    IncludedBaggage: string;
    CabinBaggage: string;
    CabinClass: string;
    AdditionalBaggage?: any;
    AirlineDetails: AirlineDetails;
    AirlineName: string;
    DepartureDateTime?: any;
    DepartureDate?: any;
    ArrivalDateTime?: any;
    ArrivalDate?: any;
    LayoverText?: any;
    InFlightServices?: any;
}