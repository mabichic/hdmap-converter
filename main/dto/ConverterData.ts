export class LAYER_LN_LINK {
  ID: number;
  MID: number;
  LID: number;
  RID: number;
  InMID: number;
  InLID: number;
  InRID: number;
  outMID: number;
  outLID: number;
  outRID: number;
  Junction: number;
  Type: number;
  Sub_Type: number;
  Twoway: number;
  RLID: number;
  LLinkID: number;
  RLinkID: number;
  SNodeID: number;
  ENodeID: number;
  Speed: number;
  NumPoint: number;
  PointXY: string;
  constructor(id: number) {
    this.ID = id;
    this.MID = 0;
    this.LID = 0;
    this.RID = 0;
    this.InMID = 0;
    this.InLID = 0;
    this.InRID = 0;
    this.outMID = 0;
    this.outLID = 0;
    this.outRID = 0;
    this.Junction = 0;
    this.Type = 0;
    this.Sub_Type = 0;
    this.Twoway = 0;
    this.RLID = 0;
    this.LLinkID = 0;
    this.RLinkID = 0;
    this.SNodeID = 0;
    this.ENodeID = 0;
    this.Speed = 0;
    this.NumPoint = 0;
    this.PointXY = "";
  }
}
export class LAYER_LN_NODE {
  ID: number;
  NumConLink: number;
  LinkID: Array<number>;
  PointXY: string;
  constructor(id: number) {
    this.ID = id;
    this.NumConLink = 0;
    this.LinkID = [];
    this.PointXY = "";
  }
}

export class LAYER_LANESIDE {
  ID: number;
  MID: number;
  LaneID: number;
  Type: number;
  Color: number;
  NumPoint: number;
  PointXY: string;
  constructor(id: number) {
    this.ID = id;
    this.MID = 0;
    this.LaneID = 0;
    this.Type = 0;
    this.Color = 0;
    this.NumPoint = 0;
    this.PointXY = "";
  }
}

export class LAYER_ROADMARK {
  ID: number;
  Type: number;
  SubType: number;
  NumStopLine: number;
  StopLineID: Array<Number>;
  NumPoint: number;
  PointXY: string;
  constructor(id: number) {
    this.ID = id;
    this.Type = 0;
    this.SubType = 0;
    this.NumStopLine = 0;
    this.StopLineID = [];
    this.NumPoint = 0;
    this.PointXY = "";
  }
}

export class LAYER_ROADLIGHT { 
  ID: number;
  LaneID: number;
  Type: number;
  SubType: number;
  Div: number;
  NumStopLine: number;
  StopLineID: Array<number>;
  NumPoint: number;
  PointXY: string;
  constructor(id:number){ 
    this.ID = id; 
    this.LaneID =0 ;
    this.Type = 0 ; 
    this.SubType = 0 ;
     this.Div = 0;
     this.NumStopLine = 0; 
     this.StopLineID = []; 
     this.NumPoint = 0;
      this.PointXY = ""; 
  }
}
