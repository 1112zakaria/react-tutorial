import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { WelcomeCls, AppFn, Comment } from './components';
import { Clock } from './clock';
import { Form, Toggle } from './events';
import { Greeting, LoginControl, Page } from './conditional';
import { NumberList } from './lists';
import { Calculator, NameForm, Reservation } from './forms';
import { SignUpDialog, WelcomeDialog } from './composition';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FilterableProductTable } from './mock';
/*import WelcomeCls from './components.js';
import WelcomeFn from './components.js';
import AppFn from './components.js';
*/

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

const name = 'Josh Perez';
const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};
const commentUser = {
    name: "Samuel L. Jackson",
    avatarUrl: "https://twitter.com/CoolCatSleuth/photo"
};
const commentDate = "April 1st 2022";
const commentText = "Lorem ipsum dolor sit amet";

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

function getGreeting(user) {
    if (user.firstName && user.lastName) {
        return <h2>Hello, {formatName(user)}!</h2>;
    }
    return <h2>Hello, Stranger.</h2>;
}

// eslint-disable-next-line
function tick() {
    const element = (
        <div>
            <h1>It is {new Date().toLocaleTimeString()}.</h1>
        </div>
    );
    root.render(element);
}

// How do I render multiple items?
const link = <a href="https://www.reactjs.org">React.js website</a>;
const img = <img src={user.avatarUrl} alt='This is img'></img>;
const createElm = React.createElement(
    'h1',
    { className: 'greeting' },
    'Hola, world. This uses React.createElement'
);
const welcome = <WelcomeCls name="Sara" />;
//const welcome = "heh";
const app = <AppFn />;
const clock = <Clock />;
const form = <Form />;
const toggle = <Toggle />;
const greeting = <Greeting isLoggedIn={false} />;
const loginControl = <LoginControl />;
const page = <Page />;
const numberList = <NumberList numbers={[5, 6, 7, 2, 1, 33, 6]} />;
const nameForm = <NameForm />;
const reservation = <Reservation />;
const calculator = <Calculator />;
const welcomeDialog = <WelcomeDialog />;
const signupDialog = <SignUpDialog />;

const element = (
    <div>
        <h1>
            getGreeting(user): {getGreeting(user)}
            getGreeting(name): {getGreeting(name)}
        </h1>
        <h2>
            {welcome}<br />
        </h2>
        <h2>{createElm}</h2>
        <h3>{link}{img}</h3>
        {app}<br />
        <Comment author={commentUser} text={commentText} date={commentDate} /><br />
        {clock}
        {form}
        {toggle}
        {greeting}
        {loginControl}
        {page}
        {numberList}
        {nameForm}
        {reservation}
        {calculator}
        {welcomeDialog}
        {signupDialog}
    </div>

);

const data = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
    {category: "Food", price: "$4.99", stocked: false, name: "Cookie"}
  ];

const mock = (
    <div>
        <FilterableProductTable products={data} />
    </div>
);

const main = (
    <div>

        <Router>
            <nav>
                <Link to="/">Main</Link>
                <Link to="/mock">Mock</Link>
            </nav>
            <Routes>
                <Route path="/" element={element} />
                <Route path="mock" element={mock} />
            </Routes>
        </Router>
    </div>
);

root.render(main);   // this is overwritten after 1 second

//root.render(app);
//setInterval(tick, 1000);