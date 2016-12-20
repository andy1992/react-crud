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