import { BrowserWindow, dialog, IpcMainEvent } from "electron";
import { readdirSync } from "fs";
import { OriginalData } from "../dto/OriginalData";
import Converter from "../util/Converter";
import getExtensionOfFilename from "../util/getExtensionOfFilename";
const shapefile = require("shapefile");
export default function fileOpen(event:IpcMainEvent,res:any[]){ 
    dialog
      .showOpenDialog({
        properties: ["openFile", "openDirectory"],
      })
      .then((results) => {
        if (!results.canceled) {
          let dir = results.filePaths[0];
          let files = readdirSync(results.filePaths[0]);
          const f = (name: string) =>
            getExtensionOfFilename(name).toLowerCase() === ".shp" &&
            ["a2_link.shp", "a1_node.shp", "c1_trafficlight.shp", "b2_surfacelinemark.shp", "c3_vehicleprotectionsafety.shp", "b3_surfacemark.shp", "c4_speedbump.shp"].includes(
              name.toLocaleLowerCase()
            );
          let shps = files.filter(f);
          const data = async () => {
            let od: OriginalData = {
              dir: "",
              a1_node: [],
              a2_link: [],
              b2_surfacelinemark: [],
              b3_surfacemark: [],
              c1_trafficlight: [],
              c3_vehicleprotectionsafety: [],
              c4_speedbump: [],
            };
            od.dir = dir;

            for (const shp of shps) {
              const source = await shapefile.open(dir + "/" + shp, dir + "/" + shp.replace(".shp", ".dbf"), { encoding: "euc-kr" });
              let done = false;
              // console.log(source._dbf._fields);
              do {
                let read = await source.read();
                if (read.done) {
                  done = read.done;
                  continue;
                } else {
                  if (shp.toLocaleLowerCase() === "a2_link.shp") {
                    od.a2_link.push(read.value);
                  }
                  if (shp.toLocaleLowerCase() === "a1_node.shp") {
                    od.a1_node.push(read.value);
                  }
                  if (shp.toLocaleLowerCase() === "b2_surfacelinemark.shp") {
                    od.b2_surfacelinemark.push(read.value);
                  }
                  if (shp.toLocaleLowerCase() === "b3_surfacemark.shp") {
                    od.b3_surfacemark.push(read.value);
                  }
                  if (shp.toLocaleLowerCase() === "c1_trafficlight.shp") {
                    od.c1_trafficlight.push(read.value);
                  }
                  if (shp.toLocaleLowerCase() === "c3_vehicleprotectionsafety.shp") {
                    od.c3_vehicleprotectionsafety.push(read.value);
                  }
                  if (shp.toLocaleLowerCase() === "c4_speedbump.shp") {
                    od.c4_speedbump.push(read.value);
                  }
                }
              } while (!done);
            }
            return od;
          };
          data().then((od) => {
            let data = Converter(od);
            event.sender.send("datrReceiver", { data: data, dir: od.dir, state:'ok' });
          });
        }else{
          event.sender.send("datrReceiver", {data:null, dir:null, state:'cancle'});
        }
      }).catch(e=>{
        event.sender.send("datrReceiver", {state:'error'});
      }).finally(()=>{

      });
}