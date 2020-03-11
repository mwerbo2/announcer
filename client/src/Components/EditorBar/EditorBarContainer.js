import React from "react";
import { Grid } from "semantic-ui-react";
import BackgroundEditorButton from "./BackgroundEditorButton";
import AnnouncementModal from '../Announcement/AnnouncementModal';

class EditorBarContainer extends React.Component {
  render() {
    return (
      <Grid columns="equal">
        <Grid.Column><AnnouncementModal {...this.props}/></Grid.Column>
        <Grid.Column><BackgroundEditorButton {...this.props} /></Grid.Column>        
      </Grid>
    );
  }
}

export default EditorBarContainer;
