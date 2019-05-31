import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import { Grid } from "semantic-ui-react";
import Slider, { createSliderWithTooltip } from "rc-slider";

// const SliderWithTooltip = createSliderWithTooltip(Slider);

class OpacityPicker extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  log = value => {
    const formattedValue = this.percentFormatter(value);
    console.log(this.props);
    // props.didOpacityUpdate(formattedValue);
    // props.opacityUpdate(formattedValue);
    console.log(formattedValue);
    this.props.didOpacityUpdate(formattedValue);
  };

  percentFormatter = v => {
    return (v * 0.1).toFixed(1);
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <div>
              <Slider
                tipFormatter={this.percentFormatter}
                tipProps={{ overlayClassName: "foo" }}
                onChange={this.log}
                min={0}
                max={10}
                defaultValue={10}
              />
            </div>
            <p style={{ textAlign: "left" }}>
              0<span style={{ float: "right" }}>100%</span>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default OpacityPicker;
