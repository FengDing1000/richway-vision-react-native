import {createAppContainer, createStackNavigator} from 'react-navigation';
// import tab from '../tab';
// import RiverTab from '../RiverTab';
import RouterConfig from './routerConfig';

import Login from '../../page/Login/Login';
import Multifunctional from '../../page/Login/Multifunctional';

// import Search from '../../page/Home/Search/Search';
// import RicerSearch from '../../page/RiverHome/Search/Search';

// import DetailImage from '../../page/Home/scrollPage/Detail/index';
// import RiverDetailImage from '../../page/RiverHome/scrollPage/Detail/index';

// import ChartDetail from '../../page/Home/ChartDetail/ChartDetail';
// import InformationDetail from '../../page/Information/InformationDetail';

import ChangePassword from '../../page/Login/ChangePassword';
import ForgetPassword from '../../page/Login/ForgetPassword';
import MessageValidate from '../../page/Login/MessageValidate';
import ResetPassword from '../../page/Login/ResetPassword';

// 智能防汛
import IntelligentFloodPrevention from '../intelligentFloodPreventionTab';
import IntelligentFloodPreventionSearch from '$src/page/intelligentFloodPrevention/Home/Search/Search';
import IntelligentFloodPreventionDetailImage from '$src/page/intelligentFloodPrevention/Home/scrollPage/Detail/index';
import IntelligentFloodPreventionChartDetail from '$src/page/intelligentFloodPrevention/Home/ChartDetail/ChartDetail';
import IntelligentFloodPreventionInformationDetail from '$src/page/intelligentFloodPrevention/Information/InformationDetail';


// 城市内涝
import UrbanWaterlogging from '../urbanWaterloggingTab';
import UrbanWaterloggingSearch from '$src/page/urbanWaterlogging/Home/Search/Search';
import UrbanWaterloggingDetailImage from '$src/page/urbanWaterlogging/Home/scrollPage/Detail/index';
import UrbanWaterloggingChartDetail from '$src/page/urbanWaterlogging/Home/ChartDetail/ChartDetail';
import UrbanWaterloggingInformationDetail from '$src/page/urbanWaterlogging/Information/InformationDetail';

// 河湖管理
import RiverLakeManagement from '../riverLakeManagementTab';
import RiverLakeManagementSearch from '$src/page/riverLakeManagement/Home/Search/Search';
import RiverLakeManagementDetailImage from '$src/page/riverLakeManagement/Home/scrollPage/Detail/index';
import RiverLakeManagementChartDetail from '$src/page/riverLakeManagement/Home/ChartDetail/ChartDetail';
import RiverLakeManagementInformationDetail from '$src/page/riverLakeManagement/Information/InformationDetail';

// 调水安全
import WaterDiversionSafety from '../waterDiversionSafetyTab';
import WaterDiversionSafetySearch from '$src/page/waterDiversionSafety/Home/Search/Search';
import WaterDiversionSafetyDetailImage from '$src/page/waterDiversionSafety/Home/scrollPage/Detail/index';
import WaterDiversionSafetyChartDetail from '$src/page/waterDiversionSafety/Home/ChartDetail/ChartDetail';
import WaterDiversionSafetyInformationDetail from '$src/page/waterDiversionSafety/Information/InformationDetail';

// 无人机巡检
import UavPatrolInspection from '../uavPatrolInspectionTab';
import UavPatrolInspectionSearch from '$src/page/uavPatrolInspection/Home/Search/Search';
import UavPatrolInspectionDetailImage from '$src/page/uavPatrolInspection/Home/scrollPage/Detail/index';
import UavPatrolInspectionChartDetail from '$src/page/uavPatrolInspection/Home/ChartDetail/ChartDetail';
import UavPatrolInspectionInformationDetail from '$src/page/uavPatrolInspection/Information/InformationDetail';

// 设备巡检
import EquipmentInspection from '../equipmentInspectionTab';
import EquipmentInspectionSearch from '$src/page/equipmentInspection/Home/Search/Search';
import EquipmentInspectionDetailImage from '$src/page/equipmentInspection/Home/scrollPage/Detail/index';
import EquipmentInspectionChartDetail from '$src/page/equipmentInspection/Home/ChartDetail/ChartDetail';
import EquipmentInspectionInformationDetail from '$src/page/equipmentInspection/Information/InformationDetail';


const AppNavigator = createStackNavigator({
    Login,
    Multifunctional,
    // Main: tab,
    // River: RiverTab,
    // Search,
    // RicerSearch,

    // DetailImage,
    // RiverDetailImage,
    // ChartDetail,
    // InformationDetail,

    ChangePassword,
    ForgetPassword,
    MessageValidate,
    ResetPassword,

    IntelligentFloodPrevention,
    IntelligentFloodPreventionSearch,
    IntelligentFloodPreventionDetailImage,
    IntelligentFloodPreventionChartDetail,
    IntelligentFloodPreventionInformationDetail,

    UrbanWaterlogging,
    UrbanWaterloggingSearch,
    UrbanWaterloggingDetailImage,
    UrbanWaterloggingChartDetail,
    UrbanWaterloggingInformationDetail,

    RiverLakeManagement,
    RiverLakeManagementSearch,
    RiverLakeManagementDetailImage,
    RiverLakeManagementChartDetail,
    RiverLakeManagementInformationDetail,

    WaterDiversionSafety,
    WaterDiversionSafetySearch,
    WaterDiversionSafetyDetailImage,
    WaterDiversionSafetyChartDetail,
    WaterDiversionSafetyInformationDetail,

    UavPatrolInspection,
    UavPatrolInspectionSearch,
    UavPatrolInspectionDetailImage,
    UavPatrolInspectionChartDetail,
    UavPatrolInspectionInformationDetail,

    EquipmentInspection,
    EquipmentInspectionSearch,
    EquipmentInspectionDetailImage,
    EquipmentInspectionChartDetail,
    EquipmentInspectionInformationDetail,
}, RouterConfig);

export default createAppContainer(AppNavigator);
