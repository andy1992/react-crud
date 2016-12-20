"use strict";

var DeleteProductComponent = React.createClass({
    componentDidMount: function() {
        $('.page-header h1').text('Delete Product');
    },

    onDelete: function(e) {
        var productId = this.props.productId;

        $.post('api/delete_products.php',
            {del_ids: [productId]},
            function(res) {
                //this.props.changeAppMode('read');
                window.location.replace('#');
            }.bind(this)
        );
    },

    render: function() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-body text-align-center">
                            Are you sure?
                        </div>
                        <div className="panel-footer clearfix">
                            <div className="text-align-center">
                                <button className="btn btn-danger m-r-1em"
                                        onClick={this.onDelete}>
                                    Yes
                                </button>
                                <button className="btn btn-primary"
                                        onClick={() => window.location.replace('#')}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
});

var UpdateProductComponent = React.createClass({
    getInitialState:function() {
        return {
            id: 0,
            name: '',
            description: '',
            price: 0,
            selectedCategoryId: 0,
            categories: [],
            successUpdate: null
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
    },

    componentWillUnmount: function() {
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

var ProductRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>
                    <input type="checkbox"
                           className='checkboxes'
                           checked={(this.props.selectedRows && this.props.selectedRows.indexOf(this.props.product.id)) >= 0}
                           onChange={(e) => this.props.toggleOne(e.target.checked, this.props.product.id)} />
                </td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.description}</td>
                <td>${parseFloat(this.props.product.price).toFixed(2)}</td>
                <td>{this.props.product.category_name}</td>
                <td>
                    <a href={'#show?id='+this.props.product.id}
                       className="btn btn-info m-r-1em">
                        Read
                    </a>
                    <a href={'#update?id='+this.props.product.id}
                       className="btn btn-primary m-r-1em">
                        Edit
                    </a>
                    <a href={'#delete?id='+this.props.product.id}
                       className="btn btn-danger">
                        Delete
                    </a>
                </td>
            </tr>
        );
    }
});

