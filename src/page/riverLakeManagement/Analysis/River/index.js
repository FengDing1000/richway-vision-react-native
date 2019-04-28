import React, { PureComponent } from 'react';
import Analysis from '../Analysis';


class Page extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
          <Analysis newWarnY1="viw_rubbish_seg" newWarnY2="viw_secchi_detect" />
        );
    }
}

export default Page;
