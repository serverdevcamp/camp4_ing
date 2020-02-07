import React from "react";
import {styled} from "@material-ui/core/styles";
import {GridList} from "@material-ui/core";

const CustomGridList = styled(GridList)({
        height: '285px',
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        background: "white",

    }
);

const HorizontalScrollView = ({children}) =>{

    return(
        <CustomGridList>
            {children}
        </CustomGridList>
    )
};

export default HorizontalScrollView;