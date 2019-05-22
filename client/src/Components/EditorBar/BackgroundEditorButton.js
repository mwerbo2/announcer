import React, {createRef} from "react";
import { Button, Container, Modal, Input, Grid, Header, Image } from "semantic-ui-react";
import axios from 'axios'


class BackgroundEditorButton extends React.Component {
  constructor(props) {
    super(props);
   
   this.inputRef = createRef()
    this.state = {
        modalOpen:false,
        imageURL: "",
        backgroundColor: ""
    };
  }
   

    openModal = () => {
        this.setState({modalOpen: true})
    }
    
    close = () => { 
      this.setState({ modalOpen: false });
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

    handleChangeComplete = (color) => { 
        this.setState({backgroundColor: color.hex})
    }

  render() {
      const {modalOpen} = this.state;
    return (
      <Container>
        <Modal open={modalOpen}>
          <Modal.Header>Edit Background</Modal.Header>
          <Modal.Content>
              <Grid>
                  <Grid.Row>
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
