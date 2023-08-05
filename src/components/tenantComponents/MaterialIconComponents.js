import React, { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Notifications from "@material-ui/icons/Notifications";
import Logout from "@mui/icons-material/Logout";
import Home from '@mui/icons-material/Home';
import Location from '@mui/icons-material/LocationOnOutlined';
import Camera from '@mui/icons-material/CameraAltOutlined';
import Close from '@mui/icons-material/CloseOutlined';
import Postal from '@mui/icons-material/ApprovalOutlined';
import Person from '@mui/icons-material/Person';
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';
import Description from '@mui/icons-material/Description';
import Email from '@mui/icons-material/Email';
import Call from '@mui/icons-material/Call';
import Number from '@mui/icons-material/Numbers';
import Rental from '@mui/icons-material/AttachMoney';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Notifications: forwardRef((props, ref) => <Notifications {...props} ref={ref} />),
  Logout: forwardRef((props, ref) => <Logout {...props} ref={ref} />),
  Home: forwardRef((props, ref) => <Home {...props} ref={ref} />),
  Location: forwardRef((props, ref) => <Location {...props} ref={ref} />),
  Camera: forwardRef((props, ref) => <Camera {...props} ref={ref} />),
  Close: forwardRef((props, ref) => <Close {...props} ref={ref} />),
  Postal: forwardRef((props, ref) => <Postal {...props} ref={ref} />),
  Person: forwardRef((props, ref) => <Person {...props} ref={ref} />),
  ConfirmationNumber: forwardRef((props, ref) => <ConfirmationNumber {...props} ref={ref} />),
  Description: forwardRef((props, ref) => <Description {...props} ref={ref} />),
  Email: forwardRef((props, ref) => <Email {...props} ref={ref} />),
  Call: forwardRef((props, ref) => <Call {...props} ref={ref} />),
  Number: forwardRef((props, ref) => <Number {...props} ref={ref} />),
  Rental: forwardRef((props, ref) => <Rental {...props} ref={ref} />),
  
};

export default tableIcons;