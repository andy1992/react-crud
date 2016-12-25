"use strict";

var LoginComponent = React.createClass({
    getInitialState: function() {
        return {
            id: null,
            email: '',
            password: '',
            remember: null,
            user: null,
            successLogin: null,
            isLoggedIn: ''
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            this.setState({
                isLoggedIn: result
            });

            if(result == 'true')
                window.location.href = '#';
        }.bind(this));
        $('.page-header h1').text('Sign In');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    onEmailChanged: function(e) {
        this.setState({
            email: e.target.value
        });
    },

    onPasswordChanged: function(e) {
        this.setState({
            password: e.target.value
        });
    },

    login: function(e) {
        $.post('api/login.php', {
                email: this.state.email,
                password: this.state.password
            },
            function(result) {
                var res = JSON.parse(result);
                this.setState({
                    successLogin: res.message
                });
                if(res.user != null) {
                    this.setState({id: res.user.id});
                    this.setState({email: res.user.email});
                    window.location.reload();
                }
            }.bind(this));
        e.preventDefault();
    },

    render: function() {
        return (
            <div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form>
                        {
                            this.state.successLogin != "true" && this.state.successLogin != null ?
                                <div className="alert alert-danger">
                                    {this.state.successLogin}
                                </div>
                                : null
                        }
                        <h2 className="form-signin-heading">Please sign in</h2>

                        <input type="email" className="form-control" placeholder="Email address" name="email" value={this.state.email} onChange={this.onEmailChanged} />

                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.onPasswordChanged} />

                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Sign in</button>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
});