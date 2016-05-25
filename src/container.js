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

    switchView: function (viewKey) {
        switch (viewKey) {
            case "InputBox":
                return (<InputBox callback={this.inputBoxCallback}/>);
            case "InfoPage":
                return (<InfoPage viewModel = {this.state.infoPageViewModel}/>)
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
                    <form onSubmit={this.searchCode} className="login-form">
                        <input ref="textField" type="text" placeholder="unique code"/>
                        <button type="button" onClick={this.searchCode}>find code</button>
                    </form>
                </div>
            </div>
        )
    }
});

var InfoPage = React.createClass({
    propTypes: {
        viewModel: React.PropTypes.object
    },
    
    render: function() {
        return(
            <div className="login-page show">
                <div className="form">
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