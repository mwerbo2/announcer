import React, { createRef } from "react";
import {
  Button,
  Container,
  Modal,
  Input,
  Grid,
  Header,
  Image
} from "semantic-ui-react";
import axios from "axios";
import OpacityPicker from "./OpacityPicker";
import ResolutionPicker from "./ResolutionPicker";
import { toast } from "react-semantic-toasts";

class BackgroundEditorButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.inputRef = createRef();
    this.state = {
      modalOpen: false,
      imageURL: "",
      backgroundColor: "",
      backgroundPosition: "center",
      opacity: 0
    };
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  // getOpacity = val => {
  //   this.setState({ opacity: val });
  //   console.log("beb.js 33", this.state);
  // };

  handleBackgroundPosition = (e, { value }) => this.setState({ value });

  handleError = err => {
    if (err.response.status === 400) {
      setTimeout(() => {
        toast({
          title: "Error uploading image",
          description: "Check the image url"
        });
      }, 500);
      // this.setState({ modalOpen: false });
      // this.getBackground()
      // this.props.didEdit;
      const backgroundInfo = {
        backgroundColor: this.state.backgroundColor,
        backgroundImage: this.state.imageURL
      };
      this.props.didBackgroundUpdate(backgroundInfo);
    } else {
      console.log("figure it out");
    }
  };
  close = res => {
    if (res.status === 200) {
      setTimeout(() => {
        toast({
          title: "Background udpated"
        });
      }, 500);
      this.setState({ modalOpen: false });
      // this.getBackground()
      // this.props.didEdit;
      const backgroundInfo = {
        backgroundColor: this.state.backgroundColor,
        backgroundImage: this.state.imageURL
      };
      this.props.didBackgroundUpdate(backgroundInfo);
    } else {
      this.setState({ modalOpen: false });
      // this.getBackground()
      // this.props.didEdit;
      const backgroundInfo = {
        backgroundColor: this.state.backgroundColor,
        backgroundImage: this.state.imageURL
      };
      this.props.didBackgroundUpdate(backgroundInfo);
    }
  };

  submitBackground = () => {
    axios
      .put("/boards", {
        background_color: this.state.backgroundColor,
        background_image: this.state.imageURL,
        id: 1
      })
      .then(response => this.close(response))
      .catch(err => this.handleError(err));
  };

  handleChangeComplete = color => {
    this.setState({ backgroundColor: color.hex });
  };

  render() {
    const { modalOpen } = this.state;
    return (
      <Container>
        <Modal open={modalOpen}>
          <Modal.Header>Edit Background</Modal.Header>
          <Modal.Content>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Header>Add image as background</Header>
                  <Input
                    ref={this.inputRef}
                    onChange={e => this.setState({ imageURL: e.target.value })}
                    placeholder="url"
                  />
                  <Header as="h3">Opacity setting for display</Header>
                  <OpacityPicker {...this.props} />
                  {/* <ResolutionPicker /> */}
                </Grid.Column>
                <Grid.Column>
                  <Image src={this.state.imageURL} size="medium" centered />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancel
            </Button>
            <Button
              onClick={this.submitBackground}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Save"
            />
          </Modal.Actions>
        </Modal>
        <Button onClick={this.openModal} color="blue">
          Edit Background
        </Button>
      </Container>
    );
  }
}

export default BackgroundEditorButton;
