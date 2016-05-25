var App = React.createClass({
    getInitialState: function () {
        return {
            viewKey: "InputBox",
            infoPageViewModel: null
        }
    },

    render: function () {
        return (
            this.switchView(this.state.viewKey)
        )
    },

    inputBoxCallback: function (viewModel) {
        // TODO: this is very bad stop
        this.setState({ viewKey: "InfoPage", infoPageViewModel: viewModel });
    },
    
    infoPageCallback: function() {
       this.setState({ viewKey: "InputBox"});
    },

    switchView: function (viewKey) {
        switch (viewKey) {
            case "InputBox":
                return (<InputBox callback={this.inputBoxCallback}/>);
            case "InfoPage":
                return (<InfoPage callback={this.infoPageCallback} viewModel = {this.state.infoPageViewModel}/>)
        }
    }
})


var InputBox = React.createClass({
    propTypes: {
        //TODO: This is stupid
        callback: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            shouldShow: true
        }
    },

    searchCode: function () {
        var page = this.refs.textField.value;
        var _this = this;
        firebase.database().ref(page).once('value').then(function (snapshot) {
            //TODO: Stop this, should be emiting an event instead that <App/> Listens too
            _this.props.callback(snapshot.val());
            console.log(snapshot.val());
        });
    },

    render: function () {
        // Find out how to use require and import classNames packages
        var searchCodeClassName = showClass("login-page", this.state.shouldShow);
        return (
            <div className={searchCodeClassName}>
                <div className="form">
                    <div onSubmit={null}  className="login-form">
                        <input ref="textField" type="text" placeholder="unique code"/>
                        <button type="button" onClick={this.searchCode}>find code</button>
                    </div>
                </div>
            </div>
        )
    }
});

var InfoPage = React.createClass({
    propTypes: {
        viewModel: React.PropTypes.object,
        callback: React.PropTypes.func
    },

    switchPage: function() {
        this.props.callback();    
    },

    render: function () {
        return (
            <div className="login-page show">
                <div className="form">
                    <div>
                        <button type="button" onClick={this.switchPage}>Back to Search</button>
                    </div>
                    {this.props.viewModel.message}
                    <div className="mapImage">
                        <div> Location 1</div>
                        <img src={this.props.viewModel.location2[0]}/>
                        <div> Location 2</div>
                        <img src={this.props.viewModel.location2[1]}/>
                    </div>
                    <div>
                        <button type="button" onClick={this.searchCode}>+</button>
                    </div>
                </div>
            </div>
        )
    }
})

var showClass = function (className, showValue) {
    if (showValue === true) {
        return className + " " + "show";
    }
    return className;
}

ReactDOM.render(
    <App/>,
    document.getElementById('example')
);