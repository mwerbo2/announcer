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
  console.log(props.value);
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
    <div style={{ width: "25em", margin: 20 }}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h5" floated="left">
              Less transparent
            </Header>
            <Header as="h5" floated="right">
              More transparent
            </Header>
            <Slider
              min={0}
              max={10}
              defaultValue={5}
              // marks={{
              //   "less opacity": "less opacity",
              //   "more opacity": "more opacity"
              // }}
              handle={handle}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default OpacityPicker;
