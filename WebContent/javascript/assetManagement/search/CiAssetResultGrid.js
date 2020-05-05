Ext.namespace('AIR');

AIR.CiAssetResultGrid = Ext.extend(Ext.grid.GridPanel, {
    complete: true,
    boxReady: false,

    initComponent: function() {
        var expander = new Ext.ux.grid.RowExpander({
            tpl: new Ext.Template(
                '<p><b>Lifecycle status:</b> {applicationCat2Txt}</p>'
            )
        });
        var selModel = new Ext.grid.CheckboxSelectionModel({
            checkOnly: true,
            sortable: true,
            singleSelect: true,
            listeners: {
                beforerowselect: function(selModel, rowIndex, keepExisting, record) {
                    if (selModel.grid.ownerCt.ownerCt.getComponent('pAssetSearchResultOptions').getComponent('cbAssetIsMultipleSelect').getValue()) {
                        if (record.data.isTemplate == '-1')
                            return false;
                        else {
                            var isAdmin = AIR.AirApplicationManager.hasRole(AC.USER_ROLE_AIR_ADMINISTRATOR);
                            if (isAdmin)
                                return true;
                            else {
                                var cwid = AAM.getCwid();
                                if (record.data.ciOwner == cwid || record.data.ciOwnerDelegate == cwid || record.data.applicationOwner == cwid || record.data.applicationSteward == cwid || record.data.applicationOwnerDelegate == cwid)
                                    return true;
                                else
                                    false;
                            }
                        }
                    } else
                        true;

                }
            }
        });

        this.selModel = selModel;
        var columns = AIR.AirConfigFactory.createAssetManagementGridConfig(selModel);

        for (var i = 1; i < columns.length; i++)
            columns[i].renderer = this.columnRenderer;

        this.defaultColumnConfig = columns;

        var colModel = new Ext.grid.ColumnModel(columns);

        var applicationListStore = AIR.AirStoreFactory.createAssetListStore();


        var pagingBar = new AIR.AirPagingToolbar({
            store: applicationListStore,
            complete: this.complete,
            ownerPrefix: this.ownerPrefix
        });


        Ext.apply(this, {
            colModel: colModel,
            selModel: selModel,
            store: applicationListStore,
            frame: false,
            border: false,
            loadMask: false,
            autoScroll: true,
            stripeRows: true,
            stateful: false,
            viewConfig: {
                emptyText: 'Nothing found or no filter set'
            },

            bbar: pagingBar
        });

        AIR.CiAssetResultGrid.superclass.initComponent.call(this);

        if (this.complete) {
            var rbgPageSize = pagingBar.getComponent('rbg' + pagingBar.getId());
            rbgPageSize.on('change', this.onPageSizeChange, this);
        }

        this.updateHeight();
    },


    onPageSizeChange: function(group, radio) {
        if (radio != null) {
            this.pageSize = parseInt(radio.inputValue);
            var pagingBar = this.getBottomToolbar();
            pagingBar.pageSize = this.pageSize;

            var params = {
                start: 0,
                limit: this.pageSize
            };

            if (this.pagingParams)
                for (var key in this.pagingParams)
                    params[key] = this.pagingParams[key];

            params.limit = this.pageSize;

            this.getStore().load({
                params: params,
                callback: function() {
                    this.updateHeight();
                }.createDelegate(this)
            });
        }
    },

    updateHeight: function() {
        if (!this.pageSize)
            this.pageSize = 20;

        switch (this.pageSize) {
            case 10:
                this.setHeight(305);
                break;
            case 20:
            case 50:
			case 100:
			case 500:
			case 1000:
			case 10000:	
                this.setHeight(500);
                break;
            default:
                break;
        }
    },

    setPagingParams: function(pagingParams) {
        this.pagingParams = pagingParams;
        var pagingBar = this.getBottomToolbar();
        pagingBar.pagingParams = pagingParams;
    },

    getDefaultColumnConfig: function() {
        return this.defaultColumnConfig;
    },

    columnRenderer: function(value, metadata, record, rowIndex, colIndex, store) {
        var deleteQuelle = record.get('deleteQuelle') || '';
        var isDeleted = deleteQuelle === 'No' || deleteQuelle.length === 0 ? false : true;
        if (isDeleted)
            metadata.css += ' gridCellMarkedAsDeleted';
        return value;
    }
});
Ext.reg('AIR.CiAssetResultGrid', AIR.CiAssetResultGrid);