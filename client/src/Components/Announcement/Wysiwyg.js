import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form } from "semantic-ui-react";

class Wysiwyg extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange(content) {
    this.props.onEditorChange(content);
  }

  render() {
    return (
      <Form className="WysiwygStyle" onSubmit={this.props.handleSubmit}>
        <Editor
          apiKey="2v70mtgk4kz045dkbblsshf5xoky86546vqb4bvj4h3oaqds"
          cloudChannel="stable"
          value={this.props.content}
          onEditorChange={this.handleEditorChange}
          // initialValue="<p>Testing editor, initial value</p>"
          init={{
            height: "500",
            plugins: "link image code lists",
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | code image | numlist bullist"
          }}
          //    onChange={this.handleEditChange}
        />
        <Form.Button content="submit" />
      </Form>
    );
  }
}

export default Wysiwyg;
