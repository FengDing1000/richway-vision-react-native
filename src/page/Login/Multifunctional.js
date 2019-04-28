import React, {Component} from 'react';
import {
    View, StyleSheet, ScrollView, Dimensions, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {ButtonView, Header, TextView} from '@rich/react-native-richway-component';
import BaseStyle from '$src/css/BaseStyle';

import intelligentFloodPreventionTabImage from '$src/image/function/intelligentFloodPrevention.png';
import urbanWaterloggingImage from '$src/image/function/urbanWaterlogging.png';
import riverLakeManagementImage from '$src/image/function/riverLakeManagement.png';
import waterDiversionSafetyImage from '$src/image/function/waterDiversionSafety.png';
// import uavPatrolInspectionImage from '$src/image/function/uavPatrolInspection.png';
import equipmentInspectionImage from '$src/image/function/equipmentInspection.png';
import otherImage from '$src/image/function/other.png';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    item: {
        width: width / 3,
        height: width / 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
        backgroundColor: BaseStyle.themeColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 5,
    },
    image: {
        width: 45,
        height: 45,
    },
});

class Page extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }

    static defaultProps = {
        navigation: {},
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const {navigation} = this.props;
        const multifunctionals = [
            {
                code: `IntelligentFloodPrevention`,
                name: `智能防汛`,
                icon: intelligentFloodPreventionTabImage,
            },
            {
                code: `UrbanWaterlogging`,
                name: `城市内涝`,
                icon: urbanWaterloggingImage,
            },
            {
                code: `RiverLakeManagement`,
                name: `河湖管理`,
                icon: riverLakeManagementImage,
            },
            {
                code: `WaterDiversionSafety`,
                name: `调水安全`,
                icon: waterDiversionSafetyImage,
            },
            // {
            //     code: `UavPatrolInspection`,
            //     name: `无人机巡检`,
            //     icon: uavPatrolInspectionImage,
            // },
            {
                code: `EquipmentInspection`,
                name: `设备巡检`,
                icon: equipmentInspectionImage,
            },
            {
                    code: `UavPatrolInspection`,
                    name: `其他`,
                    icon: otherImage,
            },
        ];
        return (
            <View style={[BaseStyle.container, {backgroundColor: '#fff'}]}>
            <Header title="瑞通智能图像识别系统" leftView={<View />} />
            <ScrollView>
                    <View style={{width, flexWrap: 'wrap', flexDirection: 'row'}}>
                        {multifunctionals.map((item = {}, index) => (
                    <View style={styles.item} key={index}>
                            <ButtonView
                                    style={styles.icon}
                                    onPress={() => navigation.navigate(item.code)}
                          >
                            <Image source={item.icon} style={styles.image} />
                          </ButtonView>
                                <TextView>{item.name}</TextView>
                            </View>
                        ))}
              </View>
              </ScrollView>
          </View>
        );
    }
}

export default Page;
