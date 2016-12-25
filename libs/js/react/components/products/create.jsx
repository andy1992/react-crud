"use strict";

var CreateProductComponent = React.createClass({
    getInitialState: function() {
        return {
            categories: [],
            selectedCategoryId: -1,
            name: '',
            description: '',
            price: 0.00,
            successCreation: null,
            isLoggedIn: ''
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/read_all_categories.php', function(categories) {
            this.setState({
                categories: JSON.parse(categories)
            });
        }.bind(this));

        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            if(result == 'true')
                this.setState({
                    isLoggedIn: result
                });
            else
                window.location.href = '#';

        }.bind(this));

        $('.page-header h1').text('Create product');
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    onCategoryChange: function(e) {
        this.setState({
            selectedCategoryId: e.target.value
        });
    },

    onNameChange: function(e) {
        this.setState({
            name: e.target.value
        });
    },

    onDescriptionChange: function(e) {
        this.setState({
            description: e.target.value
        });
    },

    onPriceChange: function(e) {
        this.setState({
            price: e.target.value
        });
    },

    onSave: function(e) {
        $.post('api/create_product.php', {
                name: this.state.name,
                description: this.state.description,
                category_id: this.state.selectedCategoryId,
                price: this.state.price
            },
            function(res) {
                this.setState({successCreation: res});
                if(res == 'true') {
                    this.setState({name: ''});
                    this.setState({description: ''});
                    this.setState({selectedCategoryId: -1});
                    this.setState({price: 0.0});
                }
            }.bind(this));
        e.preventDefault();
    },

    // THE FORM
    render: function() {

        var categoriesOptions = this.state.categories.map(function(category) {
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        return (
            <div>
                {
                    this.state.successCreation == "true" ?
                        <div className="alert alert-success">
                            Product was saved.
                        </div>
                        : null
                }
                {
                    this.state.successCreation != "true" && this.state.successCreation != null ?
                        <div className="alert alert-danger">
                            {this.state.successCreation}
                        </div>
                        : null
                }

                <a href="#"
                   className="btn btn-primary margin-bottom-1em">
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
                                    required
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
                                        required
                                        onChange={this.onDescriptionChange}>
                                    </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Price ($)</td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    value={this.state.price}
                                    required
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
                                    <option value="-1">Select category...</option>
                                    {categoriesOptions}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.onSave}>
                                    Save
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});