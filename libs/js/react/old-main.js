var DeleteProductComponent = React.createClass({

});

var CreateProductComponent = React.createClass({
    getInitialState: function() {
        return {
            categories: [],
            selectedCategoryId: -1,
            name: '',
            description: '',
            price: '',
            successCreation: null
        };
    },
    componentDidMount: function() {
        this.serverRequest = $.get("api/read_all_categories.php", function (categories) {
            this.setState({
                categories: JSON.parse(categories)
            });
        }.bind(this));

        $('.page-header h1').text('Create product');
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    // handle category change
    onCategoryChange: function(e) {
        this.setState({selectedCategoryId: e.target.value});
    },

// handle name change
    onNameChange: function(e) {
        this.setState({name: e.target.value});
    },

// handle description change
    onDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },

// handle price change
    onPriceChange: function(e) {
        this.setState({price: e.target.value});
    },
    onSave: function(e){
        $.post("api/create_product.php", {
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                category_id: this.state.selectedCategoryId
            },
            function(res){
                this.setState({successCreation: res});
                this.setState({name: ""});
                this.setState({description: ""});
                this.setState({price: ""});
                this.setState({selectedCategoryId: -1});
            }.bind(this)
        );
        e.preventDefault();
    },
    render: function() {

        // make categories as option for the select tag.
        var categoriesOptions = this.state.categories.map(function(category){
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        /*
         - tell the user if a product was created
         - tell the user if unable to create product
         - button to go back to products list
         - form to create a product
         */
        return (
            <div>
                {

                    this.state.successCreation == "true" ?
                        <div className='alert alert-success'>
                            Product was saved.
                        </div>
                        : null
                }

                {

                    this.state.successCreation == "false" ?
                        <div className='alert alert-danger'>
                            Unable to save product. Please try again.
                        </div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeAppMode('read')}
                   className='btn btn-primary margin-bottom-1em'> Read Products
                </a>


                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.name}
                                    required
                                    onChange={this.onNameChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
        <textarea
            type='text'
            className='form-control'
            required
            value={this.state.description}
            onChange={this.onDescriptionChange}>
        </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Price ($)</td>
                            <td>
                                <input
                                    type='number'
                                    step="0.01"
                                    className='form-control'
                                    value={this.state.price}
                                    required
                                    onChange={this.onPriceChange}/>
                            </td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>
                                <select
                                    onChange={this.onCategoryChange}
                                    className='form-control'
                                    value={this.state.selectedCategoryId}>
                                    <option value="-1">Select category...</option>
                                    {categoriesOptions}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    onClick={this.onSave}>Save</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});

// component that renders a single product
var ProductRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.description}</td>
                <td>${parseFloat(this.props.product.price).toFixed(2)}</td>
                <td>{this.props.product.category_name}</td>
                <td>
                    <a href='#'
                       onClick={() => this.props.changeAppMode('readOne', this.props.product.id)}
                       className='btn btn-info m-r-1em'> Read
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeAppMode('update', this.props.product.id)}
                       className='btn btn-primary m-r-1em'> Edit
                    </a>
                    <a
                        onClick={() => this.props.changeAppMode('delete', this.props.product.id)}
                        className='btn btn-danger'> Delete
                    </a>
                </td>
            </tr>
        );
    }
});

// component for the whole products table
var ProductsTable = React.createClass({
    render: function() {

        var rows = this.props.products
            .map(function(product, i) {
                return (
                    <ProductRow
                        key={i}
                        product={product}
                        changeAppMode={this.props.changeAppMode} />
                );
            }.bind(this));

        return(
            !rows.length
                ? <div className='alert alert-danger'>No products found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
        );
    }
});

// component that contains the functionalities that appear on top of
// the products table: create product
var TopActionsComponent = React.createClass({
    render: function() {
        return (
            <div>
                <a href='#'
                   onClick={() => this.props.changeAppMode('create')}
                   className='btn btn-primary margin-bottom-1em'> Create product
                </a>
            </div>
        );
    }
});

// component that contains all the logic and other smaller components
// that form the Read Products view
var ReadProductsComponent = React.createClass({
    getInitialState: function() {
        return {
            products: []
        };
    },

    // on mount, fetch all products and stored them as this component's state
    componentDidMount: function() {
        this.serverRequest = $.get("api/read_all_products.php", function (products) {
            this.setState({
                products: JSON.parse(products)
            });
        }.bind(this));
    },

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        // list of products
        var filteredProducts = this.state.products;
        $('.page-header h1').text('Read Products');

        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />

                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
});

