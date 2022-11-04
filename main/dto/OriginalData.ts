export interface OriginalData {
  dir : string;
  a2_link: Array<a2_link>;
  a1_node: Array<a1_node>;
  b2_surfacelinemark: Array<b2_surfacelinemark>;
  b3_surfacemark: Array<b3_surfacemark>;
  c1_trafficlight: Array<c1_trafficlight>;
  c3_vehicleprotectionsafety: Array<c3_vehicleprotectionsafety>;
  c4_speedbump: Array<c4_speedbump>;
}

export interface a2_link {
  Type: string;
  properties: {
    ID: string;
    AdminCode: string;
    RoadRank: string;
    RoadType: string;
    RoadNo: string;
    LinkType: string;
    MaxSpeed: string;
    LaneNo: string;
    R_LinkID: string;
    L_LinkID: string;
    FromNodeID: string;
    ToNodeID: string;
    SectionID: string;
    Length: string;
    ITSLinkID: string;
    Maker: string;
    UpdateDate: string;
    Version: string;
    Remark: string;
    HistType: string;
    HistRemark: string;
  };
  geometry: {
    type: string;
    coordinates: Array<Array<number>>;
  };
}

export interface a1_node {
  Type: string;
  properties: {
    ID: string;
    AdminCode: string;
    NodeType: string;
    ITSNodeID: string;
    Maker: string;
    UpdateDate: string;
    Version: string;
    Remark: string;
    HistType: string;
    HistRemark: string;
  };
  geometry: {
    type: string;
    coordinates: Array<number>;
  };
}

export interface b2_surfacelinemark {
  Type: string;
  properties: {
    ID: string;
    AdminCode: string;
    Type: string;
    Kind: string;
    R_linkID: string;
    L_linkID: string;
    Maker: string;
    UpdateDate: string;
    Version: string;
    Remark: string;
    HistType: string;
    HistRemark: string;
  };
  geometry: {
    type: string;
    coordinates: Array<Array<number>>;
  };
}
export interface b3_surfacemark {
  Type: string;
  properties: {
    ID: string;
    AdminCode: string;
    Type: string;
    Kind: string;
    LinkID: string;
    Maker: string;
    UpdateDate: string;
    Version: string;
    Remark: string;
    HistType: string;
    HistRemark: string;
  };
  geometry: {
    type: string;
    coordinates: Array<Array<number>>;
  };
}

export interface c1_trafficlight {
  Type: string;
  properties: {
    ID: string;
    AdminCode: string;
    Type: string;
    LinkID: string;
    Ref_Lane: number,
    Maker: string;
    postID: string;
    UpdateDate: string;
    Version: string;
    Remark: string;
    HistType: string;
    HistRemark: string;
  };
  geometry: {
    type: string;
    coordinates: Array<number>;
  };
}
export interface c3_vehicleprotectionsafety {
  Type: string;
  properties: {
    ID: string;
    AdminCode: string;
    Type: string;
    isCentral: string;
    LowHigh: string;
    Ref_ID:string;
    Maker: string;
    UpdateDate: string;
    Version: string;
    Remark: string;
    HistType: string;
    HistRemark: string;
  };
  geometry: {
    type: string;
    coordinates: Array<Array<number>>;
  };
}

export interface c4_speedbump {
  Type: string;
  properties: {
    ID: string;
    AdminCode: string;
    Type: string;
    LinkID: string;
    Ref_Lane: number,
    Maker: string;
    UpdateDate: string;
    Version: string;
    Remark: string;
    HistType: string;
    HistRemark: string;
  };
  geometry: {
    type: string;
    coordinates: Array<Array<number>>;
  };
}





