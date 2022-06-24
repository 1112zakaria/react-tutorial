import React from 'react';

export function WelcomeFn(props) {
    return <h1>WelcomeFn: Hello, {props.name}</h1>;
}

export class WelcomeCls extends React.Component {
    render() {
        return <h1>WelcomeCls: Hello, {this.props.name}</h1>;
    }
}

export function AppFn() {
    return (
        <div>
            <h1>App:</h1>
            <WelcomeFn name="John" />
            <WelcomeFn name="Bob" />
            <WelcomeFn name="Elliot" />
        </div>
    );
}

function formatDate(props) {
    return new Date().getDate();
}

function Avatar(props) {
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}

function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}

export function Comment(props) {
    return (
        <div className="Comment">
            <h1>Comment: </h1>
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}



//export default {WelcomeCls, WelcomeFn, AppFn};