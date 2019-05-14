import React from "react";
import { Button, Container, Modal, Input, Grid, Header, Image } from "semantic-ui-react";
import { SketchPicker } from "react-color";

class BackgroundEditorButton extends React.Component {
    state = {
        modalOpen:false
    };

    openModal = () => {
        this.setState({modalOpen: true})
    }

  render() {
      const {modalOpen} = this.state;
    return (
      <Container>
        <Modal open={modalOpen}>
          <Modal.Header>Edit Background</Modal.Header>
          <Modal.Content>
              <Grid columns={2} divided>
                  <Grid.Row>
                  <Grid.Column><Header>Background Color</Header><SketchPicker /></Grid.Column>
                  <Grid.Column><Header>Add image as background</Header><Input placeholder='url'/> <Image src='' size='small' /></Grid.Column>
                  </Grid.Row>
              </Grid>
          
          
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancel
            </Button>
            <Button
              onClick={this.close}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Save'
            />
          </Modal.Actions>
        </Modal>
        <Button onClick={this.openModal}>Edit Background</Button>
      </Container>
    );
  }
}

export default BackgroundEditorButton;
