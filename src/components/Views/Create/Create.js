import React from "react";
import Nav from "../../Simple/Nav/Nav";
import { Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";

const CREATE_MEETING = gql`
  mutation {
    createMeeting {
      title
      author
      description
      duration
      timezone
      availability
      participants
    }
  }
`;

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: "",
      email: "",
      yourInitials: "",
      lengthOfMetting: 0,
      timeZone: "",
      error: null
    };
  }

  handleSubmit(e, createMeeting) {
    e.preventDefault();
    createMeeting({
      variables: {
        title: "title",
        author: "somebody",
        description: "",
        duration: 43,
        timezone: "ssdssd",
        availability: [123123, 1231231],
        participants: []
      }
    }).catch(error => console.log(error));
    console.log("Create Meeting Test");
  }

  render() {
    return (
      <Mutation mutation={CREATE_MEETING}>
        {createMeeting => (
          <div>
            <Nav />
            <form
              className="create-form"
              onSubmit={e => {
                this.handleSubmit(e, createMeeting);
              }}
            >
              <label htmlFor="meetingName">Meeting Name</label>
              <input
                className="join-input"
                required
                name="meetingName"
                id="meetingName"
                placeholder="Meeting Name"
                type="text"
                onChange={e =>
                  this.setState({ meetingName: e.target.value.trim() })
                }
              ></input>
              <label htmlFor="email">Email</label>
              <input
                className="join-input"
                required
                name="email"
                id="email"
                placeholder="Email"
                type="email"
                onChange={e => this.setState({ email: e.target.value.trim() })}
              ></input>
              <label htmlFor="yourInitials">Your Initials</label>
              <input
                className="join-input"
                required
                name="yourInitials"
                id="yourInitials"
                placeholder="Your Initials"
                type="text"
                onChange={e =>
                  this.setState({ yourInitials: e.target.value.trim() })
                }
              ></input>
              <label htmlFor="lengthOfMeeting">Your Initials</label>
              <input
                className="join-input"
                required
                name="lengthOfMeeting"
                id="lengthOfMeeting"
                placeholder="Length of Meeting"
                type="text"
                onChange={e =>
                  this.setState({ lengthOfMeeting: e.target.value.trim() })
                }
              ></input>
              <label htmlFor="timeZone">Time Zone</label>
              <input
                className="join-input"
                required
                name="timeZone"
                id="timeZone"
                placeholder="Time Zone"
                type="text"
                onChange={e =>
                  this.setState({ timeZone: e.target.value.trim() })
                }
              ></input>
              <button className="time-zone-button">Find My Time Zone</button>
              <button className="create-button" type="submit">
                submit
              </button>
              {this.state.error ? (
                <p className="error">{this.state.error}</p>
              ) : (
                <div className="error-message">
                  <p>Hmm...</p>
                  <p>We do not see that meeting</p>
                </div>
              )}
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
