// const url = 'http://192.168.37.202:8989';
// const url = 'http://192.168.37.3:8082'; // 舒伟IP
const url = `http://vision.richwayworks.com:8989`;
export const baseUrl = `${url}/visionApp/vision`;
export const baseImage = `${url}/visionApp/base/api/file/target/pic/`;
// 测试环境
// export const baseUrl = 'http://vision.richwayworks.com:8989/visionApp/vision';
// export const baseImage = 'http://vision.richwayworks.com:8989/visionApp/base/api/file/target/pic/';
const Service = {
    Login: `/user/login`,
    Monitoring: `/Monitoring/stlist`,
    RiverHome: `/Monitoring/hz_stlist`,
    Collection: `/Monitoring/sites`,
    ImageDetail: `/MonitoringDetail/detailList`,
    ChartDetail: `/MonitoringDetail/selectWaterGaugeLine`,
    Integrity: `/analysis/infoList`,
    WarnAnalysisNew: `/analysis/wrnanalysisNew`,
    AbnormalStation: `/analysis/execAnalysisListNew`,
    ChangePassword: `/user/changepwd`,
    WarnList: `/Monitoring/wrnlist`,
    WarnDetail: `/Monitoring/wrnDetail`,
    RiverImageDetail: `/MonitoringDetail/hz_detailList`,
    DeleteWarn: `/Monitoring/closeWrn`,
    ValidateAccount: `/user/pattern`,
    SendValidateCode: `/user/sendActivateCode`,
    SafeValidate: `/user/validate`,
    ResetPassword: `/user/resetpwd`,
};

export default Service;