var ProductsTable = React.createClass({
    sortChanged: function(sortColumnName, order) {
        this.props.sortChanged(sortColumnName, order);
    },

    render: function() {
        var rows = this.props.products.map(function(product, i) {
            return (
                <ProductRow
                    key={i}
                    product={product}
                    changeAppMode={this.props.changeAppMode}
                    toggleOne={this.props.toggleOne}
                    selectedRows={this.props.selectedRows}
                />
            );
        }.bind(this));

        return (
            !rows.length
                ? <div className="alert alert-danger" style={{marginTop:50}}>No products found.</div>
                :
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th className="text-center">
                            <input type="checkbox" onChange={this.props.toggleAll} />
                        </th>
                        <th>
                            <a onClick={this.props.sortChanged.bind(null, 'p.name', this.props.orderType)}>
                                Name
                                <i className={this.props.sortClass('p.name')}></i>
                            </a>
                        </th>
                        <th>
                            <a onClick={this.props.sortChanged.bind(null, 'description', this.props.orderType)}>
                                Description
                                <i className={this.props.sortClass('description')}></i>
                            </a>
                        </th>
                        <th>
                            <a onClick={this.props.sortChanged.bind(null, 'price', this.props.orderType)}>
                                Price
                                <i className={this.props.sortClass('price')}></i>
                            </a>
                        </th>
                        <th>
                            <a onClick={this.props.sortChanged.bind(null, 'category_name', this.props.orderType)}>
                                Category
                                <i className={this.props.sortClass('category_name')}></i>
                            </a>
                        </th>
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

var SearchByName = React.createClass({

    render: function() {
        return (
            <form role="search" action='#'>
                <div className="input-group col-md-3 pull-left">
                    <input
                        type="text"
                        className="form-control searchbox"
                        placeholder="Type a name..."
                        required
                        onChange={this.props.onInputSearchChange} value={this.props.searchText} />
                    <div className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.props.searchTerm}>
                            Search
                        </button>
                    </div>
                </div>
            </form>
        );
    }
});

var TopActionsComponent = React.createClass({
    render: function() {
        return (
            <div className="">
                <SearchByName searchText={this.props.searchText} searchTerm={this.props.searchTerm} onInputSearchChange={this.props.onInputSearchChange} />

                <a href="#create"
                   className="btn btn-primary margin-bottom-1em pull-right"
                >
                    <span className='glyphicon glyphicon-plus'></span>&nbsp;
                    Create Product
                </a>

                <button
                    className="btn btn-danger margin-bottom-1em pull-right"
                    onClick={this.props.deleteSelected}
                    style={{marginRight:'10px'}}
                >
                    <span className='glyphicon glyphicon-trash'></span>&nbsp;
                    Delete Selected Products
                </button>
            </div>
        );
    }
});

var Loader = React.createClass({
    render: function() {
        if(this.props.isLoading == true) {
            return <div className="text-center">Loading...</div>;
        }
        return null;
    }
});

var PaginationComponent = React.createClass({
    render: function() {

        // calculate number of pages depending on the total of records and the
        // "products per page" property
        var pagesAmount = Math.ceil(this.props.productsAmount / this.props.productsPerPage);

        // creating page elements, one for each page
        var pageIndicators = [];
        for (let i=1; i <= pagesAmount; i++) {
            pageIndicators.push(
                <li className={i == this.props.currentPage ? "active":""} key={i}>
                    <a href={'#page='+i+'&search=' + this.props.search + '&order_by=' + this.props.orderBy + '&order_type=' + this.props.orderType} onClick={this.props.onPageChanged.bind(null, i)}>{i}</a>
                </li>
            )
        }

        // return paging buttons and 'go to page' form
        return (
            !this.props.productsAmount ? null :
                <nav className='overflow-hidden'>
                    <ul className='pagination pull-left margin-zero'>
                        {
                            this.props.currentPage == 1 ? null :
                                <li>
                                    <a href={'#page=1&search=' + this.props.search + '&order_by=' + this.props.orderBy + '&order_type=' + this.props.orderType} onClick={this.props.onPageChanged.bind(null,1)}>
                                        <span style={{marginRight: '0 .5em'}}>&laquo;</span>
                                    </a>
                                </li>
                        }

                        {
                            this.props.currentPage == 1 ? null :
                                <li>
                                    <a href={'#page='+ (this.props.currentPage - 1) +'&search=' + this.props.search + '&order_by=' + this.props.orderBy + '&order_type=' + this.props.orderType} onClick={this.props.onPageChanged.bind(null,1)}>
                                        <span style={{marginRight: '0 .5em'}}>&lsaquo;</span>
                                    </a>
                                </li>
                        }

                        { pageIndicators }

                        {
                            this.props.currentPage == pagesAmount ? null :
                                <li>
                                    <a href={'#page='+ (parseInt(this.props.currentPage) + 1) +'&search=' + this.props.search + '&order_by=' + this.props.orderBy + '&order_type=' + this.props.orderType} onClick={this.props.onPageChanged.bind(null, pagesAmount)}>
                                        <span style={{marginRight: '0 .5em'}}>&rsaquo;</span>
                                    </a>
                                </li>
                        }

                        {
                            this.props.currentPage == pagesAmount ? null :
                                <li>
                                    <a href={'#page='+pagesAmount+'&search=' + this.props.search + '&order_by=' + this.props.orderBy + '&order_type=' + this.props.orderType} onClick={this.props.onPageChanged.bind(null, pagesAmount)}>
                                        <span style={{marginRight: '0 .5em'}}>&raquo;</span>
                                    </a>
                                </li>
                        }
                    </ul>

                    <form method="get" action="#">
                        <div className="input-group col-md-3 pull-right">
                            <input type="hidden" name="s" value="" />
                            <input type="number"
                                   className="form-control"
                                   name="page"
                                   min='1'
                                   max={pagesAmount}
                                   required
                                   placeholder='Type page number...'
                                   onChange={this.props.onInputPageChange} />

                            <div className="input-group-btn">
                                <button className="btn btn-primary" onClick={this.props.goToInputPage}>
                                    Go
                                </button>
                            </div>
                        </div>
                    </form>
                </nav>
        );
    }
});

var ReadProductsComponent = React.createClass({
    getInitialState: function() {
        return {
            search: this.props.search,
            currentPage: this.props.currentPage,
            limit: this.props.itemPerPage,
            orderBy: this.props.orderBy,
            orderType: this.props.orderType,
            products: [],
            count: 0,
            loading: true,
            selectedRows: []
        };
    },

    componentDidMount: function() {
        this.populateProducts();
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    populateProducts: function() {
        var parameters = {
            name: this.state.search,
            page: this.state.currentPage,
            item_per_page: this.state.limit,
            order_by: this.state.orderBy,
            order_type: this.state.orderType
        };

        this.serverRequest = $.get('api/read_all_products.php', parameters,
            function(products) {
                if(this.isMounted()) {
                    this.setState({
                        products: JSON.parse(products)
                    });
                }
            }.bind(this));

        this.serverRequest = $.get('api/count_all_products.php', parameters,
            function(data) {
                this.setState({
                    count: data,
                    loading: false
                });
            }.bind(this));
    },

    onInputPageChange: function(e) {
        var page = parseInt(e.target.value);
        var totalPage = Math.ceil(this.state.count / this.state.limit);

        if(page > totalPage) {
            page = totalPage;
        } else if(page <= 0) {
            page = 1;
        }

        this.setState({currentPage: page});
    },

    goToInputPage: function(e) {
        e.preventDefault();
        if(this.state.currentPage){
            this.pageChanged(this.state.currentPage);
        }
    },

    pageChanged: function(destPage, e) {
        //e.preventDefault();
        window.location.replace('#page=' + destPage + '&search=' + this.state.search + '&order_by=' + this.state.orderBy + '&order_type=' + this.state.orderType);
        //window.location.replace('#page=' + destPage + '&search=' + this.state.search);
        /**
         * setState() does not immediately mutate this.state but creates a pending state transition. Accessing this.state after calling this method
         * can potentially return the existing value. There is no guarantee of synchronous operation of calls to setState and calls may be batched
         * for performance gains.
         */
        this.setState({
            currentPage: destPage
        }, function() {
            this.populateProducts();
        });
    },

    sortChanged : function(sortColumnName, order){
        this.setState({
            orderBy: sortColumnName,
            orderType: order.toString().toLowerCase() == 'asc' ? 'desc' : 'asc',
            currentPage: 1
        }, function() {
            this.populateProducts();
            this.pageChanged(1);
        });
    },

    sortClass : function(filterName){
        return "fa fa-fw " + ((filterName == this.state.orderBy) ? ("fa-sort-" + this.state.orderType) : "fa-sort");
    },

    searchTerm: function(e) {
        //window.location.replace('#page=' + this.state.currentPage + '&search=' + this.state.search);
        window.location.replace('#page=' + this.state.currentPage + '&search=' + this.state.search + '&order_by=' + this.state.orderBy + '&order_type=' + this.state.orderType);
        if(!e.target.value) {
            this.setState({
                currentPage: 1
            }, function() {
                this.populateProducts();
                this.pageChanged(1);
            });
        } else {
            this.setState({search: e.target.value});
        }
        e.preventDefault();
    },

    onInputSearchChanged: function(e) {
        if(!e.target.value){
            window.location.replace('#');
            this.setState({
                search: e.target.value
            }, function() {
                this.populateProducts();
                this.pageChanged(1);
            });
        } else {
            this.setState({
                search: e.target.value
            });
        }
    },

    toggleOne: function(checked, id) {
        if(checked){
            this.setState({selectedRows: this.state.selectedRows.concat([id])});
        }else {
            this.setState({
                selectedRows: this.state.selectedRows.filter((el) => el !== id)
            });
        }
    },

    toggleAll: function(e) {
        if(e.target.checked) {
            var selectedProducts = [];
            this.state.products.forEach(function(product) {
                selectedProducts.push(product.id);
            });
            this.setState({selectedRows: selectedProducts});
        } else {
            this.setState({selectedRows: []});
        }
    },

    deleteSelected: function() {
        if(this.state.selectedRows.length > 0) {
            var r = confirm("Are you sure you want to delete the selected product(s)?");
            if (r == true) {
                $.post('api/delete_products.php',
                    {del_ids: this.state.selectedRows},
                    function (res) {
                        if (res == 'true') {
                            // update component state by removing the products we just deleted
                            this.setState({
                                products: this.state.products.filter((el) =>
                                this.state.selectedRows.indexOf(el.id) < 0)
                            });
                            this.setState({selectedRows: []});
                            // Reload the products list
                            this.populateProducts();
                            this.pageChanged(1);
                        } else {
                            alert("Unable to delete product(s).");
                        }
                    }.bind(this)
                );
            }
        } else {
            alert('Please select one or more products to be deleted.');
        }
    },

    render: function() {
        var filteredProducts = this.state.products;
        if(this.state.search != ''){
            $('.page-header h1').text('Search "'+ this.state.search +'"');
        }else{
            $('.page-header h1').text('All Products');
        }

        return (
            <div className="overflow-hidden">
                <TopActionsComponent
                    searchText={this.state.search}
                    onInputSearchChange={this.onInputSearchChanged}
                    searchTerm={this.searchTerm}
                    deleteSelected={this.deleteSelected}
                />

                <Loader isLoading={this.state.loading} />
                <ProductsTable
                    toggleAll={this.toggleAll}
                    toggleOne={this.toggleOne}
                    products={filteredProducts}
                    orderBy={this.state.orderBy}
                    orderType={this.state.orderType}
                    sortClass={this.sortClass}
                    sortChanged={this.sortChanged}
                    selectedRows={this.state.selectedRows}
                />

                <PaginationComponent
                    currentPage={this.props.currentPage}
                    search={this.props.search}
                    productsPerPage={parseInt(this.props.itemPerPage)}
                    productsAmount={this.state.count}
                    onPageChanged={this.pageChanged}
                    onInputPageChange={this.onInputPageChange}
                    goToInputPage={this.goToInputPage}
                    orderBy={this.props.orderBy}
                    orderType={this.props.orderType} />
            </div>
        );
    }
});

var CreateProductComponent = React.createClass({
    getInitialState: function() {
        return {
            categories: [],
            selectedCategoryId: -1,
            name: '',
            description: '',
            price: 0.00,
            successCreation: null
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/read_all_categories.php', function(categories) {
            this.setState({
                categories: JSON.parse(categories)
            });
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

var NotFoundComponent = React.createClass({
    render: function() {
        return (
            <div>
                <div className="alert alert-danger">
                    <div className="text-center">
                        <h1 class="panel-title">
                            404
                        </h1>
                        <div className="panel-body">
                            <div className="">
                                Page not Found
                            </div>
                        </div>
                    </div>
                </div>
                <a class="btn btn-primary" href="#">Back to Home Page</a>
            </div>
        );
    }
});