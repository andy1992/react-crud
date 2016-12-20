/******************* UPDATE RECORDS COMPONENTS ***********************************/
// component that contains the logic to update a record
var UpdateRecordComponent = React.createClass({
    getInitialState: function() {
        // initial values of this component
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

    // on mount, fetch all categories and stored them as this component's state
    // read single product as well
    componentDidMount: function() {
        this.serverRequestCat = $.get("api/read_all_categories.php", function (categories) {
            this.setState({
                categories: JSON.parse(categories)
            });
        }.bind(this));

        var editId = this.props.editId;
        this.serverRequestProd = $.post("api/read_one_product.php",
            { prod_id: editId },
            function(product){
                var p = JSON.parse(product)[0];
                if(p!=null){
                    this.setState({selectedCategoryId: p.category_id});
                    this.setState({id: p.id});
                    this.setState({name: p.name});
                    this.setState({description: p.description});
                    this.setState({price: p.price});
                }
            }
                .bind(this));

        $('.page-header h1').text('Update Record');
    },

    // on unmount, stop categories and product fetching in case the request is still pending
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

    // handle save changes button clicked
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

    // render the component
    // this includes: message box, update form, read records button
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
            Record was updated.
        </div>
        : null
    }

        {
            this.state.successUpdate == "false" ?
        <div className='alert alert-danger'>
            Unable to update record. Please try again.
        </div>
        : null
        }

        {
            !this.state.name ?
        <div className='alert alert-danger text-center'>
            No record found
        </div>
        :null
        }

        <a href='#' className='btn btn-primary pull-right margin-bottom-1em'>
            <span className='glyphicon glyphicon-list'></span> Read Records
        </a>

        {
            this.state.name ?
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
        type="number"
        step="0.01"
        min='0'
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
        <button className='btn btn-primary' onClick={this.onSave}>
        Save Changes
        </button>
        </td>
        </tr>
        </tbody>
        </table>
        </form>
        : null
    }
        </div>
        );
    }
});

/******************* END UPDATE RECORDS COMPONENTS ***********************************/