var ReadOneProductComponent = React.createClass({

    getInitialState: function() {
        // make sure that no other values are set
        return {
            id: 0,
            name: '',
            description: '',
            price: 0,
            category_name: ''
        };
    },

    // on mount, read one product based on given product ID
    componentDidMount: function() {

        var productId = this.props.productId;

        this.serverRequestProd = $.post("api/read_one_product.php",
            {prod_id: productId},
            function (product) {
                var p = JSON.parse(product)[0];
                this.setState({category_name: p.category_name});
                this.setState({id: p.id});
                this.setState({name: p.name});
                this.setState({description: p.description});
                this.setState({price: p.price});
            }.bind(this));

        $('.page-header h1').text('Read Product');
    },

    // on unmount, kill fetching the product data in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },

    // show single product data on a table
    render: function() {

        return (
            <div>
                <a href='#'
                   onClick={() => this.props.changeAppMode('read')}
                   className='btn btn-primary margin-bottom-1em'>
                    Read Products
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
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
                            <td>${parseFloat(this.state.price).toFixed(2)}</td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>{this.state.category_name}</td>
                        </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});

var UpdateProductComponent = React.createClass({
    getInitialState: function() {
        return {
            categories: [],
            selectedCategoryId: 0,
            id: 0,
            name: '',
            description: '',
            price: 0,
            successUpdate: null
        };
    },
    componentDidMount: function() {
        this.serverRequestCat = $.get("api/read_all_categories.php", function (categories) {
            this.setState({
                categories: JSON.parse(categories)
            });
        }.bind(this));

        var productId = this.props.productId;
        this.serverRequestProd = $.post("api/read_one_product.php",
            {prod_id: productId},
            function (product) {
                console.log(product);
                var p = JSON.parse(product)[0];
                this.setState({selectedCategoryId: p.category_id});
                this.setState({id: p.id});
                this.setState({name: p.name});
                this.setState({description: p.description});
                this.setState({price: p.price});
            }.bind(this));

        $('.page-header h1').text('Update product');
    },
    componentWillUnmount: function() {
        this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },
    // handle category change
    onCategoryChange: function(e) {
        this.setState({selectedCategoryId: e.target.value});
    },

// handle name change
    onNameChange: function(e) {
        this.setState({name: e.target.value});
    },

// handle description change
    onDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },

// handle price change
    onPriceChange: function(e) {
        this.setState({price: e.target.value});
    },
    onSave: function(e){
        $.post("api/update_product.php", {
                id: this.state.id,
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                category_id: this.state.selectedCategoryId
            },
            function(res){
                this.setState({successUpdate: res});
            }.bind(this)
        );
        e.preventDefault();
    },
    render: function() {
        var categoriesOptions = this.state.categories.map(function(category){
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        return (
            <div>
                {
                    this.state.successUpdate == "true" ?
                        <div className='alert alert-success'>
                            Product was updated.
                        </div>
                        : null
                }

                {
                    this.state.successUpdate == "false" ?
                        <div className='alert alert-danger'>
                            Unable to update product. Please try again.
                        </div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeAppMode('read')}
                   className='btn btn-primary margin-bottom-1em'>
                    Read Products
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.name}
                                    required
                                    onChange={this.onNameChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
        <textarea
            type='text'
            className='form-control'
            required
            value={this.state.description}
            onChange={this.onDescriptionChange}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>Price ($)</td>
                            <td>
                                <input
                                    type='number'
                                    step="0.01"
                                    className='form-control'
                                    value={this.state.price}
                                    required
                                    onChange={this.onPriceChange}/>
                            </td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>
                                <select
                                    onChange={this.onCategoryChange}
                                    className='form-control'
                                    value={this.state.selectedCategoryId}>
                                    <option value="-1">Select category...</option>
                                    {categoriesOptions}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className='btn btn-primary'
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

var DeleteProductComponent = React.createClass({

    componentDidMount: function() {
        $('.page-header h1').text('Delete product');
    },

    onDelete: function(e){
        var productId = this.props.productId;

        $.post("api/delete_products.php",
            { del_ids: [productId] },
            function(res){
                this.props.changeAppMode('read');
            }.bind(this)
        );
    },

    render: function() {

        return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>Are you sure?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete}
                                        className='btn btn-danger m-r-1em'>Yes</button>
                                <button onClick={() => this.props.changeAppMode('read')}
                                        className='btn btn-primary'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
});

var MainApp = React.createClass({
    getInitialState: function() {
        return {
            currentMode: 'read',
            productId: null
        };
    },
    changeAppMode: function(newMode, productId){
        this.setState({currentMode: newMode});

        if(productId !== undefined){
            this.setState({productId: productId});
        }
    },
    render: function() {

        var modeComponent =
            <ReadProductsComponent
                changeAppMode={this.changeAppMode} />;

        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOneProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'create':
                modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeleteProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
                break;
            default:
                break;
        }

        return modeComponent;
    }
});

ReactDOM.render(
    <MainApp />,
    document.getElementById('content')
);