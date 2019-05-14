import React, {createRef} from "react";
import { Button, Container, Modal, Input, Grid, Header, Image } from "semantic-ui-react";
import { SketchPicker } from "react-color";
import axios from 'axios'

class BackgroundEditorButton extends React.Component {
    inputRef = createRef()
    state = {
        modalOpen:false,
        imageURL: "",
        backgroundColor: ""
    };

    openModal = () => {
        this.setState({modalOpen: true})
    }
    
    close = () => this.setState({ modalOpen: false })

    submitBackground = () => {
        axios.put('/board', {
            background_color: this.state.backgroundColor,
            background_image: this.state.imageURL
        })
        .then((res)=> console.log(res))
        .catch((err) => console.log(err))
    }

    handleChangeComplete = (color, event) => { 
        this.setState({backgroundColor: color.hex})
        console.log(this.state.backgroundColor)
    }

  render() {
      const {modalOpen, imageURL, backgroundColor} = this.state;
    return (
      <Container>
        <Modal open={modalOpen}>
          <Modal.Header>Edit Background</Modal.Header>
          <Modal.Content>
              <Grid columns={2} divided>
                  <Grid.Row>
                  <Grid.Column><Header>Background Color</Header><SketchPicker color={backgroundColor} onChangeComplete={ this.handleChangeComplete} /></Grid.Column>
                  <Grid.Column><Header>Add image as background</Header><Input ref={this.inputRef} onChange={e => this.setState({imageURL: e.target.value})} placeholder='url'/> <Image src={this.state.imageURL} size='small' centered style={{marginTop:'1em'}}/></Grid.Column>
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
