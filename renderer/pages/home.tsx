import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import Loading from "../component/Loading";
import DataGrid from "../component/datagrid/Grid"
import { LAYER_LANESIDE, LAYER_LN_LINK, LAYER_LN_NODE, LAYER_ROADLIGHT, LAYER_ROADMARK } from "../component/datagrid/dto";
const FilePathBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "5px",
  border: "1 solid 000",
});
function Home() {
  const [filePath, setFilePath] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [linkData, setLinkData] = useState([]);
  const [nodeData, setNodeData] = useState([]);
  const [roadlightData, setRoadlightData] = useState([]);
  const [lanesideData, setLanesideData] = useState([]);
  const [roadmarkData, setRoadmarkData] = useState([]);
  const fileOpen = () => {
    setLoading(true);
    ipcRenderer.send("fileOpen", "Open");
  };
  const fileSave = () => {
    setLoading(true);
    ipcRenderer.send("fileSave", {
      LAYER_LN_LINK: linkData,
      LAYER_LN_NODE: nodeData,
      LAYER_ROADLIGHT: roadlightData,
      LAYER_LANESIDE: lanesideData,
      LAYER_ROADMARK: roadmarkData,
    });

  }
  useEffect(() => {
    ipcRenderer.on("datrReceiver", (event, res) => {
      if (res.state === "ok") {
        res.dir && setFilePath(res.dir);
        res.data.link && setLinkData(res.data?.link);
        res.data.node && setNodeData(res.data?.node);
        res.data.laneside && setLanesideData(res.data?.laneside);
        res.data.roadlight && setRoadlightData(res.data?.roadlight);
        res.data.roadmark && setRoadmarkData(res.data?.roadmark);
      }
      setLoading(false);
    });
    ipcRenderer.on("fileSaveReciver", (event, res) => {
     
      setLoading(false);
    });

  }, []);
  return (
    <>
      <Loading loading={loading} />
      <FilePathBox>
        <Typography>국토지리 정보원 포멧 Shapefile : </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={filePath}
        />
        <Button variant="contained" sx={{ margin: "5px" }} onClick={fileOpen}>
          열기
        </Button>
        <Button variant="contained" onClick={fileSave}> 저장</Button>
      </FilePathBox>
      <DataGrid dataHeader={LAYER_LN_LINK} rowData={linkData} />
      <DataGrid dataHeader={LAYER_LN_NODE} rowData={nodeData} />
      <DataGrid dataHeader={LAYER_LANESIDE} rowData={lanesideData} />
      <DataGrid dataHeader={LAYER_ROADLIGHT} rowData={roadlightData} />
      <DataGrid dataHeader={LAYER_ROADMARK} rowData={roadmarkData} />
    </>
  );
}

export default Home;
