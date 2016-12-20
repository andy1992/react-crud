"use strict";

var ReadOneProductComponent = React.createClass({
    getInitialState: function() {
        return {
            id: 0,
            name: '',
            description: '',
            price: 0,
            category_name: ''
        };
    },

    componentDidMount: function() {
        var productId = this.props.productId;

        this.serverRequestProd = $.post('api/read_one_product.php',
            {prod_id: productId},
            function(product) {
                var p = JSON.parse(product)[0];
                this.setState({category_name: p.category_name});
                this.setState({id: p.id});
                this.setState({name: p.name});
                this.setState({description: p.description});
                this.setState({price: p.price});
                $('.page-header h1').text(p.name);
            }.bind(this)
        );
    },

    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },

    render: function() {
        return (
            <div>
                <a href="#"
                   className="btn btn-primary margin-bottom-1em"
                >
                    All Products
                </a>

                <table className="table table-bordered table-responsive">
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{this.state.name}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{this.state.description}</td>
                    </tr>
                    <tr>
                        <td>Price ($)</td>
                        <td>{this.state.price}</td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>{this.state.category_name}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});