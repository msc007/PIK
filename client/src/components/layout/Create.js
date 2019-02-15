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
							This is some placeholder block-level help text for the above input.
							It's a bit lighter and easily wraps to a new line.
						</FormText>
					</FormGroup>
					<Button>Submit</Button>
				</Form>
			</CardBody>
		</Card>
		</div>
    )
  }
}
