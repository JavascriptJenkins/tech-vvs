export let settings = {

  // generate these columns with codegen
  columns: {
  product_id: {
      title: 'ID',
      filter: false
    },
  product_type_id: {
      title: 'ID',
      filter: false
    },
  name: {
      title: 'Name',
      filter: true
    },
  description: {
      title: 'Description',
      filter: true
    },
  barcode: {
      title: 'Barcode',
      filter: true
    },
  price: {
      title: 'Price',
      filter: true
    },
  },
  edit: {
    editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  },
  delete: {
    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  }
};