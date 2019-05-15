import React, {createRef} from "react";
import { Button, Container, Modal, Input, Grid, Header, Image } from "semantic-ui-react";
import { SketchPicker } from "react-color";
import axios from 'axios'
import Axios from "axios";


class BackgroundEditorButton extends React.Component {
  constructor(props) {
    super(props);
   
   this.inputRef = createRef()
    this.state = {
        modalOpen:false,
        imageURL: "",
        backgroundColor: ""
    };
    console.log(props)
  }
   

    openModal = () => {
        this.setState({modalOpen: true})
    }
    
    close = (res) => { 
      this.setState({ modalOpen: false });
      console.log("Beb.js 22", res);
      // this.getBackground()
      // this.props.didEdit;
      const backgroundInfo = {
        backgroundColor: this.state.backgroundColor,
        backgroundImage: this.state.imageURL
      }
      this.props.didBackgroundUpdate(backgroundInfo);
    }


    // getBackground = () => {
    //   Axios.get('/boards')
    //   .then(response => console.log(response))
    //   .catch(err => console.log(err));
    // }

    submitBackground = () => {

        axios.put('/boards', {
            background_color: this.state.backgroundColor,
            background_image: this.state.imageURL,
            id: 1
        })
        .then((response)=> this.close(response))
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
              onClick={this.submitBackground}
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
