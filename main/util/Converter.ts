import {
  a1_node,
  a2_link,
  b2_surfacelinemark,
  b3_surfacemark,
  c1_trafficlight,
  c3_vehicleprotectionsafety,
  c4_speedbump,
  OriginalData,
} from "../dto/OriginalData";
import {
  LAYER_LANESIDE,
  LAYER_LN_LINK,
  LAYER_LN_NODE,
  LAYER_ROADLIGHT,
  LAYER_ROADMARK,
} from "../dto/ConverterData";
import { number } from "prop-types";
const proj4 = require("proj4");
const epsg5186 =
  "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
const wgs84 =
  "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";
const ITRF_2000_UTM_K =
  "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs +type=crs";

const coorTrans = (coordinates: Array<any>) => {
  return proj4(ITRF_2000_UTM_K, epsg5186, coordinates);
};
// const coorToString = (pointXY: Array<any>) => {};
export default function Converter(obj: OriginalData) {
  let nodes: Map<string, LAYER_LN_NODE> = new Map();
  let links: Map<string, LAYER_LN_LINK> = new Map();
  let roadlights: Map<string, LAYER_ROADLIGHT> = new Map();
  let lanesides: Map<string, LAYER_LANESIDE> = new Map();
  let roadmarks: Map<string, LAYER_ROADMARK> = new Map();

  obj["a2_link"].forEach((ob: a2_link, index) => {
    let link = new LAYER_LN_LINK(links.size + 1);
    let pointXY: string = "";
    ob.geometry.coordinates.forEach((arr) => {
      pointXY += coorTrans(arr).join(" ").trim();
      pointXY += " ";
    });
    link.NumPoint = ob.geometry.coordinates.length;
    link.PointXY = pointXY.trim();
    links.set(ob.properties["ID"], link);
  });
  obj["a1_node"].forEach((ob: a1_node, index) => {
    let node = new LAYER_LN_NODE(nodes.size + 1);
    node.PointXY = coorTrans(ob.geometry.coordinates).join(" ").trim();
    nodes.set(ob.properties["ID"], node);
  });
  obj["b2_surfacelinemark"].forEach((ob: b2_surfacelinemark, index) => {
    if (ob.properties["Kind"] === "530") {
      let roadmark = new LAYER_ROADMARK(roadmarks.size + 1);
      roadmark.Type = 7;
      let firstPoint = coorTrans(ob.geometry.coordinates[0]);
      let lastPoint = coorTrans(
        ob.geometry.coordinates[ob.geometry.coordinates.length - 1]
      );
      roadmark.NumPoint = 5;

      let x1: number = firstPoint[0];
      let x2: number = lastPoint[0];
      let y1: number = firstPoint[1];
      let y2: number = lastPoint[1];

      let a: number =
        (0.5 * (y2 - y1)) /
        Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      let b: number =
        (0.5 * (x2 - x1)) /
        Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      let point_1 = x1 + a + " " + (y1 - b);
      let point_2 = x2 + a + " " + (y2 - b);
      let point_3 = x2 - a + " " + (y2 + b);
      let point_4 = x1 - a + " " + (y1 + b);
      let point_5 = point_1;
      roadmark.PointXY = (
        point_1 +
        " " +
        point_2 +
        " " +
        point_3 +
        " " +
        point_4 +
        " " +
        point_5
      ).trim();
      roadmarks.set(ob.properties["ID"], roadmark);
    } else {
      let laneside = new LAYER_LANESIDE(lanesides.size + 1);
      laneside.Type = 1;
      if (ob.properties["Type"].substring(0, 1) === "3") laneside.Color = 2;
      if (ob.properties["Type"].substring(0, 1) === "1") laneside.Color = 1;
      if (ob.properties["Type"].substring(1, 3) === "11") laneside.Type = 1;
      if (ob.properties["Type"].substring(1, 3) === "12") laneside.Type = 2;
      if (ob.properties["Type"].substring(1, 3) === "13") laneside.Type = 2;
      if (ob.properties["Type"].substring(1, 3) === "14") laneside.Type = 2;
      if (ob.properties["Type"].substring(1, 3) === "21") laneside.Type = 3;
      if (ob.properties["Type"].substring(1, 3) === "22") laneside.Type = 3;
      if (ob.properties["Type"].substring(1, 3) === "23") laneside.Type = 3;
      if (ob.properties["Type"].substring(1, 3) === "24") laneside.Type = 3;

      laneside.NumPoint = ob.geometry.coordinates.length;
      let pointXY = "";
      ob.geometry.coordinates.forEach((arr) => {
        pointXY += coorTrans(arr).join(" ").trim();
        pointXY += " ";
      });
      laneside.PointXY = pointXY.trim();
      lanesides.set(ob.properties["ID"], laneside);
    }
  });
  obj["b3_surfacemark"].forEach((ob: b3_surfacemark, index) => {
    let roadmark = new LAYER_ROADMARK(roadmarks.size + 1);
    if (ob.properties.Type === "1") roadmark.Type = 3;
    if (ob.properties.Type === "5") roadmark.Type = 1;

    if (ob.properties.Kind === "5371") roadmark.SubType = 1;
    if (ob.properties.Kind === "5372") roadmark.SubType = 2;
    if (ob.properties.Kind === "5373") roadmark.SubType = 3;
    if (ob.properties.Kind === "5381") roadmark.SubType = 4;
    if (ob.properties.Kind === "5382") roadmark.SubType = 5;
    if (ob.properties.Kind === "5391") roadmark.SubType = 6;
    if (ob.properties.Kind === "5383") roadmark.SubType = 7;
    if (ob.properties.Kind === "5392") roadmark.SubType = 8;
    if (ob.properties.Kind === "5374") roadmark.SubType = 9;

    let pointXY = "";
    let coor: Array<any> = ob.geometry.coordinates[0];
    coor.forEach((arr: Array<any>) => {
      pointXY += coorTrans(arr).join(" ").trim();
      pointXY += " ";
    });
    roadmark.NumPoint = ob.geometry.coordinates[0].length;
    roadmark.PointXY = pointXY.trim();
    roadmarks.set(ob.properties["ID"], roadmark);
  });

  obj["c1_trafficlight"].forEach((ob: c1_trafficlight, index) => {
    let roadlight = new LAYER_ROADLIGHT(roadlights.size + 1);
    roadlight.NumPoint = 2;
    roadlight.PointXY =
      coorTrans(ob.geometry.coordinates).join(" ").trim() +
      " " +
      coorTrans(ob.geometry.coordinates).join(" ").trim();
    roadlights.set(ob.properties["ID"], roadlight);
  });
  obj["c3_vehicleprotectionsafety"].forEach(
    (ob: c3_vehicleprotectionsafety, index) => {
      let laneside = new LAYER_LANESIDE(lanesides.size + 1);
      laneside.Type = 4;
      let pointXY = "";
      ob.geometry.coordinates.forEach((arr) => {
        pointXY += coorTrans(arr).join(" ").trim();
        pointXY += " ";
      });
      laneside.NumPoint = ob.geometry.coordinates.length;
      laneside.PointXY = pointXY;
      lanesides.set(ob.properties["ID"], laneside);
    }
  );
  obj["c4_speedbump"].forEach((ob: c4_speedbump, index) => {
    let roadmark = new LAYER_ROADMARK(roadmarks.size + 1);
    roadmark.Type = 2;
    let coor: Array<any> = ob.geometry.coordinates[0];
    let pointXY = "";
    coor.forEach((arr) => {
      pointXY += coorTrans(arr).join(" ").trim();
      pointXY += " ";
    });
    roadmark.NumPoint = ob.geometry.coordinates[0].length;
    roadmark.PointXY = pointXY.trim();
    roadmarks.set(ob.properties["ID"], roadmark);
  });

  // ID부여를 위해 forEach 한번 더 돌림
  obj["a2_link"].forEach((ob: a2_link, index) => {
    let link: LAYER_LN_LINK = links.get(ob.properties.ID);
    if (nodes.get(ob.properties.FromNodeID)) {
      link.SNodeID = nodes.get(ob.properties.FromNodeID).ID;
      nodes.get(ob.properties.FromNodeID).LinkID.push(link.ID);
      nodes.get(ob.properties.FromNodeID).NumConLink++;
    }
    if (nodes.get(ob.properties.ToNodeId)) {
      link.ENodeID = nodes.get(ob.properties.ToNodeId).ID;
      nodes.get(ob.properties.ToNodeId).LinkID.push(link.ID);
      nodes.get(ob.properties.ToNodeId).NumConLink++;
    }

    link.LLinkID =
      ob.properties.L_LinkID !== null
        ? links.get(ob.properties.L_LinkID)
          ? links.get(ob.properties.L_LinkID).ID
          : 0
        : 0;
    link.RLID =
      ob.properties.R_LinkID !== null
        ? links.get(ob.properties.R_LinkID)
          ? links.get(ob.properties.R_LinkID).ID
          : 0
        : 0;
    if (ob.properties.MaxSpeed != null)
      link.Speed = parseInt(ob.properties.MaxSpeed);
  });

  obj["c1_trafficlight"].forEach((ob: c1_trafficlight) => {
    let roadlight = roadlights.get(ob.properties.ID);
    if (links.get(ob.properties.LinkID)) {
      roadlight.LaneID = links.get(ob.properties.LinkID).ID;
      links.get(ob.properties.LinkID).RLID = roadlight.ID;
    }
  });
  let result = {
    node: [],
    link: [],
    roadlight: [],
    laneside: [],
    roadmark: [],
  };
  const objsToResult = (objs: Map<any, any>, type: string) => {
    objs.forEach((obj) => {
      result[type].push(obj);
    });
  };
  objsToResult(links, "link");
  objsToResult(nodes, "node");
  objsToResult(lanesides, "laneside");
  objsToResult(roadlights, "roadlight");
  objsToResult(roadmarks, "roadmark");
  return result;
}
