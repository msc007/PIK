import React, { Component } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
export default class Create extends Component {
  render() {
    return (
		<div class="container px-5 py-5 create-container">
		<Card>
			<CardBody>
				<Form>
					<FormGroup>
						<Label>Title</Label>
						<Input placeholder="please give a name for your tournament" autocomplete="off" />
					</FormGroup>
					<FormGroup>
						<Label>Description</Label>
						<Input type="password" placeholder="please give a brief description about this tournament" autocomplete="off" />
					</FormGroup>
					<FormGroup>
						<Label>Access</Label>
						<FormGroup check>
							<Label check>
							<Input type="radio" name="options" autocomplete="off" checked/>
							Public
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
							<Input type="radio" name="options" autocomplete="off"/>
							Private
							</Label>
						</FormGroup>
					</FormGroup>
					<FormGroup>
						<Label>Images</Label>
						<Input type="file" name="file" />
						<FormText color="muted">
							Choose images for your tournament!
						</FormText>
					</FormGroup>
					<Button className="btn-block">Submit</Button>
				</Form>
			</CardBody>
		</Card>
		</div>
    )
  }
}
