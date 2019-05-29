import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import { Grid, Header } from "semantic-ui-react";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = props => {
  // console.log(value);
  const { value, dragging, index, ...restProps } = props;
  console.log(props.value * 0.1);
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const OpacityPicker = props => {
  return (
    // <div style={{ width: "30%", margin: 20 }}>
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <Slider min={0} max={10} defaultValue={5} handle={handle} />
          <p style={{ textAlign: "left" }}>
            Less
            <span style={{ float: "right" }}>More</span>
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    // </div>
  );
};

export default OpacityPicker;
