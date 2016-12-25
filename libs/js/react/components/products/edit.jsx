"use strict";

var UpdateProductComponent = React.createClass({
    getInitialState:function() {
        return {
            id: 0,
            name: '',
            description: '',
            price: 0,
            selectedCategoryId: 0,
            categories: [],
            successUpdate: null,
            isLoggedIn: ''
        };
    },

    componentDidMount: function() {
        var productId = this.props.productId;

        // Populate categories drop down list
        this.serverRequestCat = $.get('api/read_all_categories.php', function(categories) {
            this.setState({
                categories: JSON.parse(categories)
            });
        }.bind(this));

        // load form values
        this.serverRequestProd = $.post('api/read_one_product.php',
            {prod_id: productId},
            function(product) {
                var p = JSON.parse(product)[0];
                this.setState({selectedCategoryId: p.category_id});
                this.setState({id: p.id});
                this.setState({name: p.name});
                this.setState({price: p.price});
                this.setState({description: p.description});
                $('.page-header h1').text(p.name);
            }.bind(this));

        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            if(result == 'true')
                this.setState({
                    isLoggedIn: result
                });
            else
                window.location.href = '#';
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
        this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },

    onNameChange: function(e) {
        this.setState({name: e.target.value});
    },

    onCategoryChange: function(e) {
        this.setState({selectedCategoryId: e.target.value});
    },

    onDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },

    onPriceChange: function(e) {
        this.setState({price: e.target.value});
    },

    onSave: function(e) {
        $.post('api/update_product.php', {
                id: this.state.id,
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                category_id: this.state.selectedCategoryId
            },
            function(res) {
                this.setState({successUpdate: res});
            }.bind(this));
        e.preventDefault();
    },

    render: function() {
        var categoriesOptions = this.state.categories.map(function(category) {
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        return (
            <div>
                {
                    this.state.successUpdate == "true" ?
                        <div className="alert alert-success">
                            Product was updated.
                        </div>
                        : null
                }
                {
                    this.state.successUpdate != "true" && this.state.successUpdate != null ?
                        <div className="alert alert-danger">
                            {this.state.successUpdate}
                        </div>
                        : null
                }

                <a href="#"
                   className="btn btn-primary margin-bottom-1em"
                >
                    All Products
                </a>
                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        value={this.state.description}
                                        onChange={this.onDescriptionChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Price ($)</td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={this.state.price}
                                    className="form-control"
                                    onChange={this.onPriceChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>
                                <select
                                    onChange={this.onCategoryChange}
                                    className="form-control"
                                    value={this.state.selectedCategoryId}
                                >
                                    <option value="-1">Select Category...</option>
                                    {categoriesOptions}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button className="btn btn-primary"
                                        onClick={this.onSave}>Save Changes</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});