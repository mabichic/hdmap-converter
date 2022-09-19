export interface DataGridHeader {
  title: string,
  header: Array<Header>
}
export interface Header {
  key: string,
  name: string,
  editor?: string,
  editorParams?: any,
  editable?: boolean
}
export const LAYER_LN_LINK: DataGridHeader = {
  title: 'LAYER_LN_LINK',
  header: [
    { key: "ID", name: "ID", editor: "agTextCellEditor" },
    { key: "MID", name: "MID", editor: "agTextCellEditor" },
    { key: "LID", name: "LID", editor: "agTextCellEditor" },
    { key: "RID", name: "RID", editor: "agTextCellEditor" },
    { key: "InMID", name: "InMID", editor: "agTextCellEditor" },
    { key: "InLID", name: "InLID", editor: "agTextCellEditor" },
    { key: "InRID", name: "InRID", editor: "agTextCellEditor" },
    { key: "outMID", name: "outMID", editor: "agTextCellEditor" },
    { key: "outLID", name: "outLID", editor: "agTextCellEditor" },
    { key: "outRID", name: "outRID", editor: "agTextCellEditor" },
    {
      key: "Junction", name: "Junction", editor: "agTextCellEditor",
    },
    {
      key: "Type", name: "Type", editor: "agSelectCellEditor", editorParams: [
        "LANE_TYPE_NONE", "GEN_S", "JUN_S", "JUN_L", "JUN_R", "JUN_U", "POCKET_L", "POCKET_R", "JUN_UNPROTECTED_L",],
    },
    {
      key: "Sub_Type", name: "Sub_Type", editor: "agSelectCellEditor", editorParams: ["GEN", "BUS_ONLY", "HIGHPASS", "TURNAL"],
    },
    {
      key: "Twoway", name: "Twoway", editor: "agSelectCellEditor", editorParams: ["양방향", "일방"],
    },
    { key: "RLID", name: "RLID", editor: "agTextCellEditor" },
    {
      key: "LLinkID", name: "LLinkID", editor: "agTextCellEditor",
    },
    {
      key: "RLinkID", name: "RLinkID", editor: "agTextCellEditor",
    },
    {
      key: "SNodeID", name: "SNodeID", editor: "agTextCellEditor",
    },
    {
      key: "ENodeID", name: "ENodeID", editor: "agTextCellEditor",
    },
    { key: "Speed", name: "Speed", editor: "agTextCellEditor" },
    {
      key: "NumPoint", name: "NumPoint", editor: "agTextCellEditor",
    },
    {
      key: "PointXY", name: "PointXY", editor: "agLargeTextCellEditor",
    },
  ]
};

export const LAYER_LN_NODE: DataGridHeader = {
  title: 'LAYER_LN_NODE',
  header: [
    { key: 'ID', name: 'ID', editor: "agTextCellEditor" },
    { key: 'NumConLink', name: 'NumConLink', editor: "agTextCellEditor" },
    { key: 'LinkID', name: 'LinkID', editor: "agTextCellEditor" },
    { key: 'PointXY', name: 'PointXY', editor: "agLargeTextCellEditor" },
  ]
}

export const LAYER_ROADLIGHT : DataGridHeader = {
  title: 'LAYER_ROADLIGHT',
  header: [
  {key: 'ID', name: 'ID' , editor: "agTextCellEditor" },
  {key: 'LaneID', name: 'LaneID' , editor: "agTextCellEditor" },
  {key: 'Type', name: 'Type' , editor: "agSelectCellEditor"},
  {key: 'SubType', name: 'SubType' , editor: "agSelectCellEditor"},
  {key: 'Div', name: 'Div' , editor: "agSelectCellEditor"},
  {key: 'Div', name: 'U_Turn' , editor: "agSelectCellEditor"},
  {key: 'NumStopLine', name: 'NumStopLine' , editor: "agTextCellEditor" },
  {key: 'StopLineID', name: 'StopLineID' , editor: "agTextCellEditor" },
  {key: 'NumPoint', name: 'NumPoint' , editor: "agTextCellEditor" },
  {key: 'PointXY', name: 'PointXY' , editor: "agLargeTextCellEditor"},
]
}

export const LAYER_LANESIDE : DataGridHeader = {
  title: 'LAYER_LANESIDE',
  header: [
    {key: 'ID', name: 'ID' , editor: "agTextCellEditor" },
        {key: 'MID',name: 'MID',   editor: "agTextCellEditor"},
        {key: 'LaneID',name: 'LaneID',  editor: "agTextCellEditor"},
        {key: 'Type',name: 'Type',    editor: "agSelectCellEditor"},
        {key: 'Color',name: 'Color',  editor: "agSelectCellEditor"},
        {key: 'NumPoint',name: 'NumPoint',    editor: "agTextCellEditor"},
        {key: 'PointXY',name: 'PointXY',   editor: "agLargeTextCellEditor"},
  ]
}

export const LAYER_ROADMARK : DataGridHeader = {
  title: 'LAYER_ROADMARK',
  header: [
    {key: 'ID', name: 'ID' , editor: "agTextCellEditor" },
      {key: 'Type', name: 'Type' , editor: "agSelectCellEditor"},
      {key: 'SubType', name: 'SubType' , editor: "agSelectCellEditor"},
      {key: 'NumStopLine', name: 'NumStopLine' , editor: "agTextCellEditor" },
      {key: 'StopLineID', name: 'StopLineID' , editor: "agTextCellEditor"},
      {key: 'NumPoint', name: 'NumPoint' , editor: "agTextCellEditor" },
      {key: 'PointXY', name: 'PointXY' , editor: "agLargeTextCellEditor"},
  ]
}