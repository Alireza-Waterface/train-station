export interface Station {
   id: number;
   name: string;
   city: string;
   lat: number;
   lng: number;
   searchString: string;
}

export interface StationState {
   selectedStationId: number | null;
   cityFilter: string;
}
