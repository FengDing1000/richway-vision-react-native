import React, { PureComponent } from 'react';
import DetailImage from '$src/common/ImageEdit/DetailImage';
import Service from '$src/common/Service';

class Page extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
          <DetailImage URL={Service.ImageDetail} detailRouter="EquipmentInspectionChartDetail" />
        );
    }
}

export default Page;