/******************* CREATE RECORDS COMPONENTS ***************************************/
// component that contains the logic to create a new record
var CreateRecordComponent = React.createClass({

    // initial values of this component
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

    // on mount, fetch all categories and stored them in this component's state
    componentDidMount: function() {
        this.serverRequest = $.get("api/read_all_categories.php", function (categories) {
            this.setState({
                categories: JSON.parse(categories)
            });
        }.bind(this));
        $('.page-header h1').text('Create Record');
    },

    // on unmount, stop categories fetching in case the request is still pending
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

    // handle save button clicked
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

    // render the component
    render: function() {

        var categoriesOptions = this.state.categories.map(function(category){
            return (
                <option key={category.id} value={category.id}>{category.name}</option>
            );
        });

        // return message box, 'create product' form
        return (
        <div>
        {
            this.state.successCreation == "true" ?
        <div className='alert alert-success'>
            Record was saved.
        </div>
        : null
    }

        {
            this.state.successCreation == "false" ?
        <div className='alert alert-danger'>
            Unable to save record. Please try again.
        </div>
        : null
        }

        <a href='#' className='btn btn-primary pull-right margin-bottom-1em'>
            <span className='glyphicon glyphicon-list'></span> Read Records
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
        min='0'
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
        <button className='btn btn-primary' onClick={this.onSave}>
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
/******************* END CREATE RECORDS COMPONENTS ***********************************/

/******************** DELETE PRODUCT COMPONENT ********************/
// component that contains the logic to update a product
var DeleteProductComponent = React.createClass({

    // on mount, change header text
    componentDidMount: function() {
        $('.page-header h1').text('Delete Product');
    },

    // handle single row deletion
    onDelete: function(e){
        var productId = this.props.productId;

        $.post("api/delete_products.php",
            { del_ids: [productId] },
            function(res){
                window.location.replace('#');
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
            <button onClick={this.onDelete} className='btn btn-danger m-r-1em'>
            <span className='glyphicon glyphicon-ok-sign'></span> Yes
            </button>
            <a href='#' className='btn btn-primary'>
            <span className='glyphicon glyphicon-remove-sign'></span> No
            </a>
            </div>
            </div>
            </div>
            </div>
            <div className='col-md-3'></div>
            </div>
        );
    }
});
/******************** END DELETE PRODUCT COMPONENT ********************/

/******************** READ ONE PRODUCT COMPONENTS ********************/
// component that contains the logic to update a product
var ReadOneProductComponent = React.createClass({

    getInitialState: function() {
        // Get this product fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            id: 0,
            name: '',
            description: '',
            price: 0,
            category_name: ''
        };
    },

    // on mount, fetch all categories and stored them as this component's state
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

    // on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },

    render: function() {

        return (
            <div>
            <a href='#' className='btn btn-primary pull-right margin-bottom-1em'>
            <span className='glyphicon glyphicon-list'></span> Read Records
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
/******************** END READ ONE PRODUCT COMPONENTS ********************/

/******************* READ RECORDS COMPONENTS *****************************************/
// pagination component that shows below the records table
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
                <a href={'#page='+i}>{i}</a>
                </li>
        )
        }

        // return paging buttons and 'go to page' form
        return (
                this.props.isSearch && !this.props.productsAmount ? null :
            <nav className='overflow-hidden'>
            <ul className='pagination pull-left margin-zero'>
        {
            this.props.currentPage == 1 ? null :
        <li>
        <a href={'#page=1'}>
            <span style={{marginRight: '0 .5em'}}>&laquo;</span>
        </a>
        </li>
    }

        { pageIndicators }

        {
            this.props.currentPage == pagesAmount ? null :
        <li>
        <a href={'#page='+pagesAmount}>
            <span style={{marginRight: '0 .5em'}}>&raquo;</span>
        </a>
        </li>
        }
        </ul>

        <form action="#" method='GET'>
            <div className="input-group col-md-3 pull-right">
            <input type="hidden" name="s" value="" />

            <input type="number"
        className="form-control"
        name="page"
        min='1'
        max={pagesAmount}
        required
        placeholder='Type page number...'
        onChange={this.props.onInputPageChange}/>

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

// component that renders a single record
var RecordRow = React.createClass({

    // render a single row on a table with read, edit and delete buttons
    render: function() {
        return (
            <tr>
            <td className='text-align-center'>
            <input
        type='checkbox'
        className='checkboxes'
        checked={(this.props.selectedRows && this.props.selectedRows.indexOf(this.props.product.id)) >= 0}
        onChange={(e) => this.props.toggleOne(e.target.checked, this.props.product.id)} />
        </td>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.description}</td>
        <td>${parseFloat(this.props.product.price).toFixed(2)}</td>
        <td>{this.props.product.category_name}</td>
        <td>

        <a href={'#read_one?id='+this.props.product.id} className='btn btn-info m-r-1em'>
            <span className='glyphicon glyphicon-list'></span> Read
            </a>

            <a href={'#update?id='+this.props.product.id} className='btn btn-primary m-r-1em'>
            <span className='glyphicon glyphicon-edit'></span> Edit
            </a>

            <a href={'#delete?id='+this.props.product.id} className='btn btn-danger'>
            <span className='glyphicon glyphicon-remove'></span> Delete
            </a>
            </td>
            </tr>
        );
    }
});

// component for the whole records table
var RecordsTable = React.createClass({
    render: function() {

        // calculate first and last record to show results according to paging
        var firstRecordShowing = (this.props.currentPage-1)*this.props.productsPerPage;
        var lastRecordShowing = parseInt(firstRecordShowing) + parseInt(this.props.productsPerPage);

        var rows = this.props.products.slice(firstRecordShowing, lastRecordShowing)
            .map(function(product, i){
                return (
                    <RecordRow
                key={i}
                product={product}
                toggleOne={this.props.toggleOne}
                selectedRows={this.props.selectedRows} />
                );
            }.bind(this));

        // show the whole table
        return (
                !rows.length && this.props.isSearch ?
            <table className='table'>
            <div className='alert alert-danger'>No results found.</div>
        </table>
        :
        <table className='table table-bordered table-hover'>
            <thead>
            <tr>
            <th className='text-center'>
            <input type='checkbox' onChange={this.props.toggleAll}/>
        </th>
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

// component for the "search by name" functionality that appears on top of the records table
var SearchByName = React.createClass({

    render: function() {
        return (
            <form role="search" action='#'>
            <div className="input-group col-md-3 pull-left">
            <input
        type="text"
        className="form-control"
        placeholder="Type a name..."
        required
        onChange={this.props.onInputSearchChange} />
        <div className="input-group-btn">
            <button className="btn btn-primary" onClick={this.props.searchTerm}>
        <i className="glyphicon glyphicon-search"></i>
            </button>
            </div>
            </div>
            </form>
        );
    }
});

// component that contains the functionalities that appear on top of
// the records table: search by name, delete selected, export CSV and create record
var TopActionsComponent = React.createClass({
    render: function() {
        return (
            <div>
            <SearchByName
        onInputSearchChange={this.props.onInputSearchChange}
        searchTerm={this.props.searchTerm} />

        <a href='#create' className='btn btn-primary pull-right margin-bottom-1em'>
            <span className='glyphicon glyphicon-plus'></span> Create Record
        </a>

        <a href='export_csv.php' className='btn btn-info pull-right margin-bottom-1em m-r-1em'>
            <span className='glyphicon glyphicon-download'></span> Export CSV
        </a>

        <button className='btn btn-danger pull-right margin-bottom-1em m-r-1em'
        onClick={this.props.onDeleteSelected}>
        <span className='glyphicon glyphicon-remove-circle'></span> Delete Selected
        </button>
        </div>
        );
    }
});

// component that contains all the logic and other smaller components
// that form the Read Records view
var ReadRecordsComponent = React.createClass({
    getInitialState: function() {
        return {
            inputPage: null,
            inputSearchTerm: "",
            selectedRows: [],
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

    // change page, called when a page number is clicked
    goToPage: function(destPage) {
        window.location.replace('#page='+destPage);
    },

    // change page according to input value. called when the "Go" button besides
    // the "Type page number..." field is clicked
    goToInputPage: function(e) {
        if(this.state.inputPage){
            this.goToPage(this.state.inputPage);
        }
        e.preventDefault();
    },

    // handle user inputs on "Type page number..." field
    onInputPageChange: function(e){
        this.setState({inputPage: e.target.value});
    },

    // update search term. called when the magnifying glass button is clicked
    searchTerm: function(e) {
        if(this.state.inputSearchTerm){
            this.setState({currentPage: 1});
            window.location.replace('#search='+this.state.inputSearchTerm);
        }
        e.preventDefault();
    },

    // handle user inputs on "Type a name..." field, to store it on a temp field
    onInputSearchChange: function(e){
        this.setState({ inputSearchTerm: e.target.value });

        // If the user deletes the searched term from the input,
        // reset the searchedTerm state so the whole table shows again
        if(!e.target.value){
            window.location.replace('#');
        }
    },

    // handle multiple row deletion
    onDeleteSelected: function(){
        var r = confirm("Are you sure?");
        if (r == true) {
            $.post("api/delete_products.php",
                { del_ids: this.state.selectedRows },
                function(res){
                    if(res == 'true'){
                        // update component state by removing the products we just deleted
                        this.setState({products:
                        this.state.products.filter((el) =>
                        this.state.selectedRows.indexOf(el.id) < 0)
                    });
                        this.setState({selectedRows: []});

                    }else{
                        alert("Unable to delete records.");
                    }
                }.bind(this)
            );
        }
    },

    // handle click of the "select all" checkbox
    toggleAll: function(e){
        if(e.target.checked){
            var newSelectedRows = [];
            this.state.products.forEach(function(el){
                newSelectedRows.push(el.id);
            });
            this.setState({selectedRows: newSelectedRows});
        }

        else{
            this.setState({selectedRows: []});
        }
    },

    // handle selection of a single row checkbox
    toggleOne: function(checked, id){
        if(checked){
            alert(id);
            this.setState({selectedRows: this.state.selectedRows.concat([id])});
        }else{
            this.setState({
                selectedRows :
                this.state.selectedRows.filter((el) => el !== id)
        });
        }
    },

    // render the records table with other functions
    render: function() {

        // filter the whole list of products according to the searchedTerm (if any)
        var filteredProducts = this.state.products;
        if(this.props.searchedTerm){
            var term = this.props.searchedTerm;
            filteredProducts = this.state.products.filter(function(product){
                return product.name.toUpperCase().includes(term.toUpperCase());
            });
            $('.page-header h1').text('Search "'+term+'"');
        }else{
            $('.page-header h1').text('Read Records');
        }

        return (
                this.props.currentPage > Math.ceil(filteredProducts.length / this.props.productsPerPage)
                && filteredProducts.length
                    ?
            <div className='table text-align-center'>
            <div className='alert alert-danger'>Page does not exist</div>
        </div>
        :
        <div className='overflow-hidden'>
            <TopActionsComponent
        onInputSearchChange={this.onInputSearchChange}
        searchTerm={this.searchTerm}
        onDeleteSelected={this.onDeleteSelected} />

        <RecordsTable
        products={filteredProducts}
        productsPerPage={this.props.productsPerPage}
        currentPage={this.props.currentPage}
        toggleAll={this.toggleAll}
        toggleOne={this.toggleOne}
        isSearch={this.props.searchedTerm}
        selectedRows={this.state.selectedRows} />

        <PaginationComponent
        currentPage={this.props.currentPage}
        productsPerPage={this.props.productsPerPage}
        productsAmount={filteredProducts != null ? filteredProducts.length : 0}
        isSearch={this.props.searchedTerm}
        onInputPageChange={this.onInputPageChange}
        goToInputPage={this.goToInputPage} />
        </div>
        );
    }
});
/******************* END READ RECORDS COMPONENTS *************************************/

// component that decides which main component to load: read / create / update / search
var MainApp = React.createClass({

    render: function() {

        var modeComponent = <ReadRecordsComponent
        productsPerPage="5"
        currentPage="1"
        searchedTerm="" />;

        var currentMode = this.props.location[0] || 'read';

        currentMode = currentMode.startsWith('update') ? (currentMode.split('?'))[0] : currentMode;
        currentMode = currentMode.startsWith('page') ? (currentMode.split('='))[0] : currentMode;
        currentMode = currentMode.startsWith('search') ? (currentMode.split('='))[0] : currentMode;
        currentMode = currentMode.startsWith('read_one') ? (currentMode.split('?'))[0] : currentMode;
        currentMode = currentMode.startsWith('delete') ? (currentMode.split('?'))[0] : currentMode;

        switch(currentMode){
            case 'read':
                break;

            case 'page':
                var initialPage = (this.props.location[0].split('='))[1];
                initialPage = parseInt(initialPage) <= 0 ? "1" : initialPage;
                modeComponent = <ReadRecordsComponent productsPerPage="5" currentPage={initialPage} searchedTerm="" />;
                break;

            case 'search':
                var searchedTerm = (this.props.location[0].split('='))[1];
                modeComponent = <ReadRecordsComponent productsPerPage="5" currentPage="1" searchedTerm={searchedTerm} />;
                break;

            case 'create':
                modeComponent = <CreateRecordComponent />;
                break;

            case 'update':
                var updateId = (this.props.location[0].split('?')[1]).split('=')[1];
                modeComponent = <UpdateRecordComponent editId={updateId} />;
                break;

            case 'read_one':
                var productId = (this.props.location[0].split('?')[1]).split('=')[1];
                modeComponent = <ReadOneProductComponent productId={productId} />;
                break;

            case 'delete':
                var productId = (this.props.location[0].split('?')[1]).split('=')[1];
                modeComponent = <DeleteProductComponent productId={productId} />;
                break;

            default:
                break;
        }

        return modeComponent;
    }
});


// router: split location into `/` separated parts, then render `MainApp` with it
function handleNewWindowLocation() {
    let location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
    ReactDOM.render(
    <MainApp location={location} />,
        document.getElementById('content')
);
}

// Handle the initial route and browser navigation events
handleNewWindowLocation();
window.addEventListener('hashchange', handleNewWindowLocation, false);