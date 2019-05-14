import React from 'react';
import { Container } from 'semantic-ui-react';
import BackgroundEditorButton from './BackgroundEditorButton';

const editorStyle = {
    // marginTop: "5em"
}



class EditorBarContainer extends React.Component {
    render() {
        return (
            <Container style={editorStyle}>
                <BackgroundEditorButton />
            </Container>
        )
    }
}

export default EditorBarContainer;

